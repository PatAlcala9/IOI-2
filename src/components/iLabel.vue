<template>
  <label>{{ props.value }}</label>
</template>

<script setup>
const props = defineProps({
  value: {
      type: String,
      default: ''
  }
})
</script>
