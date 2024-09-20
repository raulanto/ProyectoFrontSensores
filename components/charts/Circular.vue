<template>
    <div>
        <!-- Loading State -->
        <template v-if="isLoading">
            <div class="text-center">
                <div role="status">
                    <svg aria-hidden="true"
                         class="inline w-8 h-8 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600"
                         fill="none" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </template>

        <!-- Display data or option to reload -->
        <template v-else-if="valoresArray.length > 0">
            <ClientOnly>
                <gauge :series="porcentaje" :labels="Datos"/>
            </ClientOnly>

            <UButton @click="recargarDatos">Recargar Datos</UButton>
        </template>

        <!-- Fallback if no data -->
        <template v-else>
            <button
                class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                @click="recargarDatos">Recargar datos
            </button>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {defineProps, onMounted,onBeforeUnmount, ref} from 'vue';
import {useLecturaEtapa} from '~/composables/useLecturaEtapa';
import Gauge from "~/components/charts/gauge.vue";
import {onBeforeMount} from "vue";
import { useNotificaciones } from "~/composables/useNotificaciones";
const { postNotificacion } = useNotificaciones();
import {useAuthStore} from "~/stores/auth";
const authStore = useAuthStore()
// Define the props
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    fk: {
        type: Number,
        required: true
    },
    etapa: {
        type: Number,
        required: true
    },
});

// Extract props values
const Datos = props.name;
const fkvalor = props.fk;
const etapa = props.etapa;

// State variables
const isLoading = ref<boolean>(false);
const valoresArray = ref<number[]>([]);
const valorFecha = ref<string[]>([]);
const porcentaje = ref<number | null>(null);

const { fetchLecturaEquipo } = useLecturaEtapa();
interface DatosLectura {
    id: number;
    valor: number;
    fkEtapa: number;
    fkESeccionEquipoSensor: number;
    created_at: string;
    createdTime_at: string;
}

const lectura = ref<DatosLectura[]>([]);

// Function to reload the data
async function recargarDatos() {
    isLoading.value = true;
    try {
        const resultados = await fetchLecturaEquipo(etapa, fkvalor);

        const data: DatosLectura[] = resultados.results.map((item: any) => ({
            id: item.id,
            valor: item.valor,
            fkEtapa: item.fkEtapa,
            created_at: item.created_at,
            createdTime_at: item.createdTime_at,
        }));

        valoresArray.value = data.map(item => Number(item.valor));
        valorFecha.value = data.map(item => item.created_at);

        calcularPorcentaje(); // Calculate percentage
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    } finally {
        isLoading.value = false;
    }
}
const iduser = authStore.user.id
// Calculate percentage
async function calcularPorcentaje() {
    try {
        const array = valoresArray.value;

        if (array.length === 0) {
            console.error('Array de valores está vacío');
            return;
        }

        const sumatoria = array.reduce((acc, valor) => acc + valor, 0);
        const promedio = sumatoria / array.length;
        const elementosCumplenCondicion = array.filter(valor => valor > promedio).length;

        porcentaje.value = ((elementosCumplenCondicion / array.length) * 100).toFixed(1);
        console.log(`Porcentaje de valores mayores que el promedio (${promedio.toFixed(2)}): ${porcentaje.value}%`);

    }catch (error) {
        console.error('Error:', error.message)
    }

}

// Set up auto-refresh every 30 seconds
onMounted(() => {
    recargarDatos(); // Initial data load
    const intervalId = setInterval(() => {
        recargarDatos();
    }, 30000); // Reload every 30 seconds (30000 milliseconds)

    // Clear interval when component is unmounted
    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
});
onBeforeMount(recargarDatos)
</script>
