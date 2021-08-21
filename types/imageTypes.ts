import {  ImageProps } from 'next/image'

export type AspectRatio = '1:1' | '4:3' | '16:9' | '3:2' | '9:12'
export type LayoutTypes = 'fixed' | 'intrinsic' | 'responsive'
export type FitValues   = 'pad' | 'fill' | 'crop' | 'scale';

export type CustomImageProps = {
    width: number;
    height?: never;
    layout: LayoutTypes,
    aspectRatio: AspectRatio,
    fit?: FitValues,
} & DistributiveOmit<ImageProps, 'height'>

// https://davidgomes.com/pick-omit-over-union-types-in-typescript/
type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never