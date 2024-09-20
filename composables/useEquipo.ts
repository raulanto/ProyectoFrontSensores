// composables/useEquipo.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useEquipo() {
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id
    async function fetchEquipos() {
        const { data, error } = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/equipo/?usuario=${iduser}`, {
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
        fetchEquipos,
    }
}
