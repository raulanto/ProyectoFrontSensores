<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { defineProps } from 'vue'

// const props = defineProps({
//     series: {
//         type: Array,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     fecha: {
//         type: Array
//     }
// })

let chartSeries =  [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
    }, {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80],
    }, {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10],
    }]
// let labelValor = props.name

// const datanueva = [
//     {
//         name: labelValor,
//         data: chartSeries
//     }
// ]

// function findMaxMin(array) {
//     if (!Array.isArray(array) || array.length === 0) {
//         throw new Error('El arreglo no debe estar vacío.')
//     }
//     let max = array[0]
//     let min = array[0]
//     for (let i = 1; i < array.length; i++) {
//         if (array[i] > max) {
//             max = array[i]
//         }
//         if (array[i] < min) {
//             min = array[i]
//         }
//     }
//     return { max, min }
// }
//
// const result = findMaxMin(props.series)
// const maximo = parseFloat(result.max)
// const minimo = parseFloat(result.min)



let chartOptions: ApexCharts.ApexOptions
chartOptions = {
    chart: {
        height: 350,
            type: 'radar',
            dropShadow: {
            enabled: true,
                blur: 1,
                left: 1,
                top: 1
        }
    },
    title: {
        text: 'Radar Chart - Multi Series'
    },
    stroke: {
        width: 2
    },
    fill: {
        opacity: 0.1
    },
    markers: {
        size: 0
    },
    yaxis: {
        stepSize: 20
    },
    xaxis: {
        categories: ['2011', '2012', '2013', '2014', '2015', '2016']
    }
}

</script>

<template>
    <ClientOnly>
        <VueApexCharts
            type="area"
            height="350px"
            :options="chartOptions"
            :series="chartSeries"
        ></VueApexCharts>
    </ClientOnly>

</template>

<style scoped>

</style>