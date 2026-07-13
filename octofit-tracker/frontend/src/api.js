const codespaceName = import.meta.env.VITE_CODESPACE_NAME

function getCodespacesApiBaseUrl() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev')) {
    return `https://${window.location.hostname.replace('-5173.app.github.dev', '-8000.app.github.dev')}/api`
  }

  return 'http://localhost:8000/api'
}

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : getCodespacesApiBaseUrl()

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  return []
}

export async function fetchCollection(collection) {
  const response = await fetch(`${apiBaseUrl}/${collection}/`)

  if (!response.ok) {
    throw new Error(`Request failed for ${collection}: ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollectionResponse(payload)
}
