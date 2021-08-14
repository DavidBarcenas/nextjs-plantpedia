import React from 'react'
import { BLOCKS, Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options, } from '@contentful/rich-text-react-renderer'

interface RichTextProps {
    description: RichText;
}

const options: Options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_, children) => (
            <p className="rich-text">{children}</p>
        )
    }
}

export const RichText = ({description}: RichTextProps) => {
    const document: Document = description

    return (
        <>
            {documentToReactComponents(document, options)}
        </>
    )
}
