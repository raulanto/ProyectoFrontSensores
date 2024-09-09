<script setup >
import {useRoute} from 'vue-router';
import {ref, computed, onMounted, onBeforeMount} from 'vue'
import {useProceso} from '~/composables/useProceso'
import ModalformEtapa from "~/components/etapa/modalformEtapa.vue";
import TableEtapa from "~/components/etapa/tableEtapa.vue";


const {fetchProceso} = useProceso()

const proceso = ref([])


onMounted(async () => {
    try {
        const data = await fetchProceso()
        proceso.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
onBeforeMount(async () => {
    try {
        const data = await fetchProceso()
        proceso.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const route = useRoute();

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return proceso.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const id = ref(route.params.id);

console.log('ID:', id);


definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});


const links = [ {
    label: 'Proceso',
    icon: 'i-heroicons-square-3-stack-3d',
    to:'/procesos'
}, {
    label: 'Panel del Proceso',
    icon: 'i-heroicons-link'
}]
</script>

<template>


    <section class="section-card">
    <UBreadcrumb :links="links" />

        <ul>
            <li v-for="item in rows" :key="item.id">
                <h1 class="text-xl font-bold">Procesos: {{ item.nombre }}</h1>
            </li>
        </ul>
    </section>



    <div class="grid grid-cols-5 grid-rows-1 gap-4">
        <div class="col-span-4 section-card">Etapas del proceso</div>
        <div class="col-start-5 section-card">            <modalform-etapa/></div>
    </div>

    <div class="grid grid-cols-5 grid-rows-2 gap-4">
        <div class="col-span-5 row-span-2 section-card"> <table-etapa :id="id"/></div>
    </div>

</template>

<style scoped>

</style>