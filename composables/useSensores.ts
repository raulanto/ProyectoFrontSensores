
// composables/useEquipo.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useSensores() {
    const authStore = useAuthStore()
    const iduser = authStore.user?.id
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    async function fetchSensor() {
        const { data, error } = await useFetch(`${apiUrl}/api/v1/sensor/?usuario=${iduser}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })

        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }

    return {
        fetchSensor,
    }
}
