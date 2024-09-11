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
    async function fetchEtapaid(id: number) {
        const { data, error } = await useFetch(`http://127.0.0.1:8000/api/v1/etapa/?id=${id}`, {
            headers: {
                Authorization: `Token ${authStore.token}`,
            },
        });

        if (error.value) {
            throw new Error('Error al consumir la API');
        }

        // Extracting the 'fkequipo' from the first result in the response
        const result = data.value?.results.[0].fkProceso.fkequipo;

        if (!result) {
            throw new Error('No fkequipo found in the response');
        }

        return result;
    }


    return {
        fetchEtapa,
        fetchEtapaid
    }
}
