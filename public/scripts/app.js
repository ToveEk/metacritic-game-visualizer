import { ChartManager } from '/scripts/chartManager.js';
import { ReleaseLineConfig } from '/scripts/config/releaseConfig.js';

const chartManager = new ChartManager();

const gamesData = window.gamesData || [];

const releaseConfig = new ReleaseLineConfig(gamesData);

chartManager.initializeChart(releaseConfig);

document.getElementById('yearFilterButton').addEventListener('click', async () => {
    const minYear = parseInt(document.getElementById('minYear').value);
    const maxYear = parseInt(document.getElementById('maxYear').value);

    document.getElementById('yearFilterButton').textContent = 'Loading...';

    const url = `/games/data?minYear=${minYear}&maxYear=${maxYear}`;
    const response = await fetch(url);
    const releasesPerYear = await response.json();

    const labels = releasesPerYear.map(release => release.year);
    const data = releasesPerYear.map(release => release.release_count);

    chartManager.updateChart(labels, data);

    document.getElementById('yearFilterButton').textContent = 'Filter by Year';
});

document.getElementById('platformFilterButton').addEventListener('click', async () => {
    const platform = document.getElementById('platformInput').value.trim();

    document.getElementById('platformFilterButton').textContent = 'Loading...';

    const url = platform ? `/games/data?platform=${platform}` : '/games/data';
    const response = await fetch(url);
    const releasesPerYear = await response.json();

    const labels = releasesPerYear.map(release => release.year);
    const data = releasesPerYear.map(release => release.release_count);
    
    chartManager.addDataset(`Platform: ${platform}`, labels, data, randomColor());

    document.getElementById('platformFilterButton').textContent = 'Filter by Platform';
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
