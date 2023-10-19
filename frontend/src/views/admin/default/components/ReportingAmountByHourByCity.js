import React, { useState, useEffect } from "react";

// Chakra imports
import { Box, Flex, Select, Text,  } from "@chakra-ui/react";
import LineChart from "components/charts/LineChart";

// Custom components
import Card from "components/card/Card.js";

// Assets
import { useLineChart } from "hooks/useLineChart";
import { getReportingAmountByHourInterval } from "services/order-service";
import SwitchField from "components/fields/SwitchField";

const useCityReportingByHour = () => {
  const [startTime, setStartTime] = useState(undefined)
  const [endTime, setEndTime] = useState(undefined)
  const [callbackFn, setCallbackFn] = useState(() => () => getReportingAmountByHourInterval())

  useEffect(() => {
    setCallbackFn(() => () => getReportingAmountByHourInterval(startTime, endTime))
  }, [startTime, endTime])

  const onStartTimeChange = (selectedStartTime) => {
    setStartTime(selectedStartTime)
  }

  const onEndTimeChange = (selectedEndTime) => {
    setEndTime(selectedEndTime)
  }

  return {
    onStartTimeChange,
    onEndTimeChange,
    callbackFn
  }

}

export default function CityReportingAmount(props) {
  const { onStartTimeChange, onEndTimeChange, callbackFn} = useCityReportingByHour()
  const { chartOptions, chartData } = useLineChart(callbackFn, "ship_to_city_cd", "sum_rptg_amt")

  return (
    <Card align='center' direction='column' w='100%' {...props} key={chartData}>
      <Select>
        <SwitchField/>
      </Select>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Reporting Amount per City per Hour
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h='240px' mt='auto' overflowY="auto">
        <LineChart
          chartData={chartData}
          chartOptions={chartOptions}
        />
      </Box>
    </Card>
  );
}
