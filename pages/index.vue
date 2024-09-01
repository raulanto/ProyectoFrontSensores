<script lang="ts" setup>
// import {useLoginStore} from '@/stores/LoginStore';
// import types DatosLecturaForm from '@/types/formUsuarioLogin';
import Login from "~/components/login/formLogin.vue";

definePageMeta({
    layout: 'login-layout'
});


</script>

<template>
    <section
        class="bg-center bg-cover fondo"
    >
        <Login/>
    </section>
</template>

<style scoped>

.fondo{
    background-image: url("assets/img/fondo.png");
}

</style>