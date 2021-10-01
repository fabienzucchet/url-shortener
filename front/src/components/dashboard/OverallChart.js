import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const mockDatasets = {
    "none": [{ label: "All URL", borderColor: ["rgba(255, 99, 132, 1)",], borderWidth: 1, data: [{ x: 1621161602, y: 12 },{ x: 1621248002, y: 19 },{ x: 1621334402, y: 39 },{ x: 1621420802, y: 43 },{ x: 1621507202, y: 13 },{ x: 1621593602, y: 41 },{ x: 1621680002, y: 29 },{ x: 1621766402, y: 38 },{ x: 1621852802, y: 24 },{ x: 1621939202, y: 11 },{ x: 1622025602, y: 18 },{ x: 1622112002, y: 9 },{ x: 1622198402, y: 27 },{ x: 1622284802, y: 26 },{ x: 1622371202, y: 32 },{ x: 1622457602, y: 29 },{ x: 1622544002, y: 42 }]}],
    "url": [
        { label: "URL 1", borderColor: ["rgba(255, 99, 132, 1)",], borderWidth: 1, data: [{ x: 1621161602, y: 12 }, { x: 1621248002, y: 19 }, { x: 1621334402, y: 39 }, { x: 1621420802, y: 43 }, { x: 1621507202, y: 13 }, { x: 1621593602, y: 41 }, { x: 1621680002, y: 29 }, { x: 1621766402, y: 38 }, { x: 1621852802, y: 24 }, { x: 1621939202, y: 11 }, { x: 1622025602, y: 18 }, { x: 1622112002, y: 9 }, { x: 1622198402, y: 27 }, { x: 1622284802, y: 26 }, { x: 1622371202, y: 32 }, { x: 1622457602, y: 29 }, { x: 1622544002, y: 42 }] },
        { label: "URL 2", borderColor: ["rgba(0, 99, 132, 1)",], borderWidth: 1, data: [{ x: 1621161602, y: 19 }, { x: 1621248002, y: 39 }, { x: 1621334402, y: 43 }, { x: 1621420802, y: 13 }, { x: 1621507202, y: 41 }, { x: 1621593602, y: 29 }, { x: 1621680002, y: 38 }, { x: 1621766402, y: 24 }, { x: 1621852802, y: 11 }, { x: 1621939202, y: 18 }, { x: 1622025602, y: 9 }, { x: 1622112002, y: 27 }, { x: 1622198402, y: 26 }, { x: 1622284802, y: 32 }, { x: 1622371202, y: 29 }, { x: 1622457602, y: 42 }, { x: 1622544002, y: 12 }] },
        { label: "URL 3", borderColor: ["rgba(253, 0, 132, 1)",], borderWidth: 1, data: [{ x: 1621161602, y: 39 }, { x: 1621248002, y: 43 }, { x: 1621334402, y: 13 }, { x: 1621420802, y: 41 }, { x: 1621507202, y: 29 }, { x: 1621593602, y: 38 }, { x: 1621680002, y: 24 }, { x: 1621766402, y: 11 }, { x: 1621852802, y: 18 }, { x: 1621939202, y: 9 }, { x: 1622025602, y: 27 }, { x: 1622112002, y: 26 }, { x: 1622198402, y: 32 }, { x: 1622284802, y: 29 }, { x: 1622371202, y: 42 }, { x: 1622457602, y: 12 }, { x: 1622544002, y: 19 }] },
        { label: "URL 4", borderColor: ["rgba(252, 99, 0, 1)",], borderWidth: 1, data: [{ x: 1621161602, y: 43 }, { x: 1621248002, y: 13 }, { x: 1621334402, y: 41 }, { x: 1621420802, y: 29 }, { x: 1621507202, y: 38 }, { x: 1621593602, y: 24 }, { x: 1621680002, y: 11 }, { x: 1621766402, y: 18 }, { x: 1621852802, y: 9 }, { x: 1621939202, y: 27 }, { x: 1622025602, y: 26 }, { x: 1622112002, y: 32 }, { x: 1622198402, y: 29 }, { x: 1622284802, y: 42 }, { x: 1622371202, y: 12 }, { x: 1622457602, y: 19 }, { x: 1622544002, y: 39 }] }
    ],
    "referrer": [
        { label: "Referrer 1", borderColor: ["rgba(255, 99, 132, 1)",], borderWidth: 1, data: [{ x: 1621161602, y: 13 }, { x: 1621248002, y: 41 }, { x: 1621334402, y: 29 }, { x: 1621420802, y: 38 }, { x: 1621507202, y: 24 }, { x: 1621593602, y: 11 }, { x: 1621680002, y: 18 }, { x: 1621766402, y: 9 }, { x: 1621852802, y: 27 }, { x: 1621939202, y: 26 }, { x: 1622025602, y: 32 }, { x: 1622112002, y: 29 }, { x: 1622198402, y: 42 }, { x: 1622284802, y: 12 }, { x: 1622371202, y: 19 }, { x: 1622457602, y: 39 }, { x: 1622544002, y: 43 }] },
        { label: "Referrer 2", borderColor: ["rgba(0, 99, 132, 1)",], borderWidth: 1, data: [{ x: 1621161602, y: 41 }, { x: 1621248002, y: 29 }, { x: 1621334402, y: 38 }, { x: 1621420802, y: 24 }, { x: 1621507202, y: 11 }, { x: 1621593602, y: 18 }, { x: 1621680002, y: 9 }, { x: 1621766402, y: 27 }, { x: 1621852802, y: 26 }, { x: 1621939202, y: 32 }, { x: 1622025602, y: 29 }, { x: 1622112002, y: 42 }, { x: 1622198402, y: 12 }, { x: 1622284802, y: 19 }, { x: 1622371202, y: 39 }, { x: 1622457602, y: 43 }, { x: 1622544002, y: 13 }] }
    ]
}

const chartConfig = {
    type: "line",
    data: {
        datasets: mockDatasets["none"]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        },
        responsive: true,
        maintainAspectRatio: false,
    }
};

const OverallChart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    const updateDataset = useCallback((newDataset) => {
        chartInstance.data.datasets = newDataset;
        chartInstance.update();
    }, [chartInstance]);

    const [filter, setFilter] = useState('none');

    const noneFilter = useCallback(() => {
        setFilter('none');
        updateDataset(mockDatasets["none"]);
    }, [updateDataset]);

    const urlFilter = useCallback(() => {
        setFilter('url');
        updateDataset(mockDatasets["url"]);
    }, [updateDataset]);

    const referrerFilter = useCallback(() => {
        setFilter('referrer');
        updateDataset(mockDatasets["referrer"]);
    }, [updateDataset]);

    return (
        <div className="overall-chart">
            <div className="overall-chart-filter">
                <span className="filter-label">Group by :</span>
                <button className={`filter-button ${filter === "none" ? "filter-button-focus" : "filter-button-unfocus"}`} onClick={noneFilter}>None</button>
                <button className={`filter-button ${filter === "url" ? "filter-button-focus" : "filter-button-unfocus"}`} onClick={urlFilter}>Url</button>
                <button className={`filter-button ${filter === "referrer" ? "filter-button-focus" : "filter-button-unfocus"}`} onClick={referrerFilter}>Referrer</button>
            </div>
            <canvas ref={chartContainer} />
        </div>
    );

};

export default OverallChart;
