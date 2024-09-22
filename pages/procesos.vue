<script setup >
import {ref, computed, onMounted, onBeforeMount} from 'vue'
import {useProceso} from '~/composables/useProceso'
import ModalFormProceso from "~/components/proceso/modalFormProceso.vue";

const {fetchProceso} = useProceso()


const procesos = ref([])


onMounted(async () => {
    try {
        const data = await fetchProceso()
        procesos.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
onBeforeMount(async () => {
    try {
        const data = await fetchProceso()
        procesos.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const page = ref(1)
const pageCount = 30

const rows = computed(() => {
    return procesos.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})


definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});

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
        key: 'descripcion',
        label: 'Descripcion'
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

const links = [ {
    label: 'Proceso',
    icon: 'i-heroicons-square-3-stack-3d',

}]

async function recargardatos(){
    try {
        const data = await fetchProceso();  // No destructures 'data' unless it's part of the API response
        procesos.value = data.results;  // Asigna el array de resultados
    } catch (error) {
        console.error('Error al actualizar el estado:', error.message);
    }
}


</script>

<template>

    <UBreadcrumb :links="links" class="section-card"/>

    <div class="section-card">

        <modal-form-proceso @recargardatos="recargardatos"/>
        <UTable
            :rows="rows"
            :columns="columns"

        >
            <template #actions-data="{ row }">
                <NuxtLink :to="{name:'proceso-id',params:{id:row.id}}">
                    <UButton label="Entrar"/>
                </NuxtLink>
            </template>


            <section >
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <UButton label="Add people" />
                </div>
            </section>
        </UTable>
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="procesos.length" />
        </div>

    </div>


</template>
