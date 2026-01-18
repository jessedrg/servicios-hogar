import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

// Singleton SQL client to reuse connections
let sqlClient: NeonQueryFunction<false, false> | null = null

export function getSQL() {
  if (!sqlClient) {
    const url = process.env.NEON_DATABASE_URL
    if (!url) {
      throw new Error("NEON_DATABASE_URL is not set")
    }
    sqlClient = neon(url)
  }
  return sqlClient
}

// Helper to handle rate limiting with retry
export async function queryWithRetry<T>(queryFn: () => Promise<T>, maxRetries = 3, initialDelay = 500): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await queryFn()
    } catch (error: unknown) {
      lastError = error as Error
      const errorMsg = String(error)

      // Check for rate limit or connection errors
      if (errorMsg.includes("Too Many Requests") || errorMsg.includes("Failed to fetch") || errorMsg.includes("429")) {
        const delay = initialDelay * Math.pow(2, attempt)
        console.log(`[DB] Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        continue
      }

      // For other errors, throw immediately
      throw error
    }
  }

  throw lastError
}
