<template>
  <div v-if="visible" :class="['alert', type]">
    <div class="alert-content">
      <span class="alert-message">{{ message }}</span>
      <button v-if="dismissible" class="alert-close" @click="visible = false">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'HiveAlert',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'error',
      validator: (value) => ['error', 'success', 'warning', 'info'].includes(value)
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    timeout: {
      type: Number,
      default: 0 // 0 means no auto-dismiss
    }
  },
  setup(props) {
    const visible = ref(!!props.message)

    watch(() => props.message, (newValue) => {
      visible.value = !!newValue
      
      // Автоматическое скрытие через timeout
      if (newValue && props.timeout > 0) {
        setTimeout(() => {
          visible.value = false
        }, props.timeout)
      }
    })

    return {
      visible
    }
  }
}
</script>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alert-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.alert-message {
  flex: 1;
}

.alert-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  line-height: 1;
}

.error {
  background-color: #fed7d7;
  color: #c53030;
  border-left: 4px solid #e53e3e;
}

.success {
  background-color: #c6f6d5;
  color: #2d784d;
  border-left: 4px solid #38a169;
}

.warning {
  background-color: #fefcbf;
  color: #b7791f;
  border-left: 4px solid #d69e2e;
}

.info {
  background-color: #bee3f8;
  color: #2c5282;
  border-left: 4px solid #3182ce;
}
</style>