<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { useLecturaEtapa } from '~/composables/useLecturaEtapa';
import AreaOptionchart from "~/components/charts/areaOptionchart.vue";

const { fetchLecturaEquipo } = useLecturaEtapa();

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    fk: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    y2: {
        type: Number,
        required: true
    },
    etapa: {
        type: Number,
        required: true
    },
});

const etapa = props.etapa;
const fkvalor = props.fk;
const valoresArray = ref<number[]>([]);
const valorFecha = ref<string[]>([]);

async function recargarDatos() {
    try {
        const resultados = await fetchLecturaEquipo(etapa, fkvalor);
        const data = resultados.results.map((item: any) => ({
            id: item.id,
            valor: item.valor,
            fkEtapa: item.fkEtapa,
            created_at: item.created_at,
            createdTime_at: item.createdTime_at,
        }));

        // Actualizamos los arrays directamente
        valoresArray.value = data.map(item => Number(item.valor));
        valorFecha.value = data.map(item => item.created_at);
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
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



</script>

<template>
    <div>
        <area-optionchart
            :series="valoresArray"
            :name="props.name"
            :fecha="valorFecha"
            :y="props.y"
            :y2="props.y2">
        </area-optionchart>
        <UButton @click="recargarDatos">Recargar Datos</UButton>
    </div>
</template>
