import { useEffect, useState } from "react"
import { reduceByKey } from "utils/chart"
import { lineChartOptionsGeneral } from "utils/chartOptions"

export const useLineChart = (callbackFn, categoryKey, chartDataKey, chartId) => {
  const [chartOptions, setChartOptions] = useState({})
  const [chartData, setChartData] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    callbackFn().then(res => {
      // get categories
      const cats = reduceByKey(res.data, categoryKey)
      setCategories(cats)
      // get data
      const data = reduceByKey(res.data, chartDataKey)
      setChartData([{
        name: chartDataKey,
        data: data
      }])
    })

  }, [callbackFn])

  useEffect(() => {
    const _chartOptions = {...lineChartOptionsGeneral}
    _chartOptions['xaxis']['categories'] = [...categories]
    _chartOptions['xaxis']['type'] = "category"
    _chartOptions["chart"]["id"] = chartId
    setChartOptions({ ..._chartOptions })
  }, [categories])

  return {chartData, categories, chartOptions}
}