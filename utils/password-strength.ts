export function checkPasswordStrength(password: string): number {
  if (!password) return 0

  let score = 0

  // Length check
  if (password.length >= 8) score += 20
  if (password.length >= 12) score += 10

  // Complexity checks
  if (/[a-z]/.test(password)) score += 10 // Has lowercase
  if (/[A-Z]/.test(password)) score += 15 // Has uppercase
  if (/[0-9]/.test(password)) score += 15 // Has number
  if (/[^a-zA-Z0-9]/.test(password)) score += 20 // Has special character

  // Variety check
  const variety = new Set(password).size
  score += Math.min(variety * 2, 10)

  return Math.min(score, 100)
}
