<script setup lang="ts">
import {useNotificaciones} from "~/composables/useNotificaciones";
const {fetchNotificacion}=useNotificaciones()
const notificacion =ref([])

definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});

onMounted( async ()=>{
    try {
       const data = await fetchNotificacion()
       notificacion.value = data.results
    }catch (e){
        console.log('Error el obtener los datos',e)
    }

})


const links = [ {
    label: 'Notificaciones',
    icon: 'i-heroicons-square-3-stack-3d',

}]

</script>

<template>
    <UBreadcrumb :links="links" class="section-card"/>

    <section class="section-card">
        <section class="mx-3 my-2">
            <h1 class="text-xl font-bold">Notificaciones</h1>
        </section>

        <UAlert title="Customize Alert Icon" description="Insert custom content into the icon slot!" icon="i-heroicons-command-line">
            <template #icon="{ icon }">
                <UBadge size="sm">
                    <UIcon :name="icon" />
                </UBadge>
            </template>
        </UAlert>
    </section>
    <pre>
        {{notificacion}}
    </pre>
</template>

<style scoped>

</style>