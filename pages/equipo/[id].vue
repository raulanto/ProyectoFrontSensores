<!-- pages/panel/equipo/[id].vue -->
<script lang="ts" setup>

import {useRoute} from 'vue-router';
import TablaseccionEquipo from "~/components/equipo/tablaseccionEquipo.vue";


const route = useRoute();


const id = ref(route.params.id);

console.log('ID:', id);


definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});
const links = [ {
    label: 'Equipo',
    icon: 'i-heroicons-square-3-stack-3d',
    to:'/equipos'
}, {
    label: 'Panel del Equipo',
    icon: 'i-heroicons-link'
}]
</script>

<template>
    <div>
        <UBreadcrumb :links="links" class="section-card"/>

        <tablaseccion-equipo :fkequipo="id"/>
    </div>
</template>

