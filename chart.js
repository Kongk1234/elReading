function createGraph() {
    fetch('http://localhost:42069/getData', {
        })
        .then(response => response.json())
        .then(data => {
            let dataArr = []
            for (let index = 0; index < data.data.length; index++) {
                let yearsir = [];
                data.data[index].forEach(element => {
                    yearsir.push(element.el)
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
            let test = Array.from(Array(53).keys());
            test.splice(0,1)
            let testjson = {
                labels: test,
                datasets: []
            }
            calcData.forEach(element => {
                if (!element.length == 0) {
                    testjson.datasets.push({
                        label: "1",
                        data: element,
                        borderColor: randomColor(),
                        fill: false
                    });
                }
            });
            for (let index = 1; index < data.time.length; index++) {
                if (testjson.datasets[index]) {
                    testjson.datasets[index].label = data.time[index];
                } else {
                    console.error("Dataset not found at index", index);
                }
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