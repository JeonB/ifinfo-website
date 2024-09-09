export const isMobi = (userAgent: string | undefined) => {
  if (userAgent && /Mobi/i.test(userAgent)) {
    return true
  } else {
    return false
  }
}
