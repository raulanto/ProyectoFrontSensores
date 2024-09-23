<script lang="ts" setup>
import {type InferType, object, string,number} from 'yup'
import type {FormSubmitEvent} from '#ui/types'
import {useEtapa} from "~/composables/useEtapa";
import {useNotificaciones} from "~/composables/useNotificaciones";
import {useAuthStore} from "~/stores/auth";

const { postNotificacion } = useNotificaciones();
const {postEtapa}=useEtapa()
const toast = useToast()
const props = defineProps({
    procesoid:{
        type:Number,
        required:true
    },
    isOpen:{
        required:true,
        type:Boolean
    }
})
const emit = defineEmits(['form-success','recargardatos']);
const schema = object({
    nombre: string().required('Requerido'),
    activo: number().required('Requerido'),
    duracion_en_horas: string().required('Requerido'),
})
const authStore = useAuthStore()
// @ts-ignore
const iduser = authStore.user.id
type Schema = InferType<typeof schema>

const state = reactive({
    nombre: undefined,
    activo: 2,
    fkProceso: Number,
    duracion_en_horas: '00:30:00',

})

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

  // Add leading zeros to minutes and seconds if needed
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}


async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await postEtapa({
      nombre: state.nombre,
      activo: state.activo,
      duracion: state.duracion_en_horas,
      fkProceso: Number(props.procesoid),
      horacreacion: getCurrentTime(), // Get the formatted current time
    })
    emit('form-success');
    emit('recargardatos');
    toast.add({
      id: 'update_downloaded',
      title: 'Etapa Creado',
      icon: 'i-octicon-desktop-download-24',
      timeout: 6000,
    })
    await postNotificacion({
      user: iduser,
      message: "Etapa Creada",
      tittle: "Etapa  Creado exitosamente",
      notification_type: "success"
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


const estadoactivo = [{
    name: 'Activo',
    value: 1
}, {
    name: 'Desactivado',
    value: 2,

}, {
    name: 'Terminado',
    value: 3
}, {
    name: 'Error',
    value: 4
}]

const duracionLista=[
    {name:"1 día: 24 horas",value:'24:00:00'},
    {name:"2 días: 48 horas",value:'48:00:00'},
    {name:"3 días: 72 horas",value:'72:00:00'},
    {name:"1 semana (7 días)",value:'168:00:00'},
    {name:"30 minutos",value:'00:30:00'},
    {name:"30 ",value:'00:00:60'},
]
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
        <UFormGroup label="Estado de la etapa" name="etapa">
            <USelect :options="estadoactivo" v-model="state.activo" option-attribute="name" />
        </UFormGroup>
        <UFormGroup label="Duracion" name="duracion">
            <USelect :options="duracionLista" v-model="state.duracion_en_horas" option-attribute="name"/>
        </UFormGroup>

        <UButton type="submit">
            Agregar Etapa
        </UButton>
    </UForm>
</template>

