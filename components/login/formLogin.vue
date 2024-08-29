<script setup lang="ts">
import { ref, reactive } from 'vue'
import { object, string, type InferType } from 'yup'
import { useFetch,useRouter } from '#imports'
import { useAuthStore } from '~/stores/auth'
import type { FormSubmitEvent } from '#ui/types'
const authStore = useAuthStore()
const router = useRouter()
// Definir el esquema de validación con Yup
const schema = object({
    username:  string()
        .required('Required'),
    password: string()
        .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
    username: '',
    password: ''
})

// Estado para manejar los errores de validación y de la API
const errors = reactive<Partial<Schema>>({})
const apiError = ref<string | null>(null)

// Función para manejar el envío del formulario
async function onSubmit (event: FormSubmitEvent<Schema>) {
    event.preventDefault()

    try {
        const { data, pending, error, refresh } = await useFetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            body: {
                username: state.username,
                password: state.password
            }
        })

        if (data.value && data.value.token) {
            authStore.setToken(data.value.token)
            authStore.setUser({
                id: data.value.user_id,
                email: data.value.email,
                firstName: data.value.first_name
            })

            // Redirigir a la página principal u otra página protegida
            router.push('/panel/')
        } else if (error.value) {
            // Manejar el error, mostrar mensaje al usuario, etc.
            console.error('Error:', error.value)
        }
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error)
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <router-link to="/">
            <a
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white bg-white rounded-full p-4"
                href="#"
            >
                <img alt="logo" class="w-12 h-12 mr-2" src="~/assets/logo.svg"/>
                Panel <strong class="text-primary-600">GraphSensor</strong>
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
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Username" name="username">
                        <UInput v-model="state.username"     size="md"/>
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput v-model="state.password" type="password"     size="md"/>
                    </UFormGroup>

                    <UButton type="submit" block>
                        Entrar
                    </UButton>
                    <p v-if="apiError">{{ apiError }}</p>
                </UForm>
            </div>

        </div>
    </div>


</template>
