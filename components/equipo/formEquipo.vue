<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'


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
    descripcion: undefined,
    fkplanta_nombre: undefined,
    fkproducto_nombre: undefined,
    usuario: undefined,

})

async function onSubmit (event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)
}





const Plantas = [{
    id: 10,
    name: 'Depuradora de ostiones'
}]


</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nombre" name="nombre" >
            <UInput v-model="state.nombre" />
        </UFormGroup>

        <UFormGroup label="Descripcion" name="descripcion">
            <UTextarea v-model="state.descripcion"  />
        </UFormGroup>

        <UFormGroup label="Planta" name="planta">
            <USelectMenu v-model="state.fkplanta_nombre" :options="Plantas" required   placeholder="Planta"
                         value-attribute="id"
                         option-attribute="name" />
        </UFormGroup>

        <UFormGroup label="Producto" name="producto">
            <USelectMenu v-model="state.fkproducto_nombre" :options="Plantas" required   placeholder="Producto"
                         value-attribute="id"
                         option-attribute="name" />
        </UFormGroup>

        <UButton type="submit">
            Agregar Equipo
        </UButton>
    </UForm>
</template>

