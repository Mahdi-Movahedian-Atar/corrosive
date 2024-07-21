import {
    $,
    component$,
    CSSProperties,
    implicit$FirstArg,
    QRL,
    Slot,
    useComputed$,
    useSignal,
    useTask$,
    useVisibleTask$,
} from '@builder.io/qwik'
import { isBrowser } from '@builder.io/qwik/build'

export interface ExpandableProps {
    className?: string
    visible?: boolean
    style?: CSSProperties
    color?: 'success' | 'error' | 'warning' | 'accent' | 'primary'
    variant?: 'solid' | 'outlined' | 'text'
    maxHeight?: number
    direction?: 'down' | 'up' | 'left' | 'right'
}

export function observerQrl<T>(
    fn: QRL<() => T>,
    ref: Element,
    options: IntersectionObserverInit = {}
): Promise<T> {
    return new Promise((res) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    res(fn())
                }
            })
        }, options)

        if (ref) {
            observer.observe(ref)
        }

        return () => {
            if (ref) {
                observer.unobserve(ref)
            }
        }
    })
}

export const observer$ = implicit$FirstArg(observerQrl)

export const Expandable = component$<ExpandableProps>(
    ({
        visible = false,
        className,
        style = {
            height: 'fit-content',
            width: 'fit-content',
        },
        variant = 'outlined',
        color = 'primary',
        maxHeight = 100,
        direction = 'down',
    }) => {
        const ref = useSignal<Element>()

        useVisibleTask$(() => {
            const element = ref.value?.getBoundingClientRect()
            if (element == undefined) return
            const elementPosition = [
                element.bottom,
                element.top,
                element.left,
                element.right,
            ]
            if (direction == 'left' || direction == 'right') {
                elementPosition[0] += element.height / 2
                elementPosition[1] -= element.height / 2
            }
            if (elementPosition[0] > window.innerHeight) {
                // @ts-ignore
                ref.value.style.top = 'unset'
                // @ts-ignore
                ref.value.style.bottom = '0vh'
                // @ts-ignore
                ref.value.style.transform = 'unset'
            }
            if (elementPosition[1] < 0) {
                // @ts-ignore
                ref.value.style.bottom = 'unset'
                // @ts-ignore
                ref.value.style.top = '0vh'
                // @ts-ignore
                ref.value.style.transform = 'unset'
            }
            if (elementPosition[2] < 0) {
                // @ts-ignore
                ref.value.style.right = 'unset'
                // @ts-ignore
                ref.value.style.left = '0vh'
            }
            if (elementPosition[3] > window.innerWidth) {
                // @ts-ignore
                ref.value.style.left = 'unset'
                // @ts-ignore
                ref.value.style.right = '0vw'
            }
        })

        return (
            <div class={className} style={style}>
                {visible && (
                    <div
                        className={`cc-expandable cc-expandable-${variant} cc-expandable-${color}`}
                        style={{
                            maxHeight,
                            bottom: direction == 'up' ? '100%' : 'unset',
                            top:
                                direction == 'down'
                                    ? '100%'
                                    : direction == 'left' ||
                                        direction == 'right'
                                      ? '50%'
                                      : 'unset',
                            left: direction == 'right' ? '100%' : 'unset',
                            right: direction == 'left' ? '100%' : 'unset',
                            transform:
                                direction == 'left' || direction == 'right'
                                    ? 'translateY(-50%)'
                                    : 'unset',
                        }}
                        ref={ref}
                    >
                        <Slot />
                    </div>
                )}
            </div>
        )
    }
)
