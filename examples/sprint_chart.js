var options = {
    series: [{ name: "Leistung", data: wattage }, { name: "Drehmoment", data: torque }],
    chart: {
        id: "wattagetorque", type: "line", toolbar: { autoSelected: "pan", show: false },
        events: {
            preciseClick: (event, chartContext, config, info) => {
                console.log(info)
            },
        },
        width: 1200,
        height: 600
    },
    colors: ["#008FFB", "#546E7A"], stroke: { width: 3, curve: "monotoneCubic" }, dataLabels: { enabled: false },
    tooltip: { enabled: false }, reticule: { enabled: true, series: 0 }, zoom: { enabled: false },
    xaxis: { title: { text: "Zeit [ms]", offsetY: 130 }, tickAmount: 20 },
    yaxis: [
        { seriesName: "Leistung", title: { text: "Leistung [W]" } },
        { seriesName: "Drehmoment", opposite: true, title: { text: "Drehmoment [N]" } }
    ],

    annotations: {
        yaxis: [
            { y: 500, y2: 400, fillColor: "#775DD0" },
        ],
        points: [
            {
                x: 7500, y: 500,
                marker: {
                    size: 5,
                    fillColor: "#ffffff",
                    strokeColor: "#775DD0",
                    strokeWidth: 4
                },
                label: {
                    borderColor: "#775DD0",
                    style: { color: "#fff", background: "#775DD0", },
                    text: `Leistungspeak (${500} W)`
                }
            },
            {
                x: 13500, y: 325,
                marker: {
                    size: 5,
                    fillColor: "#ffffff",
                    strokeColor: "#775DD0",
                    strokeWidth: 4
                },
                label: {
                    borderColor: "#775DD0",
                    style: { color: "#fff", background: "#775DD0", }
                }
            }
        ],
        xaxis: [
            {
                x: 1300,
                strokeDashArray: 0, borderColor: "#775DD0",
                label: {
                    borderColor: "#775DD0",
                    position: "bottom",
                    style: { color: "#fff", background: "#775DD0", },
                    text: "Alaktazidzeit",
                }
            }
        ],
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();