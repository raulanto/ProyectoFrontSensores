<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, ref,watch} from 'vue'
import {useseccionSensor} from '~/composables/useseccionSensor'
import FormEquipo from "~/components/equipo/form/formEquipo.vue";


const props= defineProps({
    fkseccionEquipo:{
        type:Number,
        required:true
    },
    seccion:String
})

const {fetchseccionSensor} = useseccionSensor()


const seccionEquipoSensor = ref([])


onMounted(async () => {
    try {
        const data = await fetchseccionSensor(props.fkseccionEquipo)
        seccionEquipoSensor.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
onBeforeMount(async () => {
    try {
        const data = await fetchseccionSensor(props.fkseccionEquipo)
        seccionEquipoSensor.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return seccionEquipoSensor.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
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
        key: 'fkseccionEquipo_nombre',
        label: 'Equipo multiparametrico'
    },
    {
        key: 'fksensor_nombre',
        label: 'Sensor'
    },

    {
        key: 'actions'
    }]

const router = useRouter()

const isOpen = ref(false)
</script>
<template>

    <UTable
        :columns="columns"
        :rows="rows"
    >
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="seccionEquipoSensor.length"/>
    </div>


</template>

