<script setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from 'vue';
import {useProceso} from '~/composables/useProceso';
import {useEtapa} from '~/composables/useEtapa';
import TablaseccionEquipo from '~/components/equipo/tablaseccionEquipo.vue';
import TablaLectura from "~/components/etapa/tablaLectura.vue";

import TabSensores from "~/components/sensores/tabSensores.vue";

const route = useRoute();
const {fetchProceso} = useProceso();
const {fetchEtapaid, putEtapa} = useEtapa();

const id = ref(route.params.id);
const idproceso = ref(route.params.proceso)
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
    const {etapaPrincipal, fkProceso} = await fetchEtapaid(id.value);

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


// Definir metadatos de la página
definePageMeta({
  layout: 'dasboradlyt',
  middleware: ['auth'],
});

const links = [
  {label: 'Proceso', icon: 'i-heroicons-square-3-stack-3d', to: '/procesos'},
  {
    label: 'Panel del Proceso',
    icon: 'i-heroicons-square-3-stack-3d',
    to: {name: 'proceso-id', params: {id: idproceso.value}}
  },
  {label: 'Panel de la etapa', icon: 'i-heroicons-link'},
];

const tasbItems = [
  {key: 'equipo', label: 'Sondas', icon: 'i-heroicons-information-circle'},
  {key: 'grafico', label: 'Graficas'},
  {key: 'lecturas', label: 'Lecturas', icon: 'i-heroicons-eye-dropper'}
];


</script>
<template>
  <section class="section-card">
    <UBreadcrumb :links="links"/>
  </section>

  <UTabs :items="tasbItems" class="section-card">
    <template #item="{ item }">
      <div v-if="item.key === 'equipo'" class="space-y-3">
        <tablaseccion-equipo :fkequipo="10"/>
      </div>
      <div v-else-if="item.key === 'grafico'" class="space-y-3">

        <tab-sensores :fkseccionEquipo="1" :idetapa="17"/>
      </div>
      <div v-else-if="item.key === 'lecturas'" class="space-y-3">
        <tabla-lectura :etapa="id"></tabla-lectura>

      </div>
    </template>
  </UTabs>
</template>

