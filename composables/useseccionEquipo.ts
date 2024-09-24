// composables/useEquipo.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'
export function useseccionEquipo() {
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    async function fetchseccionEquipo(fkequipo:number) {
        const { data, error } = await useFetch(`${apiUrl}/api/v1/seccionEquipo/?fkequipo=${fkequipo}`, {
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
        fetchseccionEquipo,
    }
}
