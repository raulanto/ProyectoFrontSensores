<script setup lang="ts">

import RadiarChart from "~/components/charts/radiarChart.vue";
import FormProducto from "~/components/producto/form/formProducto.vue";

definePageMeta({
    layout: 'dasboradlyt',
    middleware: [
        'auth',
    ],

});
</script>

<template>
    <form-producto/>
</template>

<style scoped>

</style>