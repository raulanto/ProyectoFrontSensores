<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {useProductoStore} from '~/stores/producto'

const productoStore = useProductoStore()
const {productos, error, fetchProducto, loading} = productoStore

const page = ref(1)
const pageCount = 5

onMounted(async () => {
    await fetchProducto()
})
onBeforeMount(async () => {
    await fetchProducto()
})
const rows = computed(() => {
    return productos.slice((page.value - 1) * pageCount, page.value * pageCount)
})

const columns = [
    {key: 'id', label: 'ID'},
    {key: 'fotografia', label: 'Producto'},
    {key: 'nombre', label: 'Nombre'},
    {key: 'descripcion', label: 'Descripción'},
    {key: 'actions', label: 'Acciones'},
]

const items = (row: any) => [
    [{label: 'Mostrar', icon: 'i-heroicons-pencil-square-20-solid', click: () => console.log('Mostrar', row.id)}],
]

definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],
});
</script>

<template>
    <div class="section-card">
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">

            <NuxtLink to="/producto/crearProducto">
                <UButton>Crear un producto</UButton>
            </NuxtLink>
        </div>
        <div>
            <UTable :columns="columns" :rows="rows">
                <template #fotografia-data="{ row }">
                    <img :src="row.fotografia" alt="Producto" class="h-16 w-16 object-cover rounded-full"/>
                </template>

                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
                    </UDropdown>
                </template>
            </UTable>

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="productos.length"/>
            </div>
        </div>
    </div>
</template>
