<template>
  <button
    :type="type"
    :class="['hive-button', variant, { 'full-width': fullWidth }]"
    :disabled="loading || disabled"
    @click="$emit('click')"
  >
    <span v-if="loading" class="button-loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'HiveButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.hive-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  position: relative;
  min-height: 44px;
}

.hive-button.primary {
  background: var(--hive-primary);
  color: var(--hive-dark);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hive-button.primary:hover:not(:disabled) {
  background: var(--hive-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.hive-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hive-button.secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.hive-button.outline {
  background: transparent;
  color: var(--hive-dark);
  border: 2px solid var(--hive-primary);
}

.hive-button.outline:hover:not(:disabled) {
  background: var(--hive-primary);
}

.hive-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.hive-button.full-width {
  width: 100%;
}

.button-loader {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>