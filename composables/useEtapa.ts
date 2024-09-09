import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useEtapa() {
    const authStore = useAuthStore()
    async function fetchEtapa(fkProceso:number) {
        const { data, error } = await useFetch(`http://127.0.0.1:8000/api/v1/etapa/?fkProceso=${fkProceso}`, {
            headers: {
                Authorization:`Token ${authStore.token}`
            }
        })
        if (error.value) {
            throw new Error('Error al consumir la API')
        }
        return data.value
    }
    return {
        fetchEtapa,
    }
}
