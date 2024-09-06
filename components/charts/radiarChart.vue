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
        name: 'Valores Maximos',
        data: [80, 50, 30],
    }, {
        name: 'Valores minimos',
        data: [20, 30, 40],
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

    stroke: {
        width: 2
    },
    fill: {
        opacity: 0.1
    },
    markers: {
        size: 0
    },

    xaxis: {
        categories: ['ph', 'Temperatura', 'Oxigeno disuelto']
    }
}

</script>

<template>
    <div class="section-card">
        <ClientOnly>
            <VueApexCharts
                type="radar"
                height="350"
                :options="chartOptions"
                :series="chartSeries"
            ></VueApexCharts>
        </ClientOnly>
    </div>


</template>

<style scoped>

</style>