export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Format: 12-Fevral, 2023
  const day = date.getDate()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${day}-${month}, ${year}`
}
