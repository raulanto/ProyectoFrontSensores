<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductoStore } from '~/stores/producto'
import {onBeforeMount} from "vue";

const productoStore = useProductoStore()
const { productos, error, fetchProducto,loading } = productoStore

const page = ref(1)
const pageCount = 5

onMounted(async () => {
    await fetchProducto()
})

const rows = computed(() => {
    return productos.slice((page.value - 1) * pageCount, page.value * pageCount)
})

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fotografia', label: 'Producto' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'actions', label: 'Acciones' },
]

const items = (row: any) => [
    [{ label: 'Mostrar', icon: 'i-heroicons-pencil-square-20-solid', click: () => console.log('Mostrar', row.id) }],
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
        <div v-if="loading">Cargando productos...</div>
        <div v-else>
            <UTable :rows="rows" :columns="columns">
                <template #fotografia-data="{ row }">
                    <img :src="row.fotografia" alt="Producto" class="h-16 w-16 object-cover rounded-full" />
                </template>

                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
            </UTable>

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="productos.length" />
            </div>
        </div>
    </div>
</template>
