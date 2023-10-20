import React, { useState, useEffect } from "react";

// Chakra imports
import { Box, Flex, Text,  } from "@chakra-ui/react";
import LineChart from "components/charts/LineChart";
import Select from 'react-select';

// Custom components
import Card from "components/card/Card.js";

// Assets
import { useLineChart } from "hooks/useLineChart";
import { getReportingAmountByCity } from "services/order-service";
import SwitchField from "components/fields/SwitchField";

const useReportingByCity = () => {
  const [sortCol, setSortCol] = useState("sum_rptg_amt")
  const [sortOrder, setSortOrder] = useState(undefined)
  const [callbackFn, setCallbackFn] = useState(() => () => getReportingAmountByCity())

  useEffect(() => {
    setCallbackFn(() => () => getReportingAmountByCity(sortCol, sortOrder))
  }, [sortCol, sortOrder])

  const onSortColChange = (col) => {
    setSortCol(col)
  }

  const onSortOrderChange = (order) => {
    setSortOrder(order)
  }

  return {
    onSortColChange,
    onSortOrderChange,
    callbackFn,
    sortOrder: sortOrder === "asc" ? "Ascending" : sortOrder === "desc" ? "Descending" : undefined
  }

}

export default function CityReportingAmount(props) {
  const { onSortColChange, onSortOrderChange, callbackFn, sortOrder} = useReportingByCity()
  const { chartOptions, chartData } = useLineChart(callbackFn, "ship_to_city_cd", "sum_rptg_amt", 1)

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
              Reporting Amount by City
            </Text>
          </Flex>
        </Flex>
        <Box w="100%" >
          <Select
            value={sortOrder ? {label: sortOrder, value: sortOrder}: undefined}
            options={[{ label: 'Ascending', value: 'asc' }, { label: 'Descending', value: 'desc' }]}
            onChange={(newValue) => onSortOrderChange(newValue.value)}
            overflowY
            maxMenuHeight="150px"
          />
        </Box>
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
