import {$, component$, CSSProperties, QRL, Slot, useSignal} from '@builder.io/qwik'

export interface ToggleProps {
    className?: string
    value?: boolean
    disabled?: boolean
    style?: CSSProperties
    variant?: 'slider' | 'radio' | 'checkbox'
    color?: 'success' | 'error' | 'warning' | 'accent' | 'primary'
    onChange?: QRL<(value: boolean) => void>
}
export const Toggle = component$<ToggleProps>(
    ({
        disabled,
        className,
        style = {
            height: 'fit-content',
            width: 'fit-content',
        },
        variant = 'slider',
        color = 'primary',
        onChange,
        value
    }) => {
        const v = useSignal(value)

        return (
            <div className={`cc-${variant} ${className}`} style={style}>
                <input style={{height: '100%',width: '100%'}} type={variant == 'slider' ? 'radio' : variant} onClick$={$(()=> {v.value = !v.value; onChange && onChange(v.value);})} checked={v.value}/>
                {variant == 'slider' &&
                    <span className="cc-slider cc-round" onClick$={$(() => {
                    v.value = !v.value;
                    onChange && onChange(v.value);
                })}></span>}
            </div>
        )
    }
)
