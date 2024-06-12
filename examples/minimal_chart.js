var options = {
    chart: {
        type: 'line',
        height: 600,
        width: 900,
        toolbar: { autoSelected: "pan" }
    },
    series: [{
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    annotations: {
        xaxis: [
            {
                x: 1994,
                strokeDashArray: 0, borderColor: "#775DD0",
                label: {
                    borderColor: "#775DD0",
                    position: "bottom",
                    style: { color: "#fff", background: "#775DD0", },
                    text: "Anno",
                }
            }
        ],
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();