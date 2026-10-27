import type { APIRoute } from 'astro'
import { getHeaderData } from '../lib/cms/header'

export const GET: APIRoute = async () => {
  try {
    const header = await getHeaderData()
    return Response.json(header)
  } catch (error) {
    console.error('Header data fetch failed:', error)

    return Response.json(
      { error: 'Failed to fetch header data' },
      { status: 500 },
    )
  }
}