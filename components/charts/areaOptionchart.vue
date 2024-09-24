<script setup lang="ts">
import { defineProps, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    series: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fecha: {
        type: Array,
        required: false
    },
    y: {
        type: Number,
        required: false
    },
    y2: {
        type: Number,
        required: false
    }
});

let chartSeries = ref([
    {
        name: props.name,
        data: props.series
    }
]);

let chartOptions = ref({
    chart: {
        type: 'area',
        height: 'auto',
        zoom: { enabled: true },
        stacked: false,
        offsetX: 0,
        colors: ['#c54a08'],
        zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: false,
            zoomedArea: {
                fill: {
                    color: '#f69971',
                    opacity: 0.4
                },
                stroke: {
                    color: '#c54a08',
                    opacity: 0.4,
                    width: 1
                }
            }
        }
    },


    fill: {
        colors: ['#ee905d', '#f1ad7c', '#ecd8c4']
    },
    stroke: {
        curve: 'smooth',

        colors: ['#f2751c'] // Cambiado a naranja
    },
    dataLabels: {
        enabled: false
    },
    yaxis: {
        min: props.y, // Cambiado a valor numérico
        max: props.y2 // Cambiado a valor numérico
    },
    xaxis: {
        categories: props.fecha,
        tickAmount: 15,
        labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: ['#1f1919'],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label'
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeUTC: true
        }
    },
    title: {
        text: props.name,
        align: 'center'
    },
    markers: {
        colors: ['#f47836', '#e9731e', '#f69971'], // Colors of the markers
        hover: {
            sizeOffset: 4
        }
    },

});

// Ver cambios en las props series y fecha para actualizar el gráfico
watch(() => props.series, (newSeries) => {
    chartSeries.value[0].data = newSeries;
}, { deep: true });

watch(() => props.fecha, (newFecha) => {
    chartOptions.value.xaxis.categories = newFecha;
});
</script>

<template>
    <ClientOnly>
        <VueApexCharts
            type="area"
            height="350px"
            :options="chartOptions"
            :series="chartSeries">
        </VueApexCharts>
    </ClientOnly>
</template>
<style>
.apexcharts-tooltip-marker {
    background-color: #f47836 !important; /* Cambia el color a rojo */
}
</style>