import Image, { ImageLoaderProps } from 'next/image'
import { useCallback } from 'react';

export type AspectRatio = '1:1' | '4:3' | '16:9' | '3:2' | '9:12'
export type LayoutTypes = 'fixed' | 'intrinsic' | 'responsive'
export type FitValues = 'pad' | 'fill' | 'crop' | 'scale';

interface CustomImageProps {
    layout: LayoutTypes,
    aspectRatio: AspectRatio,
    fit?: FitValues,
    src: string;
    width: number;
    height?: never;
    alt?: string;
    className?: string;
}

const toRatio = {
    '1:1': 1,
    '4:3': 3 / 4,
    '16:9': 9 / 16,
    '3:2': 2 / 3,
    '9:12': 12 / 9
}

const calcAspectRatio = (aspectRatio: AspectRatio, width: number) => {
    const ratio = toRatio[aspectRatio]
    return Math.floor(width * ratio);
}

export const CustomImage = (props: CustomImageProps) => {
    const { layout, src, width, aspectRatio, alt, className, fit = 'fill' } = props
    const height = calcAspectRatio(aspectRatio, width)

    const imageLoader = useCallback(
        (props: ImageLoaderProps) => {
            const loaderHeight = calcAspectRatio(aspectRatio, props.width)
            return `${props.src}?w=${props.width}&h=${loaderHeight}&fit=${fit}`
        },
        [aspectRatio, fit],
    )

    return (
        <Image
            src={src}
            layout={layout}
            width={width}
            height={height}
            loader={imageLoader}
            alt={alt}
            className={className}
        />
    )
}
