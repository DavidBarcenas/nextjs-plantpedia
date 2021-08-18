import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

interface ExcerptProps {
    richText: RichText;
    limit?: number;
    className?: string
}

export const Excerpt = ({ richText, limit = 180, className }: ExcerptProps) => {
    const plainText = documentToPlainTextString((richText))
    const excerpt = plainText.slice(0, limit).split(' ').slice(0, -1).join(' ')

    return (
        <p className={className}>
            {excerpt}
            <span> (...)</span>
        </p>
    )
}