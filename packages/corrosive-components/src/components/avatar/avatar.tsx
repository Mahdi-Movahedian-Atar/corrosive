import { $, component$, CSSProperties, Slot, useSignal } from '@builder.io/qwik'

export interface AvatarProps {
    className?: string
    style?: CSSProperties
    src?: string
    alt?: string
    size?: number
    sizeType?: 'rem' | 'rm' | 'px' | string
    shape?: 'circle' | 'square' | number
    fallback?: string
    fallbackVariant?: 'solid' | 'outlined' | 'text'
    fallbackColor?: 'success' | 'error' | 'warning' | 'accent' | 'primary'
}
export const Avatar = component$<AvatarProps>(
    ({
        className,
        style = {
            height: 'fit-content',
            width: 'fit-content',
            position: 'relative',
        },
        src,
        alt = 'avatar',
        size = 2,
        sizeType = 'rem',
        shape = 'circle',
        fallbackVariant = 'solid',
        fallbackColor = 'primary',
        fallback = 'Fb',
    }) => {
        const thisStyles = {
            'font-size': size.toString() + sizeType,
            width: (size * 2).toString() + sizeType,
            height: (size * 2).toString() + sizeType,
            borderRadius:
                shape === 'circle'
                    ? '50%'
                    : shape === 'square'
                      ? '0%'
                      : shape.toString() + '%',
        }

        const srcError = useSignal(false)

        return (
            <div class={className} style={style}>
                <div
                    class={`cc-avatar cc-avatar-${fallbackVariant} cc-avatar-${fallbackColor}`}
                    style={thisStyles}
                >
                    {src && !srcError.value ? (
                        <img
                            src={src}
                            alt={alt}
                            onError$={$(() => (srcError.value = true))}
                        />
                    ) : (
                        <div class={'cc-avatar-fallback'}>
                            {fallback.toUpperCase()}
                        </div>
                    )}
                </div>
                <Slot />
            </div>
        )
    }
)
