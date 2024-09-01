<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, ref} from 'vue'
import {useseccionSensor} from '~/composables/useseccionSensor'
import FormEquipo from "~/components/equipo/formEquipo.vue";


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
        label: 'Seccion Equipo'
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
    <div>
        <UButton label="Sensores" @click="isOpen = true" color="white" variant="solid" />

        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', base: 'h-full flex flex-col', }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Seccion {{ props.seccion }}
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
                    </div>
                </template>
                <UTable
                    :columns="columns"
                    :rows="rows"
                >
                </UTable>
                <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                    <UPagination v-model="page" :page-count="pageCount" :total="seccionEquipoSensor.length"/>
                </div>
            </UCard>
        </UModal>
    </div>
</template>

