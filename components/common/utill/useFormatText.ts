import { useTranslation } from 'react-i18next'

const useFormatText = () => {
  const getFormatAmount = (number: number) => {
    return Number(number || '0').toLocaleString('my')
  }

  const getFormatInterestRate = (number: number) => {
    return Number(number || '0').toLocaleString('my', { minimumFractionDigits: 1 })
  }

  const useCommonText = (text: any, locale: string) => {
    const { t } = useTranslation(locale)
    return t(text)
  }

  const getFormatDate = (date: string, format: string) => {
    let rtnDt = ''
    if (!date) {
      return rtnDt
    }
    let dateFormat = ''
    if (format) {
      dateFormat = format
    } else {
      dateFormat = 'dd-MM-yyyy'
    }

    const dateDD_MM_YYYY = /^(0[1-9]|[12][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/
    const dateYYYY_MM_DD = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/
    const dateYYYYMMDD = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[0-1])$/

    if (dateDD_MM_YYYY.test(date)) {
      rtnDt = date.replace(/-/g, '').replace(/(\d{2})(\d{2})(\d{4})/, ($f, $1, $2, $3) => {
        return dateFormat.replace('yyyy', $3).replace('MM', $2).replace('dd', $1)
      })
    } else if (dateYYYY_MM_DD.test(date)) {
      rtnDt = date.replace(/-/g, '').replace(/(\d{4})(\d{2})(\d{2})/, ($f, $1, $2, $3) => {
        return dateFormat.replace('yyyy', $1).replace('MM', $2).replace('dd', $3)
      })
    } else if (dateYYYYMMDD.test(date)) {
      rtnDt = date.replace(/-/g, '').replace(/(\d{4})(\d{2})(\d{2})/, ($f, $1, $2, $3) => {
        return dateFormat.replace('yyyy', $1).replace('MM', $2).replace('dd', $3)
      })
    }

    return rtnDt
  }

  return {
    // getFormatText,
    getFormatAmount,
    getFormatInterestRate,
    getFormatDate,
    useCommonText,
  }
}

export default useFormatText
