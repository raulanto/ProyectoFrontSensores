// composables/useEquipo.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useseccionSensor() {
    const authStore = useAuthStore()

    async function fetchseccionSensor(fkseccionEquipo:number) {
        const { data, error } = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/seccionSensor/?fkseccionEquipo=${fkseccionEquipo}`, {
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
