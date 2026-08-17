import { STORES } from '@/config/database.config'
import type { GoalInterface } from '@/models/goal.model'
import {
  addToStore,
  updateInStore,
  deleteFromStore,
  getByIdFromStore,
  getAllFromStore
} from '@/helpers/indexed-db.helper'

/**
 * Creates a financial target goal.
 */
export async function createGoal(
  data: Omit<GoalInterface, 'id' | 'created_at' | 'updated_at'>
): Promise<GoalInterface> {
  const trimmedTitle = data.title.trim()
  if (!trimmedTitle) {
    throw new Error('Judul target tidak boleh kosong')
  }
  if (data.target_amount <= 0) {
    throw new Error('Jumlah target harus lebih besar dari 0')
  }

  const now = Date.now()
  const goalData: Omit<GoalInterface, 'id'> = {
    ...data,
    title: trimmedTitle,
    target_amount: Math.round(data.target_amount),
    current_amount: Math.round(data.current_amount || 0),
    completed: (data.current_amount || 0) >= data.target_amount,
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

  if (data.title !== undefined && !data.title.trim()) {
    throw new Error('Judul target tidak boleh kosong')
  }

  const updatedTargetAmount = data.target_amount !== undefined ? Math.round(data.target_amount) : existing.target_amount
  const updatedCurrentAmount = data.current_amount !== undefined ? Math.round(data.current_amount) : existing.current_amount

  const updatedGoal: GoalInterface = {
    ...existing,
    ...data,
    title: data.title !== undefined ? data.title.trim() : existing.title,
    target_amount: updatedTargetAmount,
    current_amount: updatedCurrentAmount,
    completed: data.completed !== undefined ? data.completed : updatedCurrentAmount >= updatedTargetAmount,
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
 * Gets all goals belonging to a user.
 */
export async function getGoals(userId: number): Promise<GoalInterface[]> {
  const range = IDBKeyRange.only(userId)
  return await getAllFromStore<GoalInterface>(STORES.GOALS, 'user_id', range)
}

/**
 * Updates goal progress by adding addedAmount to current_amount.
 */
export async function updateGoalProgress(
  goalId: number,
  addedAmount: number
): Promise<GoalInterface> {
  const goal = await findGoalById(goalId)
  if (!goal) {
    throw new Error(`Target/Goal dengan ID ${goalId} tidak ditemukan`)
  }

  const newCurrentAmount = Math.max(0, goal.current_amount + Math.round(addedAmount))
  return await updateGoal(goalId, {
    current_amount: newCurrentAmount,
    completed: newCurrentAmount >= goal.target_amount
  })
}
