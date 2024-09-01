<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {useseccionEquipo} from '~/composables/useseccionEquipo'
import Formequipo from "~/components/equipo/modalForm.vue";
import TablaseccionSensor from "~/components/equipo/tablaseccionSensor.vue";


const props= defineProps({
    fkequipo:{
        type:Number,
        required:true
    }
})

const {fetchseccionEquipo} = useseccionEquipo()


const seccionEquipo = ref([])


onMounted(async () => {
    try {
        const data = await fetchseccionEquipo(props.fkequipo)
        seccionEquipo.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
onBeforeMount(async () => {
    try {
        const data = await fetchseccionEquipo(props.fkequipo)
        seccionEquipo.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const page = ref(1)
const pageCount = 10

const rows = computed(() => {
    return seccionEquipo.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
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
        key: 'fkequipo_nombre',
        label: 'Equipo'
    },
    {
        key: 'actions'
    }]

const router = useRouter()


const q = ref('')

const filteredRows = computed(() => {
    if (!q.value) {
        return rows
    }

    return rows.value.filter((nombre) => {
        return Object.values(nombre).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})

</script>

<template>
    <div class="section-card">
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filtrar Equipo" />
        </div>
        <UTable
            :columns="columns"
            :rows="rows"
        >
            <template  #actions-data="{ row }">
                    <tablaseccion-sensor :fkseccion-equipo="row.id" :seccion="row.nombre"/>
            </template>

            <template #expand="{ row }">
                <div class="p-4">
                    <h2>Descripcion</h2>
                    <p>{{ row.descripcion }}</p>
                </div>
            </template>
        </UTable>
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="seccionEquipo.length"/>
        </div>
    </div>


</template>
