function chart_render(data) {
  const dates = Object.keys(data);
  const masses = Object.values(data);

  let option = {
    xAxis: {
      type: "category",
      data: dates,
    },
    yAxis: {
      type: "value",
      max: 110,
      min: 70,
      name: "质量 (kg)",
    },
    tooltip: {
      axisPointer: {
        type: "cross",
      },
    },
    series: [
      {
        data: masses,
        type: "line",
        smooth: true,
        connectNulls: true,
      },
    ],
  };

  return option;
}

export { chart_render };
