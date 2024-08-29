<script setup lang="ts">
import { ref, reactive } from 'vue'
import { object, string, type InferType } from 'yup'
import { useFetch } from '#imports'
import type { FormSubmitEvent } from '#ui/types'

// Definir el esquema de validación con Yup
const schema = object({
    username: string().email('Invalid email').required('Required'),
    password: string()
        .min(8, 'Must be at least 8 characters')
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
async function onSubmit(event: Event) {
    event.preventDefault()

    try {
        // Validar los datos del formulario
        await schema.validate(state, { abortEarly: false })

        // Limpiar errores previos
        Object.keys(errors).forEach(key => (errors[key as keyof Schema] = undefined))

        // Enviar los datos a la API
        const { data, error } = await useFetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            body: {
                email: state.username,
                password: state.password
            }
        })

        if (error.value) {
            // Manejar el error devuelto por la API
            apiError.value = error.value.data.non_field_errors[0]
        } else {
            const { token, user_id, email, first_name } = data.value

            // Guardar los datos en localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('user_id', user_id)
            localStorage.setItem('email', email)
            localStorage.setItem('first_name', first_name)

            // Redirigir o realizar otra acción
            // router.push('/dashboard')
        }
    } catch (validationErrors) {
        // Manejar errores de validación
        if (validationErrors instanceof ValidationError) {
            validationErrors.inner.forEach(error => {
                errors[error.path as keyof Schema] = error.message
            })
        }
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
                        <UInput v-model="state.username" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput v-model="state.password" type="password" />
                    </UFormGroup>

                    <UButton type="submit">
                        Submit
                    </UButton>
                </UForm>
            </div>

        </div>
    </div>


</template>
