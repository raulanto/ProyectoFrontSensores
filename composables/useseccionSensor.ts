
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useseccionSensor() {
    const authStore = useAuthStore()
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    async function fetchseccionSensor(fkseccionEquipo:number) {
        const { data, error } = await useFetch(`/api/seccionSensor/?fkseccionEquipo=${fkseccionEquipo}`, {
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
        fetchseccionSensor,
    }
}
