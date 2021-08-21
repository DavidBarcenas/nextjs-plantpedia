import { NextApiHandler } from "next";
import { getPlant } from "@api";

const enablePreview: NextApiHandler = async (request, response) => {
    const slug = request.query.slug

    /**
     * Check the secret and next parameters
     * This secret should only be known to this API route and the CMS
     */
    const secretIsValid = request.query.secret !== process.env.PREVIEW_SECRET
    if (secretIsValid || typeof slug !== 'string' || slug == '') {
        return response.status(401).json({ message: 'Invalid Token' })
    }

    try {
        // Fetch the headless CMS to check if the provided `slug` exists
        const plant = await getPlant(slug, true)

        // Enable Preview Mode by setting the cookies
        response.setPreviewData({})

        /**
         * Redirect to the path from the fetched plant
         * We don't redirect to request.query.slug as that might lead to 
         * open redirect vulnerabilities
         */
        response.redirect(`/entry/${plant.slug}`)
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error)
        }
        return response.status(401).json({ message: 'Invalid slug' })
    }
}

export default enablePreview