export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Format: 12-Fevral, 2023
  const day = date.getDate()
  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${day}-${month}, ${year}`
}
