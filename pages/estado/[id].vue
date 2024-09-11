<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted,onBeforeMount, ref } from 'vue';
import { useProceso } from '~/composables/useProceso';
import { useEtapa } from '~/composables/useEtapa';
import TablaseccionEquipo from '~/components/equipo/tablaseccionEquipo.vue';

const route = useRoute();
const { fetchProceso } = useProceso();
const { fetchEtapaid } = useEtapa();
const id = ref(route.params.id);
const proceso = ref([]);
const etapa = ref([]);
const fkequipo = ref()
onMounted(async () => {
    try {
        const data = await fetchProceso();
        const da = await fetchEtapaid(id.value);
        etapa.value = da.results;
        proceso.value = data.results;
        // Accede al primer elemento de etapa y obtiene fkequiposs

        fkequipo.value = etapa[0].fkProceso.fkequipo;
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});

onBeforeMount(async () => {
    try {
        const data = await fetchProceso();
        const da = await fetchEtapaid(id.value);
        etapa.value = da.results;
        proceso.value = data.results;
        // Accede al primer elemento de etapa y obtiene fkequiposs

        fkequipo.value = etapa.value;

    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});

console.log(fkequipo)



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
        to: '/procesos'
    },
    {
        label: 'Panel del Proceso',
        icon: 'i-heroicons-square-3-stack-3d',
        to: { name: 'proceso-id', params: { id: id.value } }
    },
    {
        label: 'Panel de la etapa',
        icon: 'i-heroicons-link'
    }
];
</script>

<template>
    <section class="section-card">
        <UBreadcrumb :links="links" />
    </section>

    <div class="grid grid-cols-5 grid-rows-1 gap-4">
        <div class="col-span-4 section-card">
            {{etapa}}
        </div>
        <div class="col-start-5 section-card">2</div>
    </div>

    <tablaseccion-equipo :fkequipo="fkequipo" />
</template>
