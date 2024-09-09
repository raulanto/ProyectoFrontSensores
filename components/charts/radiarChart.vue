<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { defineProps, computed, watch } from 'vue'

const props = defineProps({
    valorMax: {
        type: Array as () => number[], // Especificar tipo para TypeScript
        required: true
    },
    valorMin: {
        type: Array as () => number[],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categoria: {
        type: Array as () => string[], // Especificar tipo para TypeScript
        required: true
    }
})

// Crear propiedades computadas reactivas para las series del gráfico
const chartSeries = computed(() => [{
    name: 'Valores Maximos',
    data: props.valorMax,
}, {
    name: 'Valores Minimos',
    data: props.valorMin,
}]);

// Crear una propiedad computada reactiva para las opciones del gráfico
const chartOptions = computed((): ApexCharts.ApexOptions => ({
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
        categories: props.categoria
    }
}));

// Usar watch para realizar alguna acción adicional si es necesario
watch(() => props, (newProps) => {
    // Puedes agregar lógica aquí si necesitas realizar alguna acción cuando las props cambien
}, { deep: true });

</script>

<template>
    <ClientOnly>
        <VueApexCharts
            type="radar"
            :options="chartOptions"
            :series="chartSeries"
        />
    </ClientOnly>

</template>
