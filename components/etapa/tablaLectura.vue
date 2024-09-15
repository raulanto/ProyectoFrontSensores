<script lang="ts" setup>
import { computed, onMounted,onBeforeMount, ref } from 'vue'
import { useLecturaEtapa } from '~/composables/useLecturaEtapa'
import { useRouter } from 'vue-router'

const props = defineProps({
    etapa: {
        type: Number,
        required: true
    }
})

const { fetchLectura } = useLecturaEtapa()

const lectura = ref([])

onMounted(async () => {
    try {
        const data = await fetchLectura(props.etapa)
        // Map the data to extract 'fksensor_nombre' from 'fkESeccionEquipoSensor'
        lectura.value = data.results.map((item: any) => ({
            id: item.id,
            valor: item.valor,
            fksensor_nombre: item.fkESeccionEquipoSensor.fksensor_nombre
        }))
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

onBeforeMount(async () => {
    try {
        const data = await fetchLectura(props.etapa)
        // Map the data to extract 'fksensor_nombre' from 'fkESeccionEquipoSensor'
        lectura.value = data.results.map((item: any) => ({
            id: item.id,
            valor: item.valor,
            fksensor_nombre: item.fkESeccionEquipoSensor.fksensor_nombre
        }))
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})


const page = ref(1)
const pageCount = 50

const rows = computed(() => {
    return lectura.value.slice((page.value - 1) * pageCount, page.value * pageCount)
})

definePageMeta({
    layout: 'dasboradlyt',
    middleware: ['auth']
})

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'valor', label: 'Valor' },
    { key: 'fksensor_nombre', label: 'Sensor' }
]



const router = useRouter()

// Filters
const todoStatus = [{
    key: 'uncompleted',
    label: 'In Progress',
    value: false
}, {
    key: 'completed',
    label: 'Completed',
    value: true
}]

const selectedStatus = ref([])
const searchStatus = computed(() => {
    if (selectedStatus.value?.length === 0) {
        return ''
    }

    if (selectedStatus?.value?.length > 1) {
        return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
    }

    return `?completed=${selectedStatus.value[0].value}`
})
</script>

<template>

    <UTable :columns="columns" :rows="rows">


    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="lectura.length" />
    </div>
</template>
