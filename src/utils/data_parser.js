import dayjs from "dayjs";
import Papa from "papaparse";

function csv_parser(csvContent) {
  const result = Papa.parse(csvContent, {
    skipEmptyLines: true,
  });

  let dataArray = result.data.slice(2);
  let data = Array.from(dataArray, (row) => {
    return {
      mass: row[8],
      time: row[5],
    };
  });

  let startTime = dayjs(data[0].time);
  let endTime = dayjs(data[data.length - 1].time);

  let currentTime = startTime;
  let timeData = {};
  while (currentTime.isBefore(endTime) || currentTime.isSame(endTime, "day")) {
    let dayData = data.filter((item) =>
      dayjs(item.time).isSame(currentTime, "day")
    );
    if (dayData.length > 0) {
      let minMass = Math.min(...dayData.map((item) => parseFloat(item.mass)));

      timeData[currentTime.format("YYYY-MM-DD")] = minMass;
    } else {
      timeData[currentTime.format("YYYY-MM-DD")] = null;
    }
    currentTime = currentTime.add(1, "day");
  }

  return timeData;
}

export { csv_parser };
