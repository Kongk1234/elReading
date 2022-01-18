function createGraph() {
    fetch('https://api.linde-barrith.dk/getData', {
        })
        .then(response => response.json())
        .then(data => {
            let dataArr = []
            for (let index = 0; index < data.data.length; index++) {
                let yearsir = [];
                data.data[index].forEach(element => {
                    yearsir.push(element.elHouse)
                });
                dataArr.push(yearsir);
            }
            let calcData = [];
            for (let index = 0; index < dataArr.length; index++) {
                const element = dataArr[index];
                let temp = [];
                for (let index1 = 1; index1 < element.length; index1++) {
                    let newData = element[index1] - element[index1 - 1]
                    temp.push(newData)
                }
                calcData.push(temp)

            }
            let test = Array.from(Array(52).keys());
            let testjson = {
                labels: test,
                datasets: []
            }
            calcData.forEach(element => {
                if (!element.length == 0) {
                    testjson.datasets.push({
                        label: "",
                        data: element,
                        borderColor: randomColor(),
                        fill: false
                    });
                }
            });
            for (let index = 0; index < data.time.length; index++) {
                testjson.datasets[index].label =  data.time[index]              
            }
            new Chart("myChart", {
                type: "line",
                data: testjson,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart'
                        }
                    }
                },
            });
        })
    }
    
    let colors = ["red", "green", "blue", "purple", "cyan", "pink", "orange", "yellow"]
    function randomColor(){
        let color = colors[0]  
        colors.splice(0, 1)
        return color;
    }