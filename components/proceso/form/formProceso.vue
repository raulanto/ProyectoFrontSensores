<script lang="ts" setup>
import {type InferType, object, string} from 'yup'
import type {FormSubmitEvent} from '#ui/types'
import {useEquipo} from "~/composables/useEquipo";
import {useProceso} from "~/composables/useProceso"
import {onBeforeMount, onMounted, ref, reactive} from "vue";
import {defineProps} from "vue";
const { postNotificacion } = useNotificaciones();

import { useNotificaciones } from "~/composables/useNotificaciones";
import {useAuthStore} from "~/stores/auth";

const toast = useToast()
const {fetchEquipos} = useEquipo()  // Importa también el método postProceso
const {postProceso} = useProceso()
const equipos = ref([])


const props =defineProps({
    isOpen:{
        required:true,
        type:Boolean
    }
})

const emit = defineEmits(['form-success', 'recargardatos']); // Asegurarte de emitir 'recargardatos'
const schema = object({
    nombre: string().required('Requerido'),
    descripcion: string().required('Requerido'),
    fkequipo: string().required('Requerido'),
})

type Schema = InferType<typeof schema>

const state = reactive({
    nombre: '',
    descripcion: '',
    usuario: Number,  // Asigna el valor de usuario en onSubmit
    fkequipo: Number,
})
const authStore = useAuthStore()
// @ts-ignore
const iduser = authStore.user.id

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        // Asignamos el ID del usuario desde la store de autenticación
        const authStore = useAuthStore()
        state.usuario = authStore.user.id
        console.log(state)
        // Llama al método para crear un proceso
        await postProceso({
            nombre: state.nombre,
            descripcion: state.descripcion,
            usuario: state.usuario,
            fkequipo: Number(state.fkequipo),
        })
        emit('form-success');
        emit('recargardatos');  // Emitir para que el componente padre recargue los datos
        toast.add({
            id: 'update_downloaded',
            title: 'Proceso Creado',
            icon: 'i-octicon-desktop-download-24',
            timeout: 6000,

        })
        await postNotificacion({
            user:iduser,
            message:"Creado proceso",
            tittle: "Proceso  Creado exitosamente",
            notification_type:"success"
        })
    } catch (error) {
        console.error('Error al crear el proceso:', error.message)
        toast.add({
            id: 'update_downloaded',
            title: 'Proceo no Creado',
            icon: 'i-octicon-desktop-download-24',
            timeout: 600,
        })
    }
}

onMounted(async () => {
    try {
        const data = await fetchEquipos()

        equipos.value = data.results.map((item: any) => ({
            value: item.id,
            name: item.nombre,
        }))
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

onBeforeMount(async () => {
    try {
        const data = await fetchEquipos()
        equipos.value = data.results.map((item: any) => ({
            value: item.id,
            name: item.nombre,
        }))
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
        // Opcional: Lógica si el modal se cierra
    }
});
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nombre" name="nombre">
            <UInput v-model="state.nombre"/>
        </UFormGroup>

        <UFormGroup label="Descripcion" name="descripcion">
            <UTextarea  v-model="state.descripcion"/>
        </UFormGroup>

        <UFormGroup label="Equipo" name="equipo">
            <USelect v-model="state.fkequipo" :options="equipos" option-attribute="name"     placeholder="Equipos"  />
        </UFormGroup>

        <UButton type="submit">
            Crear Proceso
        </UButton>
    </UForm>
</template>

