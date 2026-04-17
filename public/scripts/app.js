import { ChartManager } from '/scripts/chartManager.js';
import { ReleaseLineConfig } from '/scripts/config/releaseConfig.js';

const chartManager = new ChartManager();

const gamesData = window.gamesData || [];

const releaseConfig = new ReleaseLineConfig(gamesData);

chartManager.initializeChart(releaseConfig);

document.getElementById('yearFilterButton').addEventListener('click', () => {
    const minYear = parseInt(document.getElementById('minYear').value);
    const maxYear = parseInt(document.getElementById('maxYear').value);
    const { labels, data } = releaseConfig.filterByYear(gamesData, minYear, maxYear);
    chartManager.updateChart(labels, data);
});

document.getElementById('platformFilterButton').addEventListener('click', () => {
    const platform = document.getElementById('platformInput').value.trim();
    if (platform) {
        const { labels, data } = releaseConfig.filterByPlatform(gamesData, platform);
        chartManager.addDataset(`Platform: ${platform}`, labels, data, randomColor());
    } else {
        const { labels, data } = releaseConfig.filterByYear(gamesData);
        chartManager.updateChart(labels, data);
    }
});

document.getElementById('removeDatasetButton').addEventListener('click', () => {
    const datasetLabel = document.getElementById('datasetInput').value.trim();
    if (datasetLabel) {
        chartManager.removeDataset(datasetLabel);
    }
});

function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
}
