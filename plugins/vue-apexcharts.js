// plugins/vue-apexcharts.js
import Vue from 'vue';

if (process.client) {
    const VueApexCharts = require('vue3-apexcharts');
    Vue.component('ApexChart', VueApexCharts.default || VueApexCharts);
}
