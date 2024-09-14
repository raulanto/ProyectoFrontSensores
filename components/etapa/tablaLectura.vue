<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, ref,watch} from 'vue'
import {useLecturaEtapa} from '~/composables/useLecturaEtapa'



const props= defineProps({
    etapa:{
        type:Number,
        required:true
    }
})

const {fetchLectura} = useLecturaEtapa()


const lectura = ref([])


onMounted(async () => {
    try {
        const data = await fetchLectura(props.etapa)
        lectura.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
onBeforeMount(async () => {
    try {
        const data = await fetchLectura(props.etapa)
        lectura.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    return lectura.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
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
        key: 'valor',
        label: 'Valor'
    },
    {
        key: 'Sensor',
        label: 'Sensor'
    }
    ]

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
                    <UPagination v-model="page" :page-count="pageCount" :total="lectura.length"/>
                </div>

</template>

