import { defineComponent, h } from 'vue'

export const RadioGroup = defineComponent({
  name: 'RadioGroup',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    return () => h(
      'div',
      {
        role: 'radiogroup',
        class: 'grid gap-2'
      },
      slots.default?.()
    )
  }
})

export const RadioGroupItem = defineComponent({
  name: 'RadioGroupItem',
  props: {
    value: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => h(
      'input',
      {
        type: 'radio',
        id: props.id,
        value: props.value,
        class: [
          'peer h-4 w-4 rounded-full border border-primary',
          'text-primary ring-offset-background focus:outline-none',
          'focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50'
        ]
      }
    )
  }
})

export default {
  RadioGroup,
  RadioGroupItem
} 