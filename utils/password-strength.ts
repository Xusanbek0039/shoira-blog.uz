export function checkPasswordStrength(password: string): number {
  let strength = 0

  if (password.length >= 6) {
    strength += 20
  }

  if (password.length >= 8) {
    strength += 20
  }

  if (/[A-Z]/.test(password)) {
    strength += 20
  }

  if (/[a-z]/.test(password)) {
    strength += 10
  }

  if (/[0-9]/.test(password)) {
    strength += 15
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    strength += 15
  }

  return Math.min(strength, 100)
}
