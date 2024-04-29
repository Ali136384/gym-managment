import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const App = ({ data }) => {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    colors: ["#008FFB"],
    xaxis: {
      categories: [
        "Ocak",
        "Subat",
        "Mart",
        "Nisan",
        "Mayis",
        "Haziran",
        "Temmuz",
        "Agostus",
        "Eylul",
        "Ekim",
        "Kasim",
        "Aralik",
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Customers",
      data: data,
    },
  ]);

  useEffect(() => {
    setSeries([{ name: "Customers", data: data }]);
  }, [data]);

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width={750}
      height={271}
    />
  );
};

export default App;
