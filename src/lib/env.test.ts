import { describe, expect, test } from 'vitest'
import { validateSupabaseEnv } from './env'

const validUrl = 'https://example.supabase.co'
const validKey = 'sb_publishable_test_value'

describe('validateSupabaseEnv', () => {
  test.each([undefined, '', ' \t\n '])(
    'reports both missing variables for blank input %j',
    (value) => {
      expect(
        validateSupabaseEnv({ url: value, publishableKey: value }),
      ).toEqual({
        ok: false,
        issues: [
          'VITE_SUPABASE_URL is missing.',
          'VITE_SUPABASE_PUBLISHABLE_KEY is missing.',
        ],
      })
    },
  )

  test('reports only the missing URL when a key is supplied', () => {
    expect(validateSupabaseEnv({ publishableKey: validKey })).toEqual({
      ok: false,
      issues: ['VITE_SUPABASE_URL is missing.'],
    })
  })

  test('reports only the missing key when a URL is supplied', () => {
    expect(validateSupabaseEnv({ url: validUrl })).toEqual({
      ok: false,
      issues: ['VITE_SUPABASE_PUBLISHABLE_KEY is missing.'],
    })
  })

  test.each(['not-a-url', 'ftp://example.supabase.co'])(
    'rejects an invalid URL: %s',
    (url) => {
      expect(validateSupabaseEnv({ url, publishableKey: validKey })).toEqual({
        ok: false,
        issues: [expect.stringMatching(/VITE_SUPABASE_URL must/)],
      })
    },
  )

  test.each([
    'wrong_prefix_test_value',
    'eyJhbGciOiJIUzI1NiJ9.synthetic.anon',
    'sb_publishable_',
    'sb_publishable_test value',
    'sb_publishable_test\tvalue',
    'sb_publishable_test\nvalue',
  ])('rejects an invalid publishable key: %j', (publishableKey) => {
    expect(validateSupabaseEnv({ url: validUrl, publishableKey })).toEqual({
      ok: false,
      issues: [
        expect.stringMatching(/VITE_SUPABASE_PUBLISHABLE_KEY.*publishable key/),
      ],
    })
  })

  test('collects both invalid-value issues without exposing supplied values', () => {
    const url = 'invalid-project-url'
    const publishableKey = 'invalid-private-key'
    const result = validateSupabaseEnv({ url, publishableKey })

    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('Expected configuration validation to fail')

    expect(result.issues).toHaveLength(2)
    expect(result.issues.join(' ')).toContain('VITE_SUPABASE_URL')
    expect(result.issues.join(' ')).toContain('VITE_SUPABASE_PUBLISHABLE_KEY')
    expect(result.issues.join(' ')).not.toContain(url)
    expect(result.issues.join(' ')).not.toContain(publishableKey)
  })

  test.each([
    validUrl,
    'http://127.0.0.1:54321',
    'https://api.example.com',
  ])('accepts a plausible HTTP or HTTPS URL: %s', (url) => {
    expect(validateSupabaseEnv({ url, publishableKey: validKey })).toEqual({
      ok: true,
      config: { url, publishableKey: validKey },
    })
  })

  test('returns trimmed values on success', () => {
    expect(
      validateSupabaseEnv({
        url: ` \t${validUrl}\n`,
        publishableKey: `\n${validKey} \t`,
      }),
    ).toEqual({
      ok: true,
      config: { url: validUrl, publishableKey: validKey },
    })
  })
})
