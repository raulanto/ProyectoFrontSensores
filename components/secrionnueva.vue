<!--sectionchartgauge-->
<script lang="ts" setup>
import {defineProps, onBeforeUnmount, onMounted, ref} from 'vue';
import {useLecturaEtapa} from '~/composables/useLecturaEtapa';
import VuechartGaugue from "~/components/charts/vuechartGaugue.vue";


const {fetchLecturaEquipolast} = useLecturaEtapa();
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
const valoresArray = ref(78);
const valorFecha = ref<string[]>([]);

async function recargarDatos() {
    try {
        const resultados = await fetchLecturaEquipolast(etapa, fkvalor);
        valoresArray.value=parseFloat(resultados.valor)

    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
}



onMounted(() => {
    recargarDatos(); // Cargar los datos inicialmente
    const intervalId = setInterval(() => {
        recargarDatos(); // Recargar cada 30 segundos
    }, 3000);

    // Limpiar intervalo cuando el componente se desmonta
    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
});

</script>

<template>
    <div class="">
        <vuechart-gaugue :valores-array="valoresArray" :valor-min="props.valorMin" :valor-max="props.valorMax" :name="props.name" :valor-pas="props.valorPas"/>
    </div>
</template>

<style scoped>
</style>
