<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {useProductoStore} from '~/stores/producto'
import {useRouter} from "#imports";

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

const links = [ {
    label: 'Productos',
    icon: 'i-heroicons-square-3-stack-3d',

}]
const router = useRouter()

const { metaSymbol } = useShortcuts()


defineShortcuts({
    meta_o: {
        usingInput: true,
        handler: () => {
            router.push('/producto/crearProducto')
        }
    }
})
</script>

<template>
    <UBreadcrumb :links="links" class="section-card"/>

    <div class="section-card">
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">

            <NuxtLink to="/producto/crearProducto">
                <UTooltip text="Crear producto" :shortcuts="[metaSymbol, 'O']">

                <UButton>Crear un producto</UButton>
                </UTooltip>

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
