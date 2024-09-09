<script setup>
import {useRoute} from 'vue-router';
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {useProceso} from '~/composables/useProceso'


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


const links = [{
    label: 'Proceso',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/procesos'
},
    {
        label: 'Proceso',
        icon: 'i-heroicons-square-3-stack-3d',
        to: '/procesos'
    }, {
        label: 'Panel del Proceso',
        icon: 'i-heroicons-link'
    }]
</script>

<template>


    <section class="section-card">
        <UBreadcrumb :links="links"/>
    </section>


</template>

<style scoped>

</style>