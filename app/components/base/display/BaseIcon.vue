<script setup lang="ts">
interface Props {
  name: string
  type?: 'solid' | 'regular' | 'brands'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  spin?: boolean
  rotate?: 90 | 180 | 270
  color?: string // Tailwind text color class, e.g. text-brand-500
}

const props = withDefaults(defineProps<Props>(), {
  type: 'solid',
  size: 'md',
  spin: false,
  color: '',
  rotate: undefined
})

const iconClass = computed(() => {
  const classes = []
  
  // Icon family prefix
  if (props.type === 'solid') classes.push('fa-solid')
  else if (props.type === 'regular') classes.push('fa-regular')
  else if (props.type === 'brands') classes.push('fa-brands')
  
  // Icon name
  classes.push(props.name.startsWith('fa-') ? props.name : `fa-${props.name}`)
  
  // Size classes
  if (props.size === 'xs') classes.push('text-xs')
  else if (props.size === 'sm') classes.push('text-sm')
  else if (props.size === 'md') classes.push('text-base')
  else if (props.size === 'lg') classes.push('text-lg')
  else if (props.size === 'xl') classes.push('text-xl')
  else if (props.size === '2xl') classes.push('text-2xl')
  
  // Custom rotation
  if (props.rotate === 90) classes.push('fa-rotate-90')
  else if (props.rotate === 180) classes.push('fa-rotate-180')
  else if (props.rotate === 270) classes.push('fa-rotate-270')
  
  // Animation
  if (props.spin) classes.push('fa-spin')
  
  // Color configuration
  if (props.color) classes.push(props.color)
  
  return classes.join(' ')
})
</script>

<template>
  <i :class="iconClass" aria-hidden="true"></i>
</template>
