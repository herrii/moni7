import { STORES } from '@/config/database.config'
import type { GoalInterface } from '@/models/goal.model'
import { DEFAULT_GOAL_VALUES } from '@/models/goal.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore
} from '@/helpers/indexed-db.helper'

export interface GoalProgressInfo {
  percentage: number
  remaining: number
  isCompleted: boolean
}

/**
 * Calculates goal progress metrics (percentage, remaining amount, completion status).
 */
export function calculateGoalProgress(goal: GoalInterface): GoalProgressInfo {
  const target = Math.max(1, goal.target_amount)
  const current = Math.max(0, goal.current_amount)
  const remaining = Math.max(0, target - current)
  const percentage = Math.min(100, Math.round((current / target) * 100))
  const isCompleted = goal.completed || current >= target

  return {
    percentage,
    remaining,
    isCompleted
  }
}

/**
 * Validates goal fields before creation or update.
 */
export function validateGoalData(data: {
  title?: string
  target_amount?: number
}) {
  if (data.title !== undefined) {
    const trimmed = data.title.trim()
    if (!trimmed) {
      throw new Error('Nama target tidak boleh kosong')
    }
    if (trimmed.length > 100) {
      throw new Error('Nama target maksimal 100 karakter')
    }
  }

  if (data.target_amount !== undefined && data.target_amount <= 0) {
    throw new Error('Jumlah target harus lebih besar dari 0')
  }
}

/**
 * Creates a financial target goal.
 */
export async function createGoal(
  data: Omit<GoalInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<GoalInterface> {
  validateGoalData({
    title: data.title,
    target_amount: data.target_amount
  })

  const trimmedTitle = data.title.trim()
  const targetAmount = Math.round(data.target_amount)
  const currentAmount = Math.max(0, Math.round(data.current_amount || 0))
  const now = Date.now()

  const goalData: Omit<GoalInterface, 'id'> = {
    ...DEFAULT_GOAL_VALUES,
    ...data,
    title: trimmedTitle,
    target_amount: targetAmount,
    current_amount: currentAmount,
    target_date: data.target_date,
    completed: currentAmount >= targetAmount,
    icon: data.icon || DEFAULT_GOAL_VALUES.icon,
    color: data.color || DEFAULT_GOAL_VALUES.color,
    created_at: now,
    updated_at: now
  }

  const id = await addToStore<Omit<GoalInterface, 'id'>>(STORES.GOALS, goalData)
  return { id, ...goalData }
}

/**
 * Updates an existing goal.
 */
export async function updateGoal(
  id: number,
  data: Partial<Omit<GoalInterface, 'id' | 'user_id' | 'created_at'>>
): Promise<GoalInterface> {
  const existing = await findGoalById(id)
  if (!existing) {
    throw new Error(`Target/Goal dengan ID ${id} tidak ditemukan`)
  }

  validateGoalData({
    title: data.title,
    target_amount: data.target_amount
  })

  const updatedTitle = data.title !== undefined ? data.title.trim() : existing.title
  const updatedTargetAmount = data.target_amount !== undefined ? Math.round(data.target_amount) : existing.target_amount
  const updatedCurrentAmount = data.current_amount !== undefined ? Math.max(0, Math.round(data.current_amount)) : existing.current_amount
  const isCompleted = data.completed !== undefined ? data.completed : updatedCurrentAmount >= updatedTargetAmount

  const updatedGoal: GoalInterface = {
    ...existing,
    ...data,
    title: updatedTitle,
    target_amount: updatedTargetAmount,
    current_amount: updatedCurrentAmount,
    target_date: data.target_date !== undefined ? data.target_date : existing.target_date,
    icon: data.icon !== undefined ? data.icon : existing.icon,
    color: data.color !== undefined ? data.color : existing.color,
    completed: isCompleted,
    updated_at: Date.now()
  }

  await updateInStore<GoalInterface>(STORES.GOALS, updatedGoal)
  return updatedGoal
}

/**
 * Deletes a goal by ID.
 */
export async function deleteGoal(id: number): Promise<void> {
  const existing = await findGoalById(id)
  if (!existing) {
    throw new Error(`Target/Goal dengan ID ${id} tidak ditemukan`)
  }
  await deleteFromStore(STORES.GOALS, id)
}

/**
 * Finds a goal by ID.
 */
export async function findGoalById(id: number): Promise<GoalInterface | null> {
  return await getByIdFromStore<GoalInterface>(STORES.GOALS, id)
}

/**
 * Gets goals belonging to a user, with optional title search and sorted nearest completion first.
 */
export async function getGoals(
  userId: number,
  search?: string
): Promise<GoalInterface[]> {
  const range = IDBKeyRange.only(userId)
  let goals = await getAllFromStore<GoalInterface>(STORES.GOALS, 'user_id', range)

  if (search && search.trim()) {
    const q = search.trim().toLowerCase()
    goals = goals.filter((g) => g.title.toLowerCase().includes(q))
  }

  // Sort nearest completion first (highest percentage first)
  return goals.sort((a, b) => {
    const progressA = calculateGoalProgress(a)
    const progressB = calculateGoalProgress(b)

    // Put non-completed goals first sorted by highest percentage, then completed goals
    if (progressA.isCompleted !== progressB.isCompleted) {
      return progressA.isCompleted ? 1 : -1
    }

    return progressB.percentage - progressA.percentage
  })
}

/**
 * Adds a contribution to a goal's current progress.
 * Validates that contribution amount > 0 and does not exceed remaining target amount.
 */
export async function addGoalContribution(
  goalId: number,
  amount: number
): Promise<GoalInterface> {
  const goal = await findGoalById(goalId)
  if (!goal) {
    throw new Error(`Target/Goal dengan ID ${goalId} tidak ditemukan`)
  }

  if (amount <= 0) {
    throw new Error('Jumlah kontribusi harus lebih besar dari 0')
  }

  const { remaining } = calculateGoalProgress(goal)
  if (remaining > 0 && amount > remaining) {
    throw new Error(`Jumlah kontribusi (Rp${amount.toLocaleString('id-ID')}) melebihi sisa target (Rp${remaining.toLocaleString('id-ID')})`)
  }

  const newCurrentAmount = goal.current_amount + Math.round(amount)
  const isNowCompleted = newCurrentAmount >= goal.target_amount

  return await updateGoal(goalId, {
    current_amount: newCurrentAmount,
    completed: isNowCompleted
  })
}

/**
 * Directly marks a goal as completed by setting current_amount = target_amount.
 */
export async function completeGoal(goalId: number): Promise<GoalInterface> {
  const goal = await findGoalById(goalId)
  if (!goal) {
    throw new Error(`Target/Goal dengan ID ${goalId} tidak ditemukan`)
  }

  return await updateGoal(goalId, {
    current_amount: goal.target_amount,
    completed: true
  })
}
