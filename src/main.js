import "./main.css";
import { csv_parser } from "./utils/data_parser";
import { chart_render } from "./utils/chart_render";
import * as echarts from "echarts";

const chart = echarts.init(document.getElementById("charts"));

function handleReaderLoad(e) {
  const csvContent = e.target.result;
  const parsedData = csv_parser(csvContent);

  const option = chart_render(parsedData);

  console.log(option);

  chart.setOption(option);
}

// 鼠标点击事件 触发文件选择
function handleBtnClick(event) {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
}

// 文件选择事件
function handleInputChange(event) {
  // 检测是不是csv文件
  const fileInput = event.target;
  const file = fileInput.files[0];
  if (file && file.name.endsWith(".csv")) {
    const reader = new FileReader();
    reader.onload = handleReaderLoad;
    reader.readAsText(file);
  } else {
    alert("请选择一个CSV文件");
  }
}

uploadButton.addEventListener("click", handleBtnClick);
fileInput.addEventListener("change", handleInputChange);
