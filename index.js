function load() {
  let year = new Date().getFullYear();
  loadData(year);

  let yearInput = document.getElementById("year");
  let dateInput = document.getElementById("inputDate");
  addlistener(yearInput);
  addDataLoad(dateInput);
}

function addlistener(element) {
  element.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      loadData(element.value);
    }
  });
}
function addDataLoad(element) {
  element.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      sendToDb(element.value);
    }
  });
}

function closeModal() {
  window.location.replace("https://el.linde-barrith.dk");
  load();
}

const deleteRow = function () {
  const data = { json: { row: parseInt(this.id) } };
  fetch("https://api.linde-barrith.dk/delete", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then();
  setTimeout(() => {
    load();
  }, 100);
};

function loadData(year) {
  let dataArr = [];
  let indexArr = [];
  const data = {
    json: {
      year: parseInt(year),
    },
  };
  fetch("http://localhost:42069/year", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      let totalprice = 0;
      tbody = document.getElementById("tableBody");
      while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
      }

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let tr = document.createElement("tr");
        let dates = document.createElement("th");
        let el = document.createElement("th");
        let elForbrug = document.createElement("th");
        let elKr = document.createElement("th");

        let water = document.createElement("th");
        let waterForbrug = document.createElement("th");
        let waterKr = document.createElement("th");

        let heat = document.createElement("th");
        let heatForbrug = document.createElement("th");
        let heatKr = document.createElement("th");

        let deletee = document.createElement("button");
        deletee.innerHTML = " x ";
        deletee.style.backgroundColor = "red";
        deletee.className = "btn";

        let dateValue = element.date.slice(0, 10);

        let newDate = new Date(dateValue);
        let newDateString =
          newDate.toLocaleDateString("en-US", { day: "numeric" }) +
          "-" +
          newDate.toLocaleDateString("en-US", { month: "short" }) +
          "-" +
          newDate.toLocaleDateString("en-US", { year: "numeric" });

        dates.innerHTML = newDateString;
        deletee.id = element.el;

        el.innerHTML = element.el + " KW/H";
        el.value = element.el;

        elForbrug.value = 0;
        if (index < data.length) {
          if (index == data.length - 1) {
            elForbrug.innerHTML = 0 + " KW/H";
            elForbrug.value = 0;
          } else {
            let tfin = element.el - data[index + 1].el;
            let tfval = element.el - data[index + 1].el;
            elForbrug.innerHTML = parseFloat(tfin.toFixed(2)) + " KW/H";
            elForbrug.value = parseFloat(tfval.toFixed(2));
            dataArr.push(elForbrug.value);
          }
        }
        let tkr = elForbrug.value * element.kwh;
        elKr.innerHTML = parseFloat(tkr.toFixed(1)) + " KR.";
        totalprice = totalprice + tkr;


        water.innerHTML = element.water + " M3";
        water.value = element.water;
        waterForbrug.value = 0;
        if (index < data.length) {
          if (index == data.length - 1) {
            waterForbrug.innerHTML = 0 + " M3";
            waterForbrug.value = 0;
          } else {
            let ffin = element.water - data[index + 1].water;
            let ffval = element.water - data[index + 1].water;
            waterForbrug.innerHTML = parseFloat(ffin.toFixed(2)) + " M3";
            waterForbrug.value = parseFloat(ffval.toFixed(2));
          }
        }
        let wkr = waterForbrug.value * element.m3;
        waterKr.innerHTML = parseFloat(wkr.toFixed(1)) + " KR.";
        totalprice = totalprice + wkr;


        heat.innerHTML = element.heat + " M3";
        heat.value = element.heat;
        heatForbrug.value = 0;
        if (index < data.length) {
          if (index == data.length - 1) {
            heatForbrug.innerHTML = 0 + " M3";
            heatForbrug.value = 0;
          } else {
            let ffin = element.heat - data[index + 1].heat;
            let ffval = element.heat - data[index + 1].heat;
            heatForbrug.innerHTML = parseFloat(ffin.toFixed(2)) + " MW/H";
            heatForbrug.value = parseFloat(ffval.toFixed(2));
          }
        }
        let hkr = waterForbrug.value * element.mwh;
        heatKr.innerHTML = parseFloat(hkr.toFixed(1)) + " KR.";
        totalprice = totalprice + hkr;

        deletee.onclick = deleteRow;

        tr.appendChild(dates);
        tr.appendChild(el);
        tr.appendChild(elForbrug);
        tr.appendChild(elKr);
        tr.appendChild(water);
        tr.appendChild(waterForbrug);
        tr.appendChild(waterKr);
        tr.appendChild(heat);
        tr.appendChild(heatForbrug);
        tr.appendChild(heatKr);
        tr.style.textAlign = "center";
        tr.appendChild(deletee);
        tbody.appendChild(tr);

        let totalValue = document.getElementById("totalValue");
        totalValue.innerHTML =
          "Total pris: " + parseFloat(totalprice.toFixed(2)) + " kr.";
        indexArr.push(index);
      }
      createGraph();
    });
}

function sendToDb() {
  let inputs = document.getElementsByName("test");
  let elementArr = [];
  inputs.forEach((element) => {
    elementArr.push(element.value);
  });
  console.log(elementArr);
  const data = {
    json: {
      el: parseFloat(elementArr[0]),
      kwh: parseFloat(elementArr[1]),
      water: parseFloat(elementArr[2]),
      m3: parseFloat(elementArr[3]),
      heat: parseFloat(elementArr[4]),
      mwh: parseFloat(elementArr[5]),
      date: elementArr[6],
    },
  };
  fetch("http://localhost:42069/things", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then();
  setTimeout(() => {
    load();
  }, 100);
}

function getYear() {
  let year = document.getElementById("year");
  loadData(year.value);
}
