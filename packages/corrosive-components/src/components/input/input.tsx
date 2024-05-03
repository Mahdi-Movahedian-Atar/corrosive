import {$, component$, CSSProperties, QRL, Slot, useSignal} from '@builder.io/qwik'

export interface InputProps {
    value?: number|string
    className?: string
    disabled?: boolean
    style?: CSSProperties
    color?: 'success' | 'error' | 'warning' | 'accent' | 'primary'
    variant?: 'solid' | 'outlined' | 'text'
    rounded?: boolean
    onChange?: QRL<(value: number|string) => void>
    raised?: boolean
    placeholder?: string
    floatingPlaceholder?: boolean
}
export const Input = component$<InputProps>(
    ({
        value,
        disabled,
        className,
        style = {
            height: 'fit-content',
            width: 'fit-content',
        },
        variant = 'outlined',
        color = 'primary',
        rounded = false,
        onChange,
        raised,
        placeholder,
        floatingPlaceholder = true,
    }) => {
        return (
            <div class={className} style={style}>
                <spam
                    class={`cc-input-${variant} cc-input-${disabled ? 'disabled' : color} ${rounded ? 'cc-input-rounded' : 'cc-input'} ${raised && 'cc-input-raised'}`}
                >
                    <Slot name={'left'}/>
                    <input
                        disabled={disabled}
                        onChange$={$((e) => {
                            onChange && onChange((e.target as any).value)
                        })}
                        placeholder={placeholder}
                        type={'number'}
                        defaultValue={value?.toString()}
                    />
                    <Slot name={'right'}/>
                    {floatingPlaceholder && placeholder && (
                        <label
                            className={`cc-input-label cc-input-${disabled ? 'disabled' : color}`}
                        >
                            {placeholder}
                        </label>
                    )}
                </spam>
            </div>
        )
    }
)
