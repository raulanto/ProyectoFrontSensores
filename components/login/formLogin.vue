<script lang="ts" setup>
// import {useLoginStore} from '@/stores/LoginStore';
// import type DatosLecturaForm from '@/types/formUsuarioLogin';
import {ref} from 'vue'

let username = ref('')
let password = ref('')
let error = ref(false)
let activado = ref(true)
let errorMessage = ref('')

// const loguearse = async () => {
//     const login = useLoginStore();
//     const data: DatosLecturaForm = {
//         'username': username.value,
//         'password': password.value
//     };
//     console.log(data);
//
//     await login.postLoginStore(data);
//     const validacion = login.validacion;
//
//     if (validacion) {
//         console.log('Correcto');
//         error.value = false;
//         activado.value = true;
//     } else {
//         console.log('Incorrecto');
//         error.value = true;
//         activado.value = false;
//         errorMessage.value = 'Usuario o contraseña incorrectos';
//     }
// };
</script>

<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <router-link to="/">
            <a
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white bg-white rounded-full p-4"
                href="#"
            >
                <img alt="logo" class="w-12 h-12 mr-2" src="~/assets/logo.svg"/>
                Esie <strong class="text-primary-600">Graph</strong>
            </a>
        </router-link>

        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                    class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                >
                    Bienvenido
                </h1>
                <!--                    <form class="space-y-4 md:space-y-6" @submit.prevent="loguearse()">-->
                <form class="space-y-4 md:space-y-6">
                    <!-- Usuario -->
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="username"
                        >Usuario</label
                        >

                            <UInput color="blue" variant="outline" placeholder="Usuario..." v-model="username" />


                    </div>
                    <!-- Contraseña -->
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="password"
                        >Contraseña</label
                        >
                        <UInput color="blue" variant="outline" placeholder="Contraseña" v-model="password" type="password" />

                    </div>
                    <NuxtLink to="/proyect">
                        <UButton block class="mt-4" color="blue">Entrar</UButton>
                    </NuxtLink>
                    <p v-if="error" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
                </form>
            </div>
        </div>
    </div>




</template>
