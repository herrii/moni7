<script setup lang="ts">
import type { AccountInterface } from '@/models/account.model'
import AccountCard from '~/components/scaffold/account/AccountCard.vue'
import AccountEmptyState from '~/components/scaffold/account/AccountEmptyState.vue'

defineProps<{
  accounts: AccountInterface[]
}>()

defineEmits<{
  (e: 'edit', account: AccountInterface): void
  (e: 'delete', account: AccountInterface): void
  (e: 'create'): void
}>()
</script>

<template>
  <div>
    <!-- Empty State -->
    <AccountEmptyState
      v-if="accounts.length === 0"
      @create="$emit('create')"
    />

    <!-- Account Cards -->
    <div v-else class="flex flex-col gap-3">
      <AccountCard
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @edit="$emit('edit', account)"
        @delete="$emit('delete', account)"
      />
    </div>
  </div>
</template>
