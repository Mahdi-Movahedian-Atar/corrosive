import {
    component$,
    useStore,
    $,
    useOn,
    useSignal,
    useVisibleTask$,
    Slot,
} from '@builder.io/qwik'

export interface ResizablePanelsProps {
    horizontal?: boolean
    min?: number
    max?: number
    storageKey?: string
    className?: string
    defaultOffset?: number
}

export const ResizablePanels = component$<ResizablePanelsProps>(
    ({
        horizontal = false,
        min = 5,
        max = 95,
        storageKey = undefined,
        className = 'w-full h-full',
        defaultOffset = 50,
    }) => {
        const mousePosition = useStore({
            x: defaultOffset,
            y: defaultOffset,
        })
        const isMouseDown = useSignal(false)
        const thisRef = useSignal<Element>()

        useOn(
            'mousemove',
            $((event: Event) => {
                const rect = thisRef.value!.getBoundingClientRect()
                isMouseDown.value &&
                    (mousePosition.x +=
                        ((event as MouseEvent).movementX / rect.width) * 100)
                isMouseDown.value &&
                    (mousePosition.y +=
                        ((event as MouseEvent).movementY / rect.height) * 100)
                min && mousePosition.x < min && (mousePosition.x = min)
                max && mousePosition.x > max && (mousePosition.x = max)
                min && mousePosition.y < min && (mousePosition.y = min)
                max && mousePosition.y > max && (mousePosition.y = max)
                storageKey &&
                    localStorage.setItem(
                        storageKey,
                        JSON.stringify(mousePosition)
                    )
            })
        )
        useOn(
            'touchmove',
            $((event: TouchEvent) => {
                const rect = thisRef.value!.getBoundingClientRect()
                isMouseDown.value && event.preventDefault()
                if (event.touches.length == 0) isMouseDown.value = false
                isMouseDown.value &&
                    (mousePosition.x =
                        ((event.touches[0].clientX - rect.left) / rect.width) *
                        100)
                isMouseDown.value &&
                    (mousePosition.y =
                        ((event.touches[0].clientY - rect.top) / rect.height) *
                        100)
                min && mousePosition.x < min && (mousePosition.x = min)
                max && mousePosition.x > max && (mousePosition.x = max)
                min && mousePosition.y < min && (mousePosition.y = min)
                max && mousePosition.y > max && (mousePosition.y = max)
                storageKey &&
                    localStorage.setItem(
                        storageKey,
                        JSON.stringify(mousePosition)
                    )
            })
        )
        useOn(
            'mouseup',
            $(() => {
                isMouseDown.value = false
            })
        )
        useOn(
            'touchend',
            $(() => {
                isMouseDown.value = false
            })
        )
        useVisibleTask$(() => {
            if (!storageKey) return
            const item = localStorage.getItem(storageKey)
            if (item === null) return
            const items: { x: number; y: number } = JSON.parse(item)
            items.x && (mousePosition.x = items.x)
            items.y && (mousePosition.y = items.y)
        })

        return (
            <div className={className} ref={thisRef}>
                <div
                    className={`${horizontal && ' flex-col'} cc-resizablePanels-parent`}
                >
                    <div
                        style={
                            horizontal
                                ? `height: ${mousePosition.y}%`
                                : `width: ${mousePosition.x}%`
                        }
                        className={`cc-resizablePanels-firstPanel`}
                    >
                        <Slot name="firstPanel" />
                    </div>
                    <span
                        className={
                            horizontal
                                ? 'cc-resizablePanels-draggable-vertical'
                                : 'cc-resizablePanels-draggable'
                        }
                        onMouseDown$={$(() => (isMouseDown.value = true))}
                        onMouseUp$={$(() => (isMouseDown.value = false))}
                        onMouseEnter$={$(
                            () =>
                                (document.body.style.cursor = horizontal
                                    ? 'row-resize'
                                    : 'col-resize')
                        )}
                        onMouseLeave$={$(
                            () => (document.body.style.cursor = 'auto')
                        )}
                        onTouchStart$={$(() => (isMouseDown.value = true))}
                        onTouchEnd$={$(() => (isMouseDown.value = false))}
                    >
                        <div
                            className={
                                horizontal
                                    ? 'cc-resizablePanels-content-vertical'
                                    : 'cc-resizablePanels-content'
                            }
                        />
                    </span>
                    <div className={'cc-resizablePanels-secondPanel'}>
                        <Slot name="secondPanel" />
                    </div>
                </div>
            </div>
        )
    }
)
