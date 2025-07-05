import { defineComponent, h } from 'vue'

export const Button = defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  setup(props, { slots }) {
    return () => h(
      'button',
      {
        class: [
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          props.variant === 'default' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '',
          props.variant === 'outline' ? 'border border-input hover:bg-accent hover:text-accent-foreground' : '',
          props.size === 'default' ? 'h-10 py-2 px-4' : '',
          props.size === 'lg' ? 'h-12 px-8' : ''
        ]
      },
      slots.default?.()
    )
  }
})

export default Button 