<template>
    <div id="chart">
        <ClientOnly>
            <VueApexCharts
                type="radialBar"
                height="350"
                :options="chartOptions"
                :series="chartSeries"
            ></VueApexCharts>
        </ClientOnly>

    </div>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { defineProps } from 'vue'

const props = defineProps({
    labels: {
        type: String,
        required: true
    },
    series: {
        type: Number,
        required: true
    }
})

const chartSeries = [props.series]
const chartOptions = {
    chart: {
        height: 350,
        type: 'radialBar',
        offsetY: -10
    },

    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: {
                    fontSize: '16px',
                    color: undefined,
                    offsetY: 120
                },
                value: {
                    offsetY: 76,
                    fontSize: '22px',
                    color: undefined,
                    formatter: function (val) {
                        return val + '%'
                    }
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            gradientToColors: ['#ABE5A1'],
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
        }
    },
    stroke: {
        dashArray: 4
    },
    labels: [props.labels]
}
</script>