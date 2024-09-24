<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { useLecturaEtapa } from '~/composables/useLecturaEtapa';
import AreaOptionchart from "~/components/charts/areaOptionchart.vue";
import CharPh from "~/components/charts/charPh.vue";

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
            valor: item.valor,
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
        <char-ph
            :name="props.name"
            :valorMax="props.y"
            :valorMin="props.y2"
            :valoresArray="valoresArray"
        />

        <UButton @click="recargarDatos">Recargar Datos</UButton>
    </div>
</template>
