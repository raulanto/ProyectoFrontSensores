<script setup lang="ts">
import Comandos from "~/components/perfil/documentacion/comandos.vue";

definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});
const links = [ {
    label: 'Documentacion',
    icon: 'i-heroicons-square-3-stack-3d',

}]

</script>

<template>
    <UBreadcrumb :links="links" class="section-card"/>
    <section class="section-card">
        <comandos/>
    </section>
</template>

<style scoped>

</style>