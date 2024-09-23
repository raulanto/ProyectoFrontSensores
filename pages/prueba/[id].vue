<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useEtapa } from '~/composables/useEtapa';
import TablaseccionEquipo from '~/components/equipo/tablaseccionEquipo.vue';
import TablaLectura from "~/components/etapa/tablaLectura.vue";
import Circular from "~/components/charts/Circular.vue";
import ViewArea from "~/components/charts/viewArea.vue";

const route = useRoute();
const { fetchEtapaid, putEtapa } = useEtapa();

const id = ref(route.params.id);
const etapaPrincipaldata = ref({});
const progressValue = ref(0);  // Valor de progreso
const intervalId = ref(null);  // Control del intervalo de actualización
const remainingTime = ref(0);  // Tiempo restante en milisegundos

// Función para convertir la duración "HH:MM:SS" a milisegundos
const convertDurationToMs = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

// Función para iniciar el progreso
const startProgress = ({ created_at, horacreacion, duracion, updated_at, activo }) => {
    if (activo === 2 || activo === 3) {
        return;  // No iniciar si está desactivado o terminado
    }

    const totalDurationMs = convertDurationToMs(duracion);
    const createdDateTime = new Date(`${created_at}T${horacreacion}`);
    const updatedDateTime = new Date(updated_at);

    const elapsedTime = updated_at ? (updatedDateTime - createdDateTime) : 0;
    remainingTime.value = totalDurationMs - elapsedTime;

    if (activo === 1 && remainingTime.value > 0) {
        intervalId.value = setInterval(() => {
            remainingTime.value -= 1000;
            progressValue.value = Math.min(((totalDurationMs - remainingTime.value) / totalDurationMs) * 100, 100);

            // Si el progreso llega al 100%
            if (remainingTime.value <= 0) {
                clearInterval(intervalId.value);
                progressValue.value = 100;  // Establecer al 100% cuando termine el tiempo
                markAsFinished();  // Marcar como terminado
            }
            // Guardar progreso en la base de datos
            saveProgress(progressValue.value);
        }, 1000);
    }
};

// Función para guardar el progreso en la API
const saveProgress = async (progress) => {
    try {
        await putEtapa({ progreso: progress }, id.value);  // Actualizar el progreso en la API
    } catch (error) {
        console.error('Error al guardar el progreso:', error.message);
    }
};

// Función para marcar la etapa como terminada
const markAsFinished = async () => {
    try {
        await putEtapa({ activo: 3, progreso: 100 }, id.value);  // Cambia el estado a 'Terminado' y guarda el 100%
    } catch (error) {
        console.error('Error al finalizar la etapa:', error.message);
    }
};

// Función para alternar entre activado y desactivado
const toggleActiveState = async () => {
    const newState = etapaPrincipaldata.value.activo === 1 ? 2 : 1; // Cambia entre activo (1) y desactivado (2)
    try {
        await putEtapa({ activo: newState }, id.value);
        etapaPrincipaldata.value.activo = newState;

        // Reiniciar el progreso si se activa nuevamente
        if (newState === 1) {
            startProgress(etapaPrincipaldata.value);
        } else {
            clearInterval(intervalId.value);  // Pausar el progreso si se desactiva
        }
    } catch (error) {
        console.error('Error al actualizar el estado:', error.message);
    }
};

// Cargar datos al montar el componente
onMounted(async () => {
    try {
        const { etapaPrincipal } = await fetchEtapaid(id.value);
        etapaPrincipaldata.value = etapaPrincipal;

        // Iniciar el progreso si la etapa está activa
        if (etapaPrincipal.activo === 1) {
            startProgress(etapaPrincipal);
        }
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});

// Observa el cambio en "activo" para pausar o reanudar el progreso
watch(() => etapaPrincipaldata.value.activo, (newValue) => {
    clearInterval(intervalId.value);  // Detener cualquier intervalo activo
    if (newValue === 1) {
        startProgress(etapaPrincipaldata.value);
    } else {
        clearInterval(intervalId.value);  // Pausar el progreso si no está activo
    }
});
</script>

<template>

</template>

<style scoped>

</style>