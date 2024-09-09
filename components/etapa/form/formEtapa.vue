<script lang="ts" setup>
import {type InferType, object, string} from 'yup'
import type {FormSubmitEvent} from '#ui/types'


const schema = object({
    nombre: string().required('Requerido'),
    descripcion: string().required('Requerido'),
    fkplanta_nombre: string().required('Requerido'),
    fkproducto_nombre: string().required('Requerido'),
    usuario: string().required('Requerido'),
})

type Schema = InferType<typeof schema>

const state = reactive({
    nombre: undefined,
    activo: Boolean,
    fkProceso: Number,
    duracion_en_horas: undefined,

})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)
}




</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nombre" name="nombre">
            <UInput v-model="state.nombre"/>
        </UFormGroup>
        <UFormGroup label="Estado de la etapa" name="etapa">
            <UToggle v-model="state.activo" />
        </UFormGroup>
        <UFormGroup label="Duracion" name="duracion">
            <UInput v-model="state.duracion_en_horas"/>
        </UFormGroup>



        <UButton type="submit">
            Agregar Etapa
        </UButton>
    </UForm>
</template>

