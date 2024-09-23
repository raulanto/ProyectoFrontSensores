<script setup lang="ts">
import {useProceso} from '~/composables/useProceso'
import {useEtapa} from "~/composables/useEtapa";
import {onMounted, ref, watch} from "vue";

const {fetchProceso} = useProceso()
const {fetchEtapa} = useEtapa()

const ultimoProceso = ref(null) // Ref para el último proceso, inicializado en null
const nombre = ref('')
const des = ref('')
const fketapa = ref(null) // Inicializado en null
const etapa = ref([]) // Para almacenar la información de la etapa

// Función para cargar el último proceso
async function loadProceso() {
    try {
        const data = await fetchProceso()
        if (data.results.length > 0) {
            ultimoProceso.value = data.results[data.results.length - 1] // Obtener el último proceso
            nombre.value = ultimoProceso.value.nombre // Asignar valores al ref de nombre
            des.value = ultimoProceso.value.descripcion // Asignar valores al ref de descripcion
            fketapa.value = ultimoProceso.value.id // Asignar el id de la etapa
        }
    } catch (e) {
        console.error('Error al obtener los datos del proceso:', e.message)
    }
}

// Función para cargar las etapas basadas en `fketapa`
async function loadEtapa(idEtapa) {
    try {
        const etapadata = await fetchEtapa(idEtapa)
        etapa.value = etapadata.results // Asignar las etapas obtenidas
    } catch (e) {
        console.error('Error al obtener los datos de la etapa:', e.message)
    }
}

// Cargar el proceso en el mounted hook
onMounted(async () => {
    await loadProceso() // Cargar el proceso
})
// Cargar el proceso en el mounted hook
onBeforeMount(async () => {
    await loadProceso() // Cargar el proceso
})
// Escuchar cambios en fketapa para cargar la etapa correspondiente
watch(fketapa, async (newVal) => {
    if (newVal) {
        await loadEtapa(newVal) // Cargar las etapas cuando fketapa esté disponible
    }
})

definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],
});
function getColor(value) {
    const colors = { 1: 'emerald', 2: 'orange', 3: 'red', 4: 'gray' };
    return colors[value] || 'gray';
}

function getLabel(value) {
    const labels = { 1: 'Activo', 2: 'Desactivado', 3: 'Terminado', 4: 'Error' };
    return labels[value] || 'Desconocido';
}
</script>



<template>
    <div class=" px-6 md:px-60">
        <div class="grid grid-cols-5 gap-4">
            <div class="col-span-5  ">
                <div class="mt-8  ">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {{ nombre }}
                    </h2>
                    <p class="text-gray-500 sm:text-xl dark:text-gray-400">
                        {{ des }}
                    </p>
                </div>
            </div>

            <div class="col-span-5 row-span-4 row-start-2">
                <div class="space-y-6 border-l-2 border-dashed" v-for="item in etapa.slice().reverse()" :key="item.id">
                    <nuxt-link :to="{name:'estado-id',params:{id:item.id,proceso:fketapa}}">
                        <div
                            class="relative w-full hover:bg-gray-100 my-2"
                            :class="`hover:bg-${getColor(item.activo)}-100`"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full"
                                :class="`text-${getColor(item.activo)}-500`"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <div class="ml-6">
                                <h4 :class="`text-${getColor(item.activo)}-500`" class="font-bold text-xl mb-2">
                                    {{ item.nombre }}
                                </h4>
                                <UBadge
                                    class="px-2"
                                    size="xl"
                                    :label="getLabel(item.activo)"
                                    :color="getColor(item.activo)"
                                    variant="subtle"
                                />
                                <span
                                    class="mt-1 block text-sm font-semibold"
                                    :class="`text-${getColor(item.activo)}-500`"
                                >
                                {{ item.created_at }}
                                </span>
                            </div>
                        </div>
                    </nuxt-link>

                </div>
            </div>
        </div>
    </div>
</template>
