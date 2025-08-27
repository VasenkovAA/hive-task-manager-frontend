<template>
  <div class="form-group" :class="{ error: error }">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="form-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'HiveInput',
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  background: white;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-input::placeholder {
  color: var(--text-secondary);
}

.form-input:focus {
  outline: none;
  border-color: var(--hive-primary);
  box-shadow: 0 0 0 3px rgba(253, 187, 45, 0.2);
}

.form-group.error .form-input {
  border-color: var(--hive-error);
}

.error-message {
  color: var(--hive-error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>