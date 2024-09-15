<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref, computed, watch } from 'vue';
import { useProceso } from '~/composables/useProceso';
import { useEtapa } from '~/composables/useEtapa';
import TablaseccionEquipo from '~/components/equipo/tablaseccionEquipo.vue';
import TablaLectura from "~/components/etapa/tablaLectura.vue";
import Circular from "~/components/charts/Circular.vue";
import ViewArea from "~/components/charts/viewArea.vue";


const route = useRoute();
const { fetchProceso } = useProceso();
const { fetchEtapaid } = useEtapa();
// id de etapa
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
        const etapaId = id;  // ID de ejemplo
        const procesoData = await fetchProceso();
        const { etapaPrincipal, fkProceso } = await fetchEtapaid(id.value);

        etapa.value = fkProceso;
        proceso.value = procesoData.results;
        etapaPrincipaldata.value = etapaPrincipal;
        fkequipo.value = etapa.value.fkequipo;

        // Calcular el tiempo restante cuando la etapa esté activa
        if (etapaPrincipal.activo) {
            startProgress(etapaPrincipal);
        }
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});

// Función para calcular el progreso
const startProgress = ({ created_at, createdTime_at, duracion, updated_at }) => {
    const totalDurationMs = convertDurationToMs(duracion);
    const createdDateTime = new Date(`${created_at}T${createdTime_at}`);
    const updatedDateTime = new Date(updated_at);

    // Si hay un tiempo restante, úsalo
    const elapsedTime = updated_at ? (updatedDateTime - createdDateTime) : 0;
    remainingTime.value = totalDurationMs - elapsedTime;

    if (remainingTime.value > 0) {
        intervalId.value = setInterval(() => {
            remainingTime.value -= 1000;
            progressValue.value = Math.min(((totalDurationMs - remainingTime.value) / totalDurationMs) * 100, 100);

            if (remainingTime.value <= 0) {
                clearInterval(intervalId.value);
            }
        }, 1000);
    }
};

// Función para convertir la duración "HH:MM:SS" a milisegundos
const convertDurationToMs = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

// Observa el cambio en "activo" para pausar o reanudar el progreso
watch(() => etapaPrincipaldata.value.activo, (newValue) => {
    if (newValue) {
        // Si vuelve a estar activo, retoma el progreso
        startProgress(etapaPrincipaldata.value);
    } else {
        // Pausar el progreso
        clearInterval(intervalId.value);
    }
});

definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});

const links = [
    {
        label: 'Proceso',
        icon: 'i-heroicons-square-3-stack-3d',
        to: '/procesos',
    },
    {
        label: 'Panel del Proceso',
        icon: 'i-heroicons-square-3-stack-3d',
        to: { name: 'proceso-id', params: { id: id.value } },
    },
    {
        label: 'Panel de la etapa',
        icon: 'i-heroicons-link',
    },
];

onBeforeMount(async () => {
    try {
        const etapaId = 4;  // ID de ejemplo
        const procesoData = await fetchProceso();
        const { etapaPrincipal, fkProceso } = await fetchEtapaid(etapaId);

        etapa.value = fkProceso;
        proceso.value = procesoData.results;
        etapaPrincipaldata.value = etapaPrincipal;
        fkequipo.value = etapa.value.fkequipo;

        // Iniciar el cálculo de progreso si la etapa está activa
        if (etapaPrincipal.activo) {
            startProgress(etapaPrincipal.created_at, etapaPrincipal.createdTime_at, etapaPrincipal.duracion);
        }
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});
const tasbItems = [{
    key: 'equipo',
    label: 'Seccion Equipo',
    icon: 'i-heroicons-information-circle',
}, {
    key: 'grafico',
    label: 'Graficas',
}, {
    key: 'lecturas',
    label: 'Lecturas',
    icon: 'i-heroicons-eye-dropper',
}]
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
                    <div v-if="etapaPrincipaldata.activo">
                        Estado: <UBadge color="green" variant="solid">Activo</UBadge>
                    </div>
                    <div v-else>
                        Estado: <UBadge color="rose" variant="solid">Desactivado</UBadge>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-start-3 section-card">
            <div class="flex flex-col">
                <div>Fecha: <span class="font-bold text-primary-500">{{ etapaPrincipaldata.created_at }}</span></div>
                <div>Hora: <span class="font-bold text-primary-500">{{ etapaPrincipaldata.createdTime_at }}</span></div>
            </div>
        </div>

        <div class="col-start-4 section-card justify-items-center items-center">
            <div>Duración: <span class="font-bold text-primary-500">{{ etapaPrincipaldata.duracion }}</span></div>
        </div>

        <div class="col-start-5 section-card">
            <UButton>Desactivar</UButton>
        </div>
    </div>

    <div class="grid grid-cols-5 grid-rows-1 gap-4">
        <div class="col-span-5 section-card">
            <!-- Barra de progreso -->
            <UProgress :value="progressValue" indicator />
        </div>
    </div>
    <UTabs :items="tasbItems" class="section-card">
        <template #item="{ item }">
            <div v-if="item.key === 'equipo'" class="space-y-3">
                <tablaseccion-equipo :fkequipo="etapa.fkequipo" />
            </div>
            <div v-else-if="item.key === 'grafico'" class="space-y-3">
                <div class="grid grid-cols-2 grid-rows-1 gap-4">
                    <div ><circular :etapa="id" :fk="13" :name="'pH'"/></div>
                    <div ><circular :etapa="id" :fk="8" :name="'Oxigeno Disuelto'"/></div>
                </div>

                <div class="grid grid-cols-2 grid-rows-1 gap-4">
                    <div class="col-span-2">
                        <view-area :etapa="id"  :name="'Oxiegeno disuelto'" :fk="8" :y="5.0" :y2="7.0" />
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