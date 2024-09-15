<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useseccionEquipo } from '~/composables/useseccionEquipo'
import TablaseccionSensor from "~/components/equipo/tablaseccionSensor.vue";

const props = defineProps({
    fkequipo: {
        type: Number,
        required: true
    }
})

const { fetchseccionEquipo } = useseccionEquipo()
const seccionEquipo = ref([])
const page = ref(1)
const pageCount = 10
const q = ref('')

const fetchData = async () => {
    try {
        const data = await fetchseccionEquipo(props.fkequipo)
        seccionEquipo.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
}

// Fetch data when component is mounted
onMounted(fetchData)

// Watch for changes in fkequipo prop and refetch data
watch(() => props.fkequipo, () => {
    fetchData()
})

const rows = computed(() => {
    return seccionEquipo.value.slice((page.value - 1) * pageCount, page.value * pageCount)
})

const filteredRows = computed(() => {
    if (!q.value) {
        return rows.value
    }
    return rows.value.filter((row) => {
        return Object.values(row).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})

definePageMeta({
    layout: 'dasboradlyt',
    middleware: ['auth']
})

const columns = [
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: 'nombre',
        label: 'Nombre'
    },
    {
        key: 'fkequipo_nombre',
        label: 'Equipo'
    },
    {
        key: 'actions'
    }
]

const router = useRouter()


const todoStatus = [{
    key: 'uncompleted',
    label: 'In Progress',
    value: false
}, {
    key: 'completed',
    label: 'Completed',
    value: true
}]


</script>

<template>
    <div class="">
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filtrar Equipo" />


        </div>


        <UTable :columns="columns" :rows="filteredRows">
            <template #caption>
                <caption>Seccion Equipo</caption>
            </template>

            <template #actions-data="{ row }">
                <tablaseccion-sensor :fkseccion-equipo="row.id" :seccion="row.nombre" />
            </template>

            <template #expand="{ row }">
                <div class="p-4">
                    <h2>Descripción</h2>
                    <p>{{ row.descripcion }}</p>
                </div>
            </template>
        </UTable>

        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="seccionEquipo.length" />
        </div>
    </div>
</template>
