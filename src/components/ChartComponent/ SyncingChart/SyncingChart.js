import React from "react";
import ReactApexChart from "react-apexcharts";

const GroupedStackedColumnChart = () => {
  // Define the options for the chart
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true, // Enable stacking
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical columns
        columnWidth: "50%", // Width of the columns
        borderRadius: 4, // Rounded corners
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    tooltip: {
      shared: true, // Show tooltip for all series on hover
      intersect: false, // Disable single data point tooltip on hover
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    },
    colors: ["#007d88", "#2fff5576"],

    fill: {
      opacity: 1,
    },
  };

  // Define the data series for the chart
  const series = [
    {
      name: "Series 1",
      data: [44, 55, 41, 67, 34, 34, 23, 34, 56, 100, 33.9], // Data for each group
    },
    {
      name: "Series 2",
      data: [13, 23, 20, 8, 56, 78, 32, 67, 32, 45, 80, 99], // Data for each group
    },
  ];

  // Render the chart component
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default GroupedStackedColumnChart;
