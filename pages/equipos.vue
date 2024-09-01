<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {useEquipo} from '~/composables/useEquipo'
import Formequipo from "~/components/equipo/modalForm.vue";


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

const router = useRouter()


</script>

<template>
    <div class="section-card">
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <formequipo/>
        </div>
        <UTable
            :columns="columns"
            :rows="rows"
        >
            <template #actions-data="{ row }">
                <NuxtLink :to="{name:'equipo-id',params:{id:row.id}}">
                    <UButton label="Entrar"/>
                </NuxtLink>
            </template>

            <section>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <UButton label="Agrear Equipo"/>
                </div>
            </section>
        </UTable>
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="equipos.length"/>
        </div>

    </div>


</template>
