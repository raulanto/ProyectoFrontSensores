<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import RadiarChart from "~/components/charts/radiarChart.vue";
import type { FormSubmitEvent } from '#ui/types'
import {useProducto} from "~/composables/useProducto";
import {object, string} from "yup";
import {useAuthStore} from "~/stores/auth";
import { useNotificaciones } from "~/composables/useNotificaciones";
const authStore = useAuthStore()
// @ts-ignore
const iduser = authStore.user.id
const schema = object({
    nombre: string().required('Requerido'),
    descripcion: string().required('Requerido'),
    etapa: string().required('Requerido'),

});
const {postProducto}=useProducto()
const state = reactive({
    nombre: undefined,
    descripcion: undefined,
    etapa: undefined,

})
const { postNotificacion } = useNotificaciones();
const toast = useToast()
const newLabel = ref('')
const stats = reactive([
    { label: 'ph', valueMax: 10, valueMin: 5 },
    { label: 'Temperatura', valueMax: 10, valueMin: 5 },
    { label: 'Oxígeno Disuelto', valueMax: 10, valueMin: 5 },
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
        toast.add({ title: 'Este elemento no se puede eliminar' })
    }
}

// Maneja el evento de cambio del input de archivo


const links = [{
    label: 'Productos',
    icon: 'i-heroicons-home',
    to: '/productos'
},
    {
        label: 'Crear productos',
        icon: 'i-heroicons-square-3-stack-3d',
        to: '/'
    }]

async function onSubmit(event: FormSubmitEvent) {
    event.preventDefault();

    // Prepare product data
    const producto = {
        nombre: state.nombre,
        descripcion: state.descripcion,
        etapa: state.etapa,

        usuario:iduser,
        valores: stats.map(stat => ({
            nombre: stat.label,
            valorMaximo: stat.valueMax,
            valorMinimo: stat.valueMin
        }))
    };
    console.log(producto)
    try {
        await postProducto(producto);
        // Optionally, reset the form state here
        Object.assign(state, { nombre: undefined, descripcion: undefined, etapa: undefined, fotografia: undefined });
        stats.splice(0, stats.length, // Reset stats to initial state
            { label: 'ph', valueMax: 10, valueMin: 5 },
            { label: 'Temperatura', valueMax: 10, valueMin: 5 },
            { label: 'Oxígeno Disuelto', valueMax: 10, valueMin: 5 }
        );
        toast.add({
            id: 'update_downloaded',
            title: 'Se agrego producto',
            icon: 'i-octicon-desktop-download-24',
            timeout: 6000,
        });
        await postNotificacion({
            user: iduser,
            message: "Creado proceso",
            tittle: "Se agrego producto",
            notification_type: "success"
        });
    } catch (error) {
        console.log("error al guardar prod",error.message)
    }
}
</script>


<template>
    <UBreadcrumb :links="links" class="section-card"/>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">


        <div class="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 my-2 p-3">
            <UFormGroup label="Nombre" name="nombre">
                <UInput v-model="state.nombre" />
            </UFormGroup>

            <UFormGroup label="Descripción" name="descripcion">
                <UTextarea v-model="state.descripcion" />
            </UFormGroup>

            <UFormGroup label="Etapa producto" name="etapa">
                <UInput v-model="state.etapa" />
            </UFormGroup>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <div class="w-full">
                <div v-for="stat in stats" :key="stat.label">
                    <article class="pointer-events-auto w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 my-2">
                        <section class="p-2">
                            <section class="flex items-start">
                                <header class="ml-3 w-0 flex-1 pt-0.5">
                                    <UFormGroup :label="stat.label" required>
                                        <UFormGroup help="Valor máximo">
                                            <URange v-model="stat.valueMax" max="100" min="0"/>
                                            <UInput v-model="stat.valueMax" type="number"/>
                                        </UFormGroup>
                                        <UFormGroup help="Valor mínimo">
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
                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                                        </svg>
                                    </button>
                                </aside>
                            </section>
                        </section>
                    </article>
                </div>

                <div id="add" class="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-3">
                    <UFormGroup class="flex justify-center items-center">
                        <UInput class="inline-block mx-1" v-model="newLabel" color="primary" name="newlabel" placeholder="Agregar..." variant="outline"/>
                        <UButton class="inline-block mx-1" @click="add">Agregar</UButton>
                    </UFormGroup>
                </div>
            </div>

            <div class="col-span-2 row-span-2">
                <RadiarChart :categoria="labels" :valor-max="valueMaxs" :valor-min="valueMins"/>
            </div>
        </div>

        <UButton type="submit" color="primary">Crear Producto</UButton>
    </UForm>
</template>

<style>


</style>