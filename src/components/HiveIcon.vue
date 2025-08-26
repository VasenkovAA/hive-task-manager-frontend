<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="hive-icon"
  >
    <path d="M16 2L20 6L16 10L12 6L16 2Z" :fill="color"/>
    <path d="M22 8L26 12L22 16L18 12L22 8Z" :fill="color"/>
    <path d="M22 16L26 20L22 24L18 20L22 16Z" :fill="color"/>
    <path d="M16 22L20 26L16 30L12 26L16 22Z" :fill="color"/>
    <path d="M10 16L14 20L10 24L6 20L10 16Z" :fill="color"/>
    <path d="M10 8L14 12L10 16L6 12L10 8Z" :fill="color"/>
  </svg>
</template>

<script>
export default {
  name: 'HiveIcon',
  props: {
    size: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: String,
      default: '#FDDB44'
    }
  }
}
</script>