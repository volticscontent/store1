import { defineComponent, h } from 'vue'

export const Label = defineComponent({
  name: 'Label',
  props: {
    for: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => h(
      'label',
      {
        for: props.for,
        class: [
          'text-sm font-medium leading-none',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        ]
      },
      slots.default?.()
    )
  }
})

export default Label 