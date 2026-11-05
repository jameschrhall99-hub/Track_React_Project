type SupabaseEnvInput = {
  url?: string
  publishableKey?: string
}

type SupabaseConfig = {
  url: string
  publishableKey: string
}

type ConfigResult =
  | { ok: true; config: SupabaseConfig }
  | { ok: false; issues: string[] }

export function validateSupabaseEnv(input: SupabaseEnvInput): ConfigResult {
  const url = input.url?.trim()
  const publishableKey = input.publishableKey?.trim()

  const issues: string[] = []

  if (!url) {
    issues.push('VITE_SUPABASE_URL is missing.')
  } else {
    try {
      const parsedUrl = new URL(url)
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        issues.push('VITE_SUPABASE_URL must use http:// or https://.')
      }
    } catch {
      issues.push('VITE_SUPABASE_URL must be a valid URL.')
    }
  }

  if (!publishableKey) {
    issues.push('VITE_SUPABASE_PUBLISHABLE_KEY is missing.')
  } else if (!/^sb_publishable_\S+$/.test(publishableKey)) {
    issues.push(
      'VITE_SUPABASE_PUBLISHABLE_KEY must be a publishable key starting with sb_publishable_, with content after the prefix and no whitespace.',
    )
  }

  if (!url || !publishableKey || issues.length > 0) {
    return { ok: false, issues }
  }

  return {
    ok: true,
    config: {
      url,
      publishableKey,
    },
  }
}

export function readSupabaseConfig(): ConfigResult {
  return validateSupabaseEnv({
    url: import.meta.env.VITE_SUPABASE_URL,
    publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  })
}
