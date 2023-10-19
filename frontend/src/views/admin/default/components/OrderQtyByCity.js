import React, { useState, useEffect } from "react";

// Chakra imports
import { Box, Flex, Icon, Select, Text,  } from "@chakra-ui/react";
import LineChart from "components/charts/LineChart";
import MiniStatistics from "components/card/MiniStatistics";
import {
  MdOutlineAccountTree
} from "react-icons/md";

// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";

// Assets
import { useLineChart } from "hooks/useLineChart";
import { getRunningOrderQtyTotalByCity } from "services/order-service";

const useOrderQtyByCity = () => {
  const [cities, setCities] = useState([])
  const [total, setTotal] = useState(0)
  const [callbackFn, setCallbackFn] = useState(() => async () => {
    const { data } = await getRunningOrderQtyTotalByCity()
    setTotal(data.sum)
    return data
  })

  useEffect(() => {
    setCallbackFn(() => async () => {
      const { data } = await getRunningOrderQtyTotalByCity(cities)
      setTotal(data.sum)
      return data
    })
  }, [cities])

  const addCity = (city) => {
    setCities([...cities, city])
  }

  const removeCity = (city) => {
    setCities(cities.filter(city => city !== city))
  }

  return {
    addCity,
    removeCity,
    callbackFn, 
    total
  }

}

export default function OrderQtyByCity(props) {
  const { addCity, removeCity, total: runningTotal, callbackFn} = useOrderQtyByCity()
  const { chartOptions, chartData } = useLineChart(callbackFn, "ship_to_city_cd", "sum_order_qty")

  return (
    <Card align='center' direction='column' w='100%' {...props} key={chartData}>
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
          />
        </Flex>
      </Flex>
      <Box h='300px' mt='auto' overflowY="auto">
        <LineChart
          chartData={chartData}
          chartOptions={chartOptions}
        />
      </Box>
      
    </Card>
  );
}
