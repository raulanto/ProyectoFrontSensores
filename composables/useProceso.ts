// composables/useEquipo.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useProceso() {
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id
    async function fetchProceso() {
        const { data, error } = await useFetch(`http://127.0.0.1:8000/api/v1/proceso/?usuario=${iduser}`, {
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
        fetchProceso,
    }
}
