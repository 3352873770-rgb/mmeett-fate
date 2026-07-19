/** 调用 meet-api；自动附带 uc token（lc-ut） */

type ApiEnvelope<T> = {
  code: number
  message?: string
  data: T
}

const TOKEN_HEADER = 'lc-ut'

function getStoredToken(storageKey: string): string | null {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { token?: string }
    return parsed.token ?? null
  } catch {
    return null
  }
}

export async function apiFetch<T>(
  storageKey: string,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getStoredToken(storageKey)
  if (token) {
    headers.set(TOKEN_HEADER, token)
    if (!headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const res = await fetch(path, { ...init, headers })
  const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null
  if (!res.ok) {
    const msg = json?.message || `请求失败 (${res.status})`
    throw new Error(msg)
  }
  if (json && typeof json.code === 'number' && json.code >= 400) {
    throw new Error(json.message || '请求失败')
  }
  return (json ? json.data : (undefined as T)) as T
}
