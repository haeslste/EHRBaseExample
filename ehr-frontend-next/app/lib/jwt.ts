export function decodeJWT(token: string) {
    if (!token) return null
    try {
      const payload = token.split('.')[1]
      return JSON.parse(atob(payload))
    } catch {
      return null
    }
  }