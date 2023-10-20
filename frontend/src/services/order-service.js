import { api } from "../utils/axios"

export const getReportingAmountByHourInterval = async (startTime="050000", endTime="120000") => {
  const response = await api.get(`/reporting-amount/hour`, {
    params: {
      startTime,
      endTime
    }
  })
  return response
}

export const getReportingAmountByCity = async (sortCol=undefined, sortOrder=undefined) => {
  const response = await api.get('/reporting-amount/city', {
    params: {
      sortCol, sortOrder
    }
  })
  return response
}

export const getRunningOrderQtyTotalByCity = async (cities) => {
  const response = await api.get('/order-qty/city', {
    params: {
      cities: JSON.stringify(cities)
    }
  })
  return response
}

export const getUniqueCities = async () => {
  const response = await api.get('/city')
  return response
}