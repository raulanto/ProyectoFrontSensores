<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import {usePlanta} from "~/composables/usePlanta";
import {useProducto} from "~/composables/useProducto";
import {useAuthStore} from "~/stores/auth";
import {useEquipo} from "~/composables/useEquipo";
import { useNotificaciones } from "~/composables/useNotificaciones";
import {onMounted, ref, reactive,defineProps, onBeforeMount} from "vue";

const props = defineProps({
    isOpen: {
        required: true,
        type: Boolean
    }
})

const emit = defineEmits(['form-success', 'recargardatos']);
const { postNotificacion } = useNotificaciones();
const { postEquipos } = useEquipo();
const { fetchPlantas } = usePlanta();
const { fetchProducto } = useProducto();

const plantas = ref([]);
const producto = ref([]);
const toast = useToast();
const authStore = useAuthStore();
const iduser = authStore.user.id;

onMounted(async () => {
    try {
        const data = await fetchPlantas();
        const datae = await fetchProducto();
        plantas.value = data.results.map((item: any) => ({
            id: item.id,
            name: item.nombre,
        }));
        producto.value = datae.results.map((item: any) => ({
            id: item.id,
            name: item.nombre,
        }));
    } catch (e) {
        console.error('Error al obtener los datos:', e.message);
    }
});
onBeforeMount(async () => {
    try {
        const data = await fetchPlantas();
        const datae = await fetchProducto();
        plantas.value = data.results.map((item: any) => ({
            id: item.id,
            name: item.nombre,
        }));
        producto.value = datae.results.map((item: any) => ({
            id: item.id,
            name: item.nombre,
        }));
    } catch (e) {
        console.error('Error al obtener los datos:', e.message );
    }
});


const schema = object({
    nombre: string().required('Requerido'),
    descripcion: string().required('Requerido'),

});

type Schema = InferType<typeof schema>;

const state = reactive({
    nombre: '',
    descripcion: '',
    fkplanta_nombre: undefined,
    fkproducto_nombre: undefined,
    usuario: iduser,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await postEquipos({
            nombre: state.nombre,
            descripcion: state.descripcion,
            fkplanta: Number(state.fkplanta_nombre),
            fkproducto: Number(state.fkproducto_nombre),
            usuario: state.usuario,
        });
        emit('form-success');
        emit('recargardatos');
        toast.add({
            id: 'update_downloaded',
            title: 'Equipo Creado',
            icon: 'i-octicon-desktop-download-24',
            timeout: 6000,
        });
        await postNotificacion({
            user: iduser,
            message: "Creado proceso",
            tittle: "Proceso Creado exitosamente",
            notification_type: "success"
        });
    } catch (error) {
        console.error('Error al crear el proceso:', error.message );
        toast.add({
            id: 'update_downloaded',
            title: 'Equipo no Creado',
            icon: 'i-octicon-desktop-download-24',
            timeout: 6000, // Adjusted timeout
        });
    }
}

watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
        // Opcional: Lógica si el modal se cierra
    }
});
</script>


<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nombre" name="nombre" >
            <UInput v-model="state.nombre" required/>
        </UFormGroup>

        <UFormGroup label="Descripcion" name="descripcion">
            <UTextarea v-model="state.descripcion" required />
        </UFormGroup>

        <UFormGroup label="Planta" name="planta">
            <USelectMenu v-model="state.fkplanta_nombre"
                         :options="plantas"
                         required
                         placeholder="Planta"
                         value-attribute="id"
                         option-attribute="name"/>
        </UFormGroup>

        <UFormGroup label="Producto" name="producto">
            <USelectMenu v-model="state.fkproducto_nombre"
                         :options="producto"
                         required
                         placeholder="Producto"
                         value-attribute="id"
                         option-attribute="name" />
        </UFormGroup>

        <UButton type="submit">
            Agregar Equipo
        </UButton>
    </UForm>
</template>

