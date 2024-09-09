<script setup lang="ts">

import {ref, computed, onMounted, onBeforeMount} from 'vue'
import {useEtapa} from '~/composables/useEtapa'


const props=defineProps({
    id:Number
})

const {fetchEtapa} = useEtapa()


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
const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }, {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid'
    }], [{
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid'
    }, {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid'
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid'
    }]
]
</script>

<template>
    <UTable
        :rows="rows"
        :columns="columns"
    >
        <template #actions-data="{ row }">
            <NuxtLink :to="{name:'estado-id',params:{id:row.id}}">
                <UButton label="Entrar"/>
            </NuxtLink>
        </template>

    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="etapa.length" />
    </div>

</template>

<style scoped>

</style>