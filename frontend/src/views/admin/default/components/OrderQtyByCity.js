import React, { useState, useEffect, useMemo } from "react";

// Chakra imports
import { Box, Flex, Icon, Text,  } from "@chakra-ui/react";
import LineChart from "components/charts/LineChart";
import MiniStatistics from "components/card/MiniStatistics";
import Select from 'react-select';

// Custom components
import Card from "components/card/Card.js";

// Assets
import { useLineChart } from "hooks/useLineChart";
import { getRunningOrderQtyTotalByCity, getUniqueCities } from "services/order-service";

const useOrderQtyByCity = () => {
  const [cities, setCities] = useState([])
  const [total, setTotal] = useState(0)
  const [callbackFn, setCallbackFn] = useState(() => async () => {
    const { data } = await getRunningOrderQtyTotalByCity()
    setTotal(data.sum)
    return data
  })
  const [options, setOptions] = useState([])

  useEffect(() => {
    getUniqueCities().then(res => {
      setOptions(res.data)
    })
  }, [])

  useEffect(() => {
    setCallbackFn(() => async () => {
      const { data } = await getRunningOrderQtyTotalByCity(cities)
      setTotal(data.sum)
      return data
    })
  }, [cities])

  const batchUpdateCities = (batch) => {
    setCities(batch.map(({value}) => value))
  }

  return {
    batchUpdateCities,
    callbackFn, 
    total,
    options
  }

}

export default function OrderQtyByCity(props) {
  const { batchUpdateCities, total: runningTotal, callbackFn, options} = useOrderQtyByCity()
  const { chartOptions, chartData, categories } = useLineChart(callbackFn, "ship_to_city_cd", "sum_order_qty", 3)

  console.log(categories, chartOptions)
  return (
    <Card align='center' direction='column' w='100%' {...props} >
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Order Quantity by City
            </Text>
          </Flex>
          <MiniStatistics
            name={"Total Orders"}
            value={runningTotal}
            align="start"
          />
        </Flex>
        <Box w="100%" >
          <Select isMulti value={categories.map(cat => ({ label: cat, value: cat }))} options={options.map(opt => ({ label: opt, value: opt }))} onChange={(newValue) => batchUpdateCities(newValue)} overflowY maxMenuHeight="150px"/>
        </Box>
      </Flex>
      <LineChart
          chartData={chartData}
          chartOptions={chartOptions}
        />
    </Card>
  );
}
