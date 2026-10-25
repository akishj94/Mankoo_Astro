
import type { APIRoute } from 'astro'
import { sanityClient } from 'sanity:client'

export const GET: APIRoute = async () => {
  try {
    const result = await sanityClient.fetch(`{
      "pages": count(*[_type == "page"]),
      "products": count(*[_type == "product"]),
      "posts": count(*[_type == "post"]),
      "siteSettings": *[_type == "siteSettings"][0]._id
    }`)

    return Response.json(result)
  } catch (error) {
    console.error('Sanity connection test failed:', error)

    return Response.json(
      { error: 'Failed to fetch data from Sanity.' },
      { status: 500 },
    )
  }
}
