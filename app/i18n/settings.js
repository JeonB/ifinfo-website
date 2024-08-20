export const fallbackLng = 'ko'
export const languages = [fallbackLng, 'en-US', 'my']
export const defaultNS = 'index'
export const cookieName = 'i18next'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
