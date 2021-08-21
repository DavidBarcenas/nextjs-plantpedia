import { useCallback } from 'react';
import NextImage, { ImageLoaderProps } from 'next/image'
import { AspectRatio, CustomImageProps } from 'types/imageTypes';

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

export const CustomImage = ({ width, aspectRatio, fit = 'fill', ...nextImageProps }: CustomImageProps) => {
    const height = calcAspectRatio(aspectRatio, width)

    const imageLoader = useCallback(
        (props: ImageLoaderProps) => {
            const height = calcAspectRatio(aspectRatio, props.width)
            return `${props.src}?w=${props.width}&h=${height}&fit=${fit}`
        },
        [aspectRatio, fit],
    )

    return (
        <NextImage
            {...nextImageProps}
            width={width}
            height={height}
            loader={imageLoader}
        />
    )
}
