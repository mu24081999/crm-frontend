import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
        // Customize the bar colors here
        colors: {
          ranges: [
            {
              from: 0,
              to: 3,
              color: "#FF6347", // Light red for bars with values 0 to 3
            },
            {
              from: 3.1,
              to: 10,
              color: "#007d88", // Green for bars with values 3.1 to 10
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val + "%",
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
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
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: (val) => val + "%",
      },
    },
    // title: {
    //   text: "Monthly Inflation in Argentina, 2002",
    //   floating: true,
    //   offsetY: 330,
    //   align: "center",
    //   style: {
    //     color: "#444",
    //   },
    // },
  };

  const series = [
    {
      name: "Inflation",
      data: [
        2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2, 2.3, 3.1,
        4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2, 2.3, 3.1, 4.0, 10.1,
        4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2,
      ],
    },
    {
      name: "Series 2",
      data: [
        13, 23, 20, 8, 13, 27, 33, 12, 13, 23, 18, 26, 2.3, 3.1, 4.0, 10.1, 4.0,
        3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2, 2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2,
        2.3, 1.4, 0.8, 0.5, 0.2,
      ],
    },
  ];

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
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
