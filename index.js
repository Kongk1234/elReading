function loadData(){
    fetch('http://localhost:3000/getData')
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
    
            let dateValue = element.date.slice(0,10);
    
            let newDate = new Date(dateValue)
            let newDateString = newDate.toLocaleDateString("en-US", { day: 'numeric' }) + "-"+ newDate.toLocaleDateString("en-US", { month: 'short' }) + "-" + newDate.toLocaleDateString("en-US", { year: 'numeric' })  
    
            dates.innerHTML = newDateString;
    
            elhouse.innerHTML = element.elHouse + " KW/H";
            elhouse.value = element.elHouse;

            totalf.value = 0;
            if (index > 0) {
                let tfin = element.elHouse - data[index-1].elHouse;
                let tfval = element.elHouse - data[index-1].elHouse 
                totalf.innerHTML = parseFloat(tfin.toFixed(2)) + " KW/H"   
                totalf.value = parseFloat(tfval.toFixed(2)) 
            }
            let tkr = totalf.value * element.kw;
            totalkr.innerHTML = parseFloat(tkr.toFixed(1)) + " kr."
            console.log(tkr);
            totalprice = totalprice + tkr
            console.log(totalprice);
            elfirst.innerHTML = element.elFirst + " KW/H";
            elfirst.value = element.elFirst;

            firstf.value = 0;
            if (index > 0) {
                let ffin = element.elFirst - data[index-1].elFirst;
                let ffval = element.elFirst - data[index-1].elFirst 
                firstf.innerHTML = parseFloat(ffin.toFixed(2)) + " KW/H"
                firstf.value = parseFloat(ffval.toFixed(2))
            }
            let fkr = firstf.value * element.kw;
            firstkr.innerHTML = parseFloat(fkr.toFixed(1)) + " kr."
            
            let total = document.createElement("th")
    
            tr.appendChild(dates)
            tr.appendChild(elhouse)
            tr.appendChild(totalf)
            tr.appendChild(totalkr)
            tr.appendChild(elfirst)
            tr.appendChild(firstf)
            tr.appendChild(firstkr)
            if (index == data.length -1) {
                console.log(totalprice);
                total.innerHTML = totalprice;
                total.value = totalprice;
                tr.appendChild(total)
            }else{
                total.value = ""
                tr.appendChild(total)
            }
            tbody.appendChild(tr);
        }
        
    })
}

function sendToDb(){
    let inputs = document.getElementsByName("test")
    let elementArr = [];
    inputs.forEach(element => {
        elementArr.push(element.value);
    });

    const data= { "json": {
        "elHouse" : parseFloat(elementArr[0]),
        "elFirst" : parseFloat(elementArr[1]),
        "kw": parseFloat(elementArr[2]),
        "date": elementArr[3]
      }}
    fetch('http://localhost:3000/things', {  
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    setTimeout(() => {
        loadData();        
    }, 100);
}