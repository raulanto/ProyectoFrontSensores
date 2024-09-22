<script setup lang="ts">

import {ref, computed, onMounted, onBeforeMount} from 'vue'
import {useEtapa} from '~/composables/useEtapa'
import ModalformEtapa from "~/components/etapa/modalformEtapa.vue";


const props=defineProps({
    id:Number
})

const {fetchEtapa} = useEtapa()


function getLabel(value) {
    const labels = {
        1: 'Activo',
        2: 'Desactivado',
        3: 'Terminado',
        4: 'Error'
    };
    return labels[value] || 'Desconocido';
}
function getColor(value) {
    const colors = {
        1: 'emerald',
        2: 'orange',
        3: 'red',
        4: 'gray'
    };
    return colors[value] || 'gray';
}


const etapa = ref([])


onMounted(async () => {
    try {
        const data = await fetchEtapa(props.id)
        etapa.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
onBeforeMount(async () => {
    try {
        const data = await fetchEtapa(props.id)
        etapa.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return etapa.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

const columns = [
    {
        key: 'id',
        label: 'id'
    },
    {
        key: 'nombre',
        label: 'Nombre'
    },
    {
        key: 'activo',
        label: 'Estado'
    },
    {
        key: 'duracion',
        label: 'Duracion'
    },
    {
        key: 'actions'
    }

];

async function recargardatos(){
    try {
        const data = await fetchEtapa(props.id)
        etapa.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
}


</script>

<template>
    <div class="grid grid-cols-5 grid-rows-1 gap-4">
        <div class="col-span-4 section-card">Etapas del proceso</div>
        <div class="col-start-5 section-card">
            <modalform-etapa :prceso-id="props.id" @recargardatos="recargardatos"/>
        </div>
    </div>

    <div class="section-card">
        <UTable
            :rows="rows"
            :columns="columns"

        >

            <template  #activo-data="{ row }">
                <UBadge
                    size="xs"
                    :label="getLabel(row.activo)"
                    :color="getColor(row.activo)"
                    variant="subtle"
                />
            </template>

            <template #actions-data="{ row }">
                <NuxtLink :to="{name:'estado-id',params:{id:row.id,proceso:props.id}}">
                    <UButton label="Entrar"/>
                </NuxtLink>
            </template>


        </UTable>
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="etapa.length" />
        </div>

    </div>
</template>

<style scoped>

</style>