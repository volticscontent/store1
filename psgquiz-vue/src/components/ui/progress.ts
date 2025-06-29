import { defineComponent, h } from 'vue'

export const Progress = defineComponent({
  name: 'Progress',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    return () => h(
      'div',
      {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': props.value,
        class: 'relative h-4 w-full overflow-hidden rounded-full bg-secondary'
      },
      h('div', {
        class: 'h-full w-full flex-1 bg-primary transition-all',
        style: { transform: `translateX(-${100 - props.value}%)` }
      })
    )
  }
})

export default Progress 