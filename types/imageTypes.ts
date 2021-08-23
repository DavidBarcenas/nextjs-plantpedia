import { ImageProps } from 'next/image'
import { DistributiveOmit } from './distributive';

export type AspectRatio = '1:1' | '4:3' | '16:9' | '3:2' | '9:12'
export type LayoutTypes = 'fixed' | 'intrinsic' | 'responsive'
export type FitValues   = 'pad' | 'fill' | 'crop' | 'scale';

export type CustomImageProps = {
    width: number;
    height?: never;
    layout?: LayoutTypes,
    aspectRatio: AspectRatio,
    fit?: FitValues,
} & DistributiveOmit<ImageProps, 'height'>

