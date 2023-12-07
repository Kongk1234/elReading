function createGraph() {
  fetch("https://api.linde-barrith.dk/getData", {})
    .then((response) => response.json())
    .then((data) => {
      let dataArr = [];
      for (let index = 0; index < data.data.length; index++) {
        let yearsir = { el: [], water: [], heat: [] };
        data.data[index].forEach((element) => {
          yearsir.el.push(element.el);
          yearsir.heat.push(element.heat);
          yearsir.water.push(element.water);
        });
        dataArr.push(yearsir);
      }
      let calcData = [];
      for (let index = 0; index < 2; index++) {
        const ell = dataArr[0].el;
        const water = dataArr[0].water;
        const heat = dataArr[0].heat;
        let temp = { el: [], water: [], heat: [] };
        for (let index1 = 1; index1 < ell.length; index1++) {
          let elData = ell[index1] - ell[index1 - 1];
          let waterData = water[index1] - water[index1 - 1];
          let heatData = heat[index1] - heat[index1 - 1];
          temp.el.push(elData);
          temp.water.push(waterData);
          temp.heat.push(heatData);
        }

        calcData = temp;
      }
      let test = Array.from(Array(53).keys());
      test.splice(0, 1);
      let elJson = {
        labels: test,
        datasets: []

      };
      let waterJson = {
        labels: test,
        datasets: []
      };
      let heatJson = {
        labels: test,
        datasets: []
      };
      if (!calcData.el.length == 0) {
        elJson.datasets.push({
          label: "KW/H",
          data: calcData.el,
          borderColor: randomColor(),
          fill: false,
        });
        waterJson.datasets.push({
          label: "M3",
          data: calcData.water,  
          borderColor: randomColor(),
          fill: false,
        });
        heatJson.datasets.push({
          label: "MW/H",
          data: calcData.heat,
          borderColor: randomColor(),
          fill: false,
        });
      }
      console.log(elJson);
      new Chart("myChart1", {
        type: "line",
        data: elJson,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Chart.js Line Chart",
            },
          },
        },
      });
      new Chart("myChart2", {
        type: "line",
        data: waterJson,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Chart.js Line Chart",
            },
          },
        },
      });
      new Chart("myChart3", {
        type: "line",
        data: heatJson,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Chart.js Line Chart",
            },
          },
        },
      });
    });
}

let colors = [
  "red",
  "green",
  "blue",
  "purple",
  "cyan",
  "pink",
  "orange",
  "yellow",
];
function randomColor() {
  let color = colors[0];
  colors.splice(0, 1);
  return color;
}
