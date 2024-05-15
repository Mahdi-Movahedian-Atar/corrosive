import {
    $,
    component$,
    CSSProperties,
    QRL,
    Slot,
    useSignal,
    useVisibleTask$,
} from '@builder.io/qwik'
import { i } from 'vite/dist/node/types.d-jgA8ss1A'

export interface DropdownProps {
    values?: { option: string; group: boolean }[]
    value?: string
    className?: string
    disabled?: boolean
    style?: CSSProperties
    color?: 'success' | 'error' | 'warning' | 'accent' | 'primary'
    variant?: 'solid' | 'outlined' | 'text'
    rounded?: boolean
    onChange?: QRL<(value: string) => void>
    raised?: boolean
    placeholder?: string
    floatingPlaceholder?: boolean
    maxHeight?: number
    direction?: 'down' | 'up' | 'left' | 'right'
}
export const Select = component$<DropdownProps>(
    ({
        values,
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
        maxHeight = 100,
        direction = 'down',
    }) => {
        const selectedOption = useSignal(value)
        const showOptions = useSignal(false)

        useVisibleTask$(({ track }) => {
            track(() => {
                showOptions.value
            })
            const element = document.getElementById('id')
            const elementPosition = element?.getBoundingClientRect()
            if (elementPosition != undefined) {
                switch (direction) {
                    case 'down':
                        if (elementPosition.bottom > window.innerHeight) {
                            // @ts-ignore
                            element.style.top = 'unset'
                            // @ts-ignore
                            element.style.bottom = '0vh'
                        } else {
                            // @ts-ignore
                            element.style.top = '100%'
                            // @ts-ignore
                            element.style.bottom = 'unset'
                        }
                        break
                    case 'up':
                        if (elementPosition.top < 0) {
                            // @ts-ignore
                            element.style.bottom = 'unset'
                            // @ts-ignore
                            element.style.top = '0vh'
                        } else {
                            // @ts-ignore
                            element.style.bottom = '100%'
                            // @ts-ignore
                            element.style.top = 'unset'
                        }
                        break
                    case 'right':
                        if (elementPosition.right > window.innerWidth) {
                            // @ts-ignore
                            element.style.left = 'unset'
                            // @ts-ignore
                            element.style.right = '0vw'
                        } else {
                            // @ts-ignore
                            element.style.left = '100%'
                            // @ts-ignore
                            element.style.right = 'unset'
                        }
                        if (elementPosition.bottom > window.innerHeight) {
                            // @ts-ignore
                            element.style.top = 'unset'
                            // @ts-ignore
                            element.style.bottom = '0vh'
                        } else {
                            // @ts-ignore
                            element.style.top = 'unset'
                            // @ts-ignore
                            element.style.bottom = 'unset'
                        }
                        break
                    case 'left':
                        if (elementPosition.left < 0) {
                            // @ts-ignore
                            element.style.right = 'unset'
                            // @ts-ignore
                            element.style.left = '0vh'
                        } else {
                            // @ts-ignore
                            element.style.right = '100%'
                            // @ts-ignore
                            element.style.left = 'unset'
                        }
                        if (elementPosition.bottom > window.innerHeight) {
                            // @ts-ignore
                            element.style.top = 'unset'
                            // @ts-ignore
                            element.style.bottom = '0vh'
                        } else {
                            // @ts-ignore
                            element.style.top = 'unset'
                            // @ts-ignore
                            element.style.bottom = 'unset'
                        }
                }
            }
        })

        return (
            <div class={className} style={style}>
                <span
                    class={`cc-select-${variant} cc-select-${disabled ? 'disabled' : color} ${rounded ? 'cc-select-rounded' : 'cc-select'} ${raised && 'cc-select-raised'}`}
                >
                    <Slot name={'left'} />
                    <span
                        onClick$={$(() => {
                            if (disabled) return
                            showOptions.value = !showOptions.value
                        })}
                    >
                        <label>
                            {selectedOption.value
                                ? selectedOption.value
                                : placeholder}
                        </label>
                        <i
                            className={`${showOptions.value ? 'cc-shortArrow-down' : 'cc-shortArrow-left'} cc-icon-small`}
                        />
                    </span>
                    <div
                        className={`cc-select-items cc-select-${variant}`}
                        style={{ maxHeight }}
                        id={'id'}
                        hidden={!showOptions.value}
                    >
                        {values?.map((option) =>
                            option.group ? (
                                <span>
                                    <b>{option.option}</b>
                                </span>
                            ) : (
                                <div
                                    onClick$={$(() => {
                                        selectedOption.value = option.option
                                        showOptions.value = false
                                        onChange && onChange(option.option)
                                    })}
                                >
                                    {option.option}
                                </div>
                            )
                        )}
                    </div>
                    <Slot name={'right'} />
                    {floatingPlaceholder && placeholder && (
                        <label
                            style={
                                selectedOption.value == undefined
                                    ? { visibility: 'hidden' }
                                    : {}
                            }
                            class={`cc-select-label cc-select-${disabled ? 'disabled' : color}`}
                        >
                            {placeholder}
                        </label>
                    )}
                </span>
            </div>
        )
    }
)
