<script setup lang="ts">
import {reactive, ref} from 'vue'
import RadiarChart from "~/components/charts/radiarChart.vue";



const state = reactive({
    nombre: undefined,
    descripcion: undefined,
    etapa: undefined,
    img:undefined
})


const toast = useToast()
const newLabel = ref('')
const stats = reactive([
    {label: 'ph', valueMax: 10,valueMin:5},
    {label: 'Temperatura', valueMax: 10,valueMin:5},
    {label: 'Oxgeno Disuelto', valueMax: 10,valueMin:5},

])


const labels = computed(() => stats.map(item => item.label));
const valueMaxs = computed(() => stats.map(item => item.valueMax));
const valueMins = computed(() => stats.map(item => item.valueMin));



function add(e) {
    e.preventDefault()
    if (!newLabel.value) return
    stats.push({
        label: newLabel.value,
        valueMax: 10,
        valueMin: 5
    })
    newLabel.value = ''
}

function remove(stat) {
    if (stats.length > 3) {
        stats.splice(stats.indexOf(stat), 1)
        toast.add({ title: 'Elemento eliminado' })
    } else {
        toast.add({ title: 'Esta elemento no se puede eliminar' })
    }
}

// Maneja el evento de cambio del input de archivo
function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        // Crear una URL de objeto para el archivo seleccionado
        state.img = URL.createObjectURL(target.files[0]);
    }
}
const links = [ {
    label: 'Productos',
    icon: 'i-heroicons-home',
    to: '/productos'

},
    {
        label: 'Crear productos',
        icon: 'i-heroicons-square-3-stack-3d',
        to: '/'
    }]
</script>

<template>
    <UBreadcrumb :links="links" class="section-card"/>
    <div class="w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 my-2 p-3 ">
        <UFormGroup>
            <!-- Componente de Avatar que mostrará la imagen -->
            <UAvatar
                size="3xl"
                :src="state.img"
            />

            <!-- Input para cargar la imagen -->
            <UInput
                type="file"
                size="sm"
                icon="i-heroicons-folder"
                @change="handleFileChange"
            />
        </UFormGroup>
    </div>

    <div class="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 my-2 p-3">
        <UFormGroup label="Nombre" name="nombre">
            <UInput v-model="state.nombre" />
        </UFormGroup>

        <UFormGroup label="Descripcion" name="descripcion">
            <UTextarea v-model="state.descripcion"  />
        </UFormGroup>

        <UFormGroup label="Etapa producto" name="etapa">
            <UInput v-model="state.etapa" />
        </UFormGroup>
    </div>
    <div class="grid grid-cols-3  gap-4">
        <div class="w-full">
            <div v-for="stat in stats" >
                <article
                    class="pointer-events-auto  w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 my-2">
                    <section class="p-2 ">
                        <section class="flex items-start">
                            <header class="ml-3 w-0 flex-1 pt-0.5">
                                <UFormGroup :label="stat.label" required>
                                    <UFormGroup help="Valor maximo">
                                        <URange v-model="stat.valueMax" max="100" min="0"/>
                                        <UInput v-model="stat.valueMax" type="number"/>
                                    </UFormGroup>
                                    <UFormGroup help="Valor Minnimo">
                                        <URange v-model="stat.valueMin" max="100" min="0"/>
                                        <UInput v-model="stat.valueMin" type="number"/>
                                    </UFormGroup>
                                </UFormGroup>
                            </header>
                            <aside class="ml-4 flex flex-shrink-0">
                                <button class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="button"
                                        @click="remove(stat)">
                                    <span class="sr-only">Close</span>
                                    <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                                    </svg>
                                </button>


                            </aside>
                        </section>
                    </section>
                </article>

            </div>

            <div id="add" class="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-3">
                <UFormGroup class="flex justify-center items-center">
                    <UInput class="inline-block mx-1  " v-model="newLabel" color="primary" name="newlabel" placeholder="Agregar..." variant="outline"/>
                    <UButton class="inline-block mx-1 " @click="add">Agregar</UButton>
                </UFormGroup>

            </div>
        </div>
        <div class="col-span-2 row-span-2">
            <radiar-chart :categoria="labels" :valor-max="valueMaxs" :valor-min="valueMins"/>
        </div>

    </div>


</template>

<style>


</style>