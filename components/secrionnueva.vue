<!--sectionchartgauge-->
<script lang="ts" setup>
import {defineProps, onBeforeUnmount, onMounted, ref} from 'vue';
import {useLecturaEtapa} from '~/composables/useLecturaEtapa';
import Vuekipichart from "~/components/charts/vuekipichart.vue";
import ViewArea from "~/components/charts/viewArea.vue";
import VuechartGaugue from "~/components/charts/vuechartGaugue.vue";


const {fetchLecturaEquipo} = useLecturaEtapa();
const media = ref();
const valorMaximo = ref();
const valorMinimo = ref();


const props = defineProps({
    name: {
        type: String,
        required: true
    },
    fk: {
        type: Number,
        required: true
    },
    valorMax: {
        type: Number,
        required: true
    },
    valorMin: {
        type: Number,
        required: true
    },
    etapa: {
        type: Number,
        required: true
    },
    valorPas: {
        type: Number,
        required: true
    },
});
// Función personalizada de redondeo
function round(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}
const etapa = props.etapa;
const fkvalor = props.fk;
const valoresArray = ref<number[]>([]);
const valorFecha = ref<string[]>([]);

async function recargarDatos() {
    try {
        const resultados = await fetchLecturaEquipo(etapa, fkvalor);
        const data = resultados.results.map((item: any) => ({
            valor: item.valor,
        }));

        // Actualizamos los arrays directamente
        valoresArray.value = data.map(item => Number(item.valor));
        valorFecha.value = data.map(item => item.created_at);

        // Actualizamos media, valor máximo y valor mínimo después de obtener los nuevos datos
        media.value = calcularMedia(valoresArray.value);
        valorMaximo.value = calcularMaximo(valoresArray.value);
        valorMinimo.value = calcularMinimo(valoresArray.value);
        console.log(valorMinimo.value,"valor minimo")
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
}

// Función para calcular la media de los valores
function calcularMedia(numeros: number[]): number {
    if (numeros.length === 0) return 0;
    const total = numeros.reduce((suma, numero) => suma + numero, 0);
    return round((total / numeros.length),1);
}

// Función para calcular el valor máximo
function calcularMaximo(numeros: number[]): number {
    return round((Math.max(...numeros)),1);
}

// Función para calcular el valor mínimo
function calcularMinimo(numeros: number[]): number {
    return Math.min(...numeros);
}

onMounted(() => {
    recargarDatos(); // Cargar los datos inicialmente
    const intervalId = setInterval(() => {
        recargarDatos(); // Recargar cada 30 segundos
    }, 30000);

    // Limpiar intervalo cuando el componente se desmonta
    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
});
recargarDatos()
</script>

<template>
    <div class="">
        <vuechart-gaugue :valores-array="valoresArray" :valor-min="props.valorMin" :valor-max="props.valorMax" :name="props.name" :valor-pas="props.valorPas"/>
    </div>
</template>

<style scoped>
</style>
