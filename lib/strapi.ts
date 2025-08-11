/**
 * API client for Strapi CMS
 */

// Set the Strapi API URL from environment variable or default to localhost during development
//const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://217.174.152.213:3001"
const STRAPI_URL =  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
/**
 * Fetch data from Strapi API
 * @param endpoint - API endpoint to fetch from
 * @param options - Additional fetch options
 * @returns Parsed JSON response
 */

export async function fetchAPI(endpoint: string, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 }, // ✅ Enables ISR
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    // if options already has `next`, preserve it:
    next: {
      ...(defaultOptions.next || {}),
      ...(options as any).next || {},
    },
  }

  const url = `${STRAPI_URL}/api${endpoint}`
  console.log("Fetching from Strapi:", url)

  try {
    const response = await fetch(url, mergedOptions)

    if (!response.ok) {
      console.error("Strapi API error:", {
        status: response.status,
        statusText: response.statusText,
        url,
      })

      const errorText = await response.text()
      console.error("Error details:", errorText)

      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}


/**
 * Get URL for Strapi media
 * @param media - Media object from Strapi
 * @returns Full URL to the media file
 */
export function getStrapiMedia(media: any) {
  if (!media || !media.data) return null

  const { url } = media.data.attributes
  return `${STRAPI_URL}${url}`
}

/**
 * Get articles from Strapi
 * @param params - Query parameters
 * @returns Articles data
 */

export async function getProducts(lang: string) {
    const data = await fetchAPI(
      `/products?populate=*&locale=${lang}&pagination[pageSize]=10`
    );
    // console.log("products", data.data);
    return data.data
}