import React, {useState, useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import apexchart from "apexcharts";

const LineChart = (props) => {
  const [state, setState] = useState({
    chartData: props.chartData,
    chartOptions: props.chartOptions
  })

  useEffect(() => {
    setState({
      chartData: props.chartData,
      chartOptions: props.chartOptions
    })
  }, [props])


  return (
      <ReactApexChart
        options={state.chartOptions}
        series={state.chartData}
        type='line'
        width='100%'
        height='100%'
      />
  );

}

export default LineChart;
