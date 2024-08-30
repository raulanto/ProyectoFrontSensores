<script setup lang="ts">
import {ref, computed, onMounted, onBeforeMount} from 'vue'
import {useEquipo} from '~/composables/useEquipo'

const {fetchEquipos} = useEquipo()


const equipos = ref([])


onMounted(async () => {
    try {
        const data = await fetchEquipos()
        equipos.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
onBeforeMount(async () => {
    try {
        const data = await fetchEquipos()
        equipos.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return equipos.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
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
    key: 'fkplanta_nombre',
    label: 'Planta'
    },
    {
        key: 'fkproducto_nombre',
        label: 'Producto'
    },
    {
        key: 'actions'
    }]
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
console.log(equipos.value.length)
</script>

<template>
    <div class="section-card">
        <UTable
            :rows="rows"
            :columns="columns"
        >
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>

        </UTable>
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="equipos.length" />
        </div>

    </div>


</template>
