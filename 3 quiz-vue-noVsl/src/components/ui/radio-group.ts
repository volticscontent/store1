import { defineComponent, h, inject, provide, ref } from 'vue'

export const RadioGroup = defineComponent({
  name: 'RadioGroup',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const updateValue = (value: string) => {
      emit('update:modelValue', value)
    }

    provide('radioGroup', {
      modelValue: props.modelValue,
      updateValue
    })

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
  setup(props) {
    const radioGroup = inject('radioGroup') as any

    const isChecked = () => radioGroup?.modelValue === props.value

    const handleChange = () => {
      radioGroup?.updateValue(props.value)
    }

    return () => h(
      'input',
      {
        type: 'radio',
        id: props.id,
        value: props.value,
        checked: isChecked(),
        onChange: handleChange,
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