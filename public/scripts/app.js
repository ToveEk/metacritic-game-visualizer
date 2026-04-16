import { ChartManager } from '/scripts/chartManager.js';
import { MetascoreBarConfig } from '/scripts/config/metascoreConfig.js';
import { ReleaseLineConfig } from '/scripts/config/releaseConfig.js';

const chartManager = new ChartManager();
const gamesData = window.gamesData || [];

const charts = {
    metascore: new MetascoreBarConfig(gamesData),
    release: new ReleaseLineConfig(gamesData)
}

chartManager.initializeChart(charts.metascore);

document.querySelectorAll('[data-chart]').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.dataset.chart;
        chartManager.initializeChart(charts[key]);
    });
});
