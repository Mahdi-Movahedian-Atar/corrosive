import { component$, CSSProperties, QRL, Slot } from '@builder.io/qwik'

export interface ButtonProps {
    className?: string
    disabled?: boolean
    style?: CSSProperties
    variant?: 'solid' | 'outlined' | 'text'
    color?: 'success' | 'error' | 'warning' | 'accent' | 'primary'
    rounded?: boolean
    onClick?: QRL<() => void>
    raised?: boolean
}
export const Button = component$<ButtonProps>(
    ({
        disabled,
        className,
        style = {
            height: 'fit-content',
            width: 'fit-content',
        },
        variant = 'solid',
        color = 'primary',
        rounded = false,
        onClick,
        raised,
    }) => {
        return (
            <div class={className} style={style}>
                <button
                    style={{ height: '100%', width: '100%' }}
                    class={`cc-button-${variant} cc-button-${disabled ? 'disabled' : color} ${rounded ? 'cc-button-rounded' : 'cc-button'} ${raised && 'cc-button-raised'}`}
                    disabled={disabled}
                    onClick$={onClick}
                >
                    <Slot />
                </button>
            </div>
        )
    }
)
