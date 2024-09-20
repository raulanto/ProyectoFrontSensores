<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useProceso } from '~/composables/useProceso';
import { useEtapa } from '~/composables/useEtapa';
import TablaseccionEquipo from '~/components/equipo/tablaseccionEquipo.vue';
import TablaLectura from "~/components/etapa/tablaLectura.vue";
import Circular from "~/components/charts/Circular.vue";
import ViewArea from "~/components/charts/viewArea.vue";

const route = useRoute();
const { fetchProceso } = useProceso();
const { fetchEtapaid, putEtapa } = useEtapa();

const id = ref(route.params.id);
const proceso = ref([]);
const etapa = ref({});
const fkequipo = ref(null);
const etapaPrincipaldata = ref({});
const progressValue = ref(0);  // Valor de progreso
const intervalId = ref(null);  // Control del intervalo de actualización
const remainingTime = ref(0);  // Tiempo restante en milisegundos

onMounted(async () => {
    try {
        const procesoData = await fetchProceso();
        const { etapaPrincipal, fkProceso } = await fetchEtapaid(id.value);

        etapa.value = fkProceso;
        proceso.value = procesoData.results;
        etapaPrincipaldata.value = etapaPrincipal;
        fkequipo.value = etapa.value.fkequipo;

        if (etapaPrincipal.activo) {
            startProgress(etapaPrincipal);
        }
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});
onBeforeMount(async () => {
    try {
        const procesoData = await fetchProceso();
        const { etapaPrincipal, fkProceso } = await fetchEtapaid(id.value);

        etapa.value = fkProceso;
        proceso.value = procesoData.results;
        etapaPrincipaldata.value = etapaPrincipal;
        fkequipo.value = etapa.value.fkequipo;

        if (etapaPrincipal.activo) {
            startProgress(etapaPrincipal);
        }
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});

// Función para calcular el progreso
// Función para calcular el progreso
const startProgress = ({ created_at, createdTime_at, duracion, updated_at, activo }) => {
    const totalDurationMs = convertDurationToMs(duracion);
    const createdDateTime = new Date(`${created_at}T${createdTime_at}`);
    const updatedDateTime = new Date(updated_at);

    // Calcular el tiempo transcurrido
    const elapsedTime = updated_at ? (updatedDateTime - createdDateTime) : 0;
    remainingTime.value = totalDurationMs - elapsedTime;

    // Si el estado es 'Terminado', mostrar 100% de progreso
    if (activo === 3) {
        progressValue.value = 100;
        return;  // No hacer nada más si ya está terminado
    }

    // Si el estado es 'Desactivado', mostrar el progreso hasta donde se quedó
    if (activo === 2) {
        progressValue.value = Math.min(((totalDurationMs - remainingTime.value) / totalDurationMs) * 100, 100);
        return;  // No avanzar el progreso si está desactivado
    }

    // Si el estado es 'Activo', iniciar el progreso
    if (activo === 1 && remainingTime.value > 0) {
        intervalId.value = setInterval(() => {
            remainingTime.value -= 1000;
            progressValue.value = Math.min(((totalDurationMs - remainingTime.value) / totalDurationMs) * 100, 100);

            if (remainingTime.value <= 0) {
                clearInterval(intervalId.value);
                progressValue.value = 100;  // Establecer al 100% si el tiempo ha terminado
                markAsFinished();  // Marcar como terminado cuando el progreso sea del 100%
            }
        }, 1000);
    }
};

// Observa el cambio en "activo" para pausar o reanudar el progreso
watch(() => etapaPrincipaldata.value.activo, (newValue) => {
    clearInterval(intervalId.value);  // Detener cualquier intervalo activo
    startProgress(etapaPrincipaldata.value);  // Reiniciar el cálculo del progreso basado en el nuevo estado
});

// Función para marcar la etapa como terminada
const markAsFinished = async () => {
    await putEtapa({ activo: 3 }, id.value);  // Cambia el estado a 'Terminado'
};

// Función para alternar entre activado y desactivado
const toggleActiveState = async () => {
    const newState = etapaPrincipaldata.value.activo === 1 ? 2 : 1; // Cambia entre activo (1) y desactivado (2)
    try {
        await putEtapa({ activo: newState }, id.value);

        // Vuelve a obtener los datos de la etapa después de actualizar el estado
        const { etapaPrincipal } = await fetchEtapaid(id.value);
        etapaPrincipaldata.value = etapaPrincipal;
    } catch (error) {
        console.error('Error al actualizar el estado:', error.message);
    }
};


// Función para convertir la duración "HH:MM:SS" a milisegundos
const convertDurationToMs = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

// Observa el cambio en "activo" para pausar o reanudar el progreso
watch(() => etapaPrincipaldata.value.activo, (newValue) => {
    if (newValue === 1) {
        startProgress(etapaPrincipaldata.value);
    } else {
        clearInterval(intervalId.value);  // Pausar el progreso si no está activo
    }
});

// Definir metadatos de la página
definePageMeta({
    layout: 'dasboradlyt',
    middleware: ['auth'],
});

const links = [
    { label: 'Proceso', icon: 'i-heroicons-square-3-stack-3d', to: '/procesos' },
    { label: 'Panel del Proceso', icon: 'i-heroicons-square-3-stack-3d', to: { name: 'proceso-id', params: { id: id.value } } },
    { label: 'Panel de la etapa', icon: 'i-heroicons-link' },
];

const tasbItems = [
    { key: 'equipo', label: 'Seccion Equipo', icon: 'i-heroicons-information-circle' },
    { key: 'grafico', label: 'Graficas' },
    { key: 'lecturas', label: 'Lecturas', icon: 'i-heroicons-eye-dropper' }
];

// Función para obtener la etiqueta del estado
function getLabel(value) {
    const labels = { 1: 'Activo', 2: 'Desactivado', 3: 'Terminado', 4: 'Error' };
    return labels[value] || 'Desconocido';
}

// Función para obtener el color del estado
function getColor(value) {
    const colors = { 1: 'emerald', 2: 'orange', 3: 'red', 4: 'gray' };
    return colors[value] || 'gray';
}
</script>
<template>
    <section class="section-card">
        <UBreadcrumb :links="links" />
    </section>

    <div class="grid grid-cols-5 grid-rows-1 gap-4">
        <div class="col-span-2 section-card">
            <div class="flex flex-col">
                <div>Nombre de la etapa: <span class="font-bold text-primary-500">{{ etapaPrincipaldata.nombre }}</span></div>
                <div>
                    <UBadge
                        class="px-2"
                        size="xl"
                        :label="getLabel(etapaPrincipaldata.activo)"
                        :color="getColor(etapaPrincipaldata.activo)"
                        variant="subtle"
                    />
                </div>
            </div>
        </div>

        <div class="col-start-3 section-card">
            <div class="flex flex-col">
                <div>Fecha: <span class="font-bold text-primary-500">{{ etapaPrincipaldata.created_at }}</span></div>
                <div>Hora: <span class="font-bold text-primary-500">{{ etapaPrincipaldata.createdTime_at }}</span></div>
            </div>
        </div>

        <div class="col-start-4 section-card justify-items-center items-center flex">
            <div>Duración: <span class="font-bold text-primary-500">{{ etapaPrincipaldata.duracion }}</span></div>
        </div>

        <div class="col-start-5 section-card flex">
            <UButton
                @click="toggleActiveState"
                :color="etapaPrincipaldata.activo === 1 ? 'rose' : 'green'"
                variant="solid"
                block
                :disabled="etapaPrincipaldata.activo === 3"
            >
            {{ etapaPrincipaldata.activo === 1 ? 'Desactivar' : 'Activar' }}
            </UButton>
        </div>


    </div>

    <div class="grid grid-cols-5 grid-rows-1 gap-4">
        <div class="col-span-5 section-card">
            <!-- Barra de progreso -->
            <UProgress :value="progressValue" indicator  />
        </div>
    </div>

    <UTabs :items="tasbItems" class="section-card">
        <template #item="{ item }">
            <div v-if="item.key === 'equipo'" class="space-y-3">
                <tablaseccion-equipo :fkequipo="etapa.fkequipo" />
            </div>
            <div v-else-if="item.key === 'grafico'" class="space-y-3">
                                <div class="grid grid-cols-2 grid-rows-1 gap-4">
                                    <div ><circular :etapa="id" :fk="1" :name="'pH'"/></div>
                                    <div ><circular :etapa="id" :fk="8" :name="'Oxigeno Disuelto'"/></div>
                                </div>

                                <div class="grid grid-cols-2 grid-rows-1 gap-4">
                                    <div class="col-span-2">
                                        <view-area :etapa="id"  :name="'Oxiegeno disuelto'" :fk="1" :y="5.0" :y2="7.0" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 grid-rows-1 gap-4">
                                    <div class="col-span-2">
                                        <view-area :etapa="id"   :name="'pH'" :fk="13" :y="7.0" :y2="8.0" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 grid-rows-1 gap-4">
                                    <div class="col-span-2">
                                        <view-area :etapa="id"   :name="'Temperatura tanque'" :fk="9"  />
                                    </div>
                                </div>
            </div>
            <div v-else-if="item.key === 'lecturas'" class="space-y-3">
                <tabla-lectura :etapa="id"></tabla-lectura>
            </div>
        </template>
    </UTabs>
</template>
