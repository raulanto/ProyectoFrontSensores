// composables/useEquipo.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useLecturaEtapa() {
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id
    async function fetchLectura(etapa:number) {
        const { data, error } = await useFetch(`http://127.0.0.1:8000/api/v1/lectura/?fkEtapa=${etapa}`, {
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
        fetchLectura,
    }
}
