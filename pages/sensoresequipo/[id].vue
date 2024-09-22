<script setup lang="ts">
import {useRoute} from 'vue-router';
import TablaseccionSensor from "~/components/equipo/tablaseccionSensor.vue";
const route = useRoute();
const id = ref(route.params.id);
const equipo = ref(route.params.equipo);
definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});


const links = [ {
    label: 'Equipo',
    icon: 'i-heroicons-square-3-stack-3d',
    to:"/equipos"

}, {
    label: 'Panel del Equipo',
    icon: 'i-heroicons-link',
    to:{name:'equipo-id',params:{id:equipo.value}}
},{
    label: 'Sondas',
    icon: 'i-heroicons-square-3-stack-3d',

}]


</script>

<template>
    <UBreadcrumb :links="links" class="section-card"/>
    <div class="section-card">
        <tablaseccion-sensor :fkseccion-equipo="id"/>
    </div>
</template>

<style scoped>

</style>