function load(){
    let year = new Date().getFullYear()
    loadData(year)

    let yearInput = document.getElementById("year")
    let dateInput = document.getElementById("inputDate")
    addlistener(yearInput)
    addDataLoad(dateInput)
}

function addlistener(element){
    element.addEventListener("keypress", function(event) {
        if(event.keyCode === 13){
            loadData(element.value)
        }  
    });
}
function addDataLoad(element){
    element.addEventListener("keypress", function(event) {
        if(event.keyCode === 13){
            sendToDb(element.value)
        }  
    });
}

function closeModal() {
    window.location.replace("https://el.linde-barrith.dk")
    load();
}

const deleteRow = function() {
    console.log(this.id);
    const data = { "json": {
        "row" : parseInt(this.id)
        }}
    fetch('https://api.linde-barrith.dk/delete', {  
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    .then()
    setTimeout(() => {
        load();        
    }, 100);
  }

function loadData(year){
    let dataArr = [];
    let indexArr = [];
    const data = { "json": {
        "year" : parseInt(year)
      }}
    fetch('https://api.linde-barrith.dk/year', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        let totalprice = 0;
        tbody = document.getElementById("tableBody");
        while (tbody.firstChild) {
            tbody.removeChild(tbody.lastChild);
          }
      
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let tr = document.createElement("tr");
            let dates = document.createElement("th");
            let elhouse = document.createElement("th");
            let totalf = document.createElement("th");
            let totalkr = document.createElement("th");    
    
            let elfirst = document.createElement("th");
            let firstf = document.createElement("th");
            let firstkr = document.createElement("th");
            
            let deletee = document.createElement("button");
            deletee.innerHTML = " x "
            deletee.style.backgroundColor = "red"
            deletee.className = "btn"


            let dateValue = element.date.slice(0,10);
    
            let newDate = new Date(dateValue)
            let newDateString = newDate.toLocaleDateString("en-US", { day: 'numeric' }) + "-"+ newDate.toLocaleDateString("en-US", { month: 'short' }) + "-" + newDate.toLocaleDateString("en-US", { year: 'numeric' })  
    

            dates.innerHTML = newDateString;
            deletee.id = element.elHouse


            elhouse.innerHTML = element.elHouse + " KW/H";
            elhouse.value = element.elHouse;

            totalf.value = 0;
            if (index < data.length) {
                if (index == data.length -1) {
                    totalf.innerHTML = 0 + " KW/H"  
                    totalf.value = 0
                }
                else{
                    let tfin = element.elHouse - data[index+1].elHouse;
                    let tfval = element.elHouse - data[index+1].elHouse 
                    totalf.innerHTML = parseFloat(tfin.toFixed(2)) + " KW/H"   
                    totalf.value = parseFloat(tfval.toFixed(2)) 
                    dataArr.push(totalf.value)
                }
            }
            let tkr = totalf.value * element.kw;
            totalkr.innerHTML = parseFloat(tkr.toFixed(1)) + " kr."
            totalprice = totalprice + tkr
            elfirst.innerHTML = element.elFirst + " KW/H";
            elfirst.value = element.elFirst;

            firstf.value = 0;
            if (index < data.length) {
                if (index == data.length -1) {
                    firstf.innerHTML = 0 + " KW/H"  
                    firstf.value = 0
                }
                else{
                    let ffin = element.elFirst - data[index+1].elFirst;
                    let ffval = element.elFirst - data[index+1].elFirst 
                    firstf.innerHTML = parseFloat(ffin.toFixed(2)) + " KW/H"   
                    firstf.value = parseFloat(ffval.toFixed(2)) 
                }
            }
            let fkr = firstf.value * element.kw;
            firstkr.innerHTML = parseFloat(fkr.toFixed(1)) + " kr."
            
            deletee.onclick = deleteRow

            tr.appendChild(dates)
            tr.appendChild(elhouse)
            tr.appendChild(totalf)
            tr.appendChild(totalkr)
            tr.appendChild(elfirst)
            tr.appendChild(firstf)
            tr.appendChild(firstkr)
            tr.appendChild(deletee)
            tbody.appendChild(tr);

            let totalValue = document.getElementById("totalValue")
            totalValue.innerHTML = "Total pris: "+ parseFloat(totalprice.toFixed(2)) + " kr.";
            indexArr.push(index)
        }
        createGraph();
    })
}

function sendToDb(){
    let inputs = document.getElementsByName("test")
    let elementArr = [];
    inputs.forEach(element => {
        elementArr.push(element.value);
    });

    const data = { "json": {
        "elHouse" : parseFloat(elementArr[0]),
        "elFirst" : parseFloat(elementArr[1]),
        "kw": parseFloat(elementArr[2]),
        "date": elementArr[3]
      }}
    fetch('https://api.linde-barrith.dk/things', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    .then()
    setTimeout(() => {
        load();        
    }, 100);
}

function getYear(){
    let year = document.getElementById("year")
    loadData(year.value);
}
