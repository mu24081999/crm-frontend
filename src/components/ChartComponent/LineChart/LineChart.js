import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ categories, series, title }) => {
  const state = {
    series: series?.length > 0 ? series : [{ name: "no-data" }],

    // series:
    // [
    //   {
    //     name: "Calls",
    //     data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    //   },

    //   {
    //     name: "Calls Outbound",
    //     data: [74, 34, 23, 45, 65, 34, 69, 91, 148],
    //   },
    // ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        // text: "Calls Analystics",
        text: title,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories?.length > 0 ? categories : [{ name: "no-data" }],
        // [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        // ],
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
