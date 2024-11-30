// composables/useProceso.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useProceso() {
    const authStore = useAuthStore()
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    // @ts-ignore
    const iduser = authStore.user.id

    // Método para obtener procesos (GET)
    async function fetchProceso() {
        const { data, error } = await useFetch(`/api/proceso/?usuario=${iduser}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })

        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }

    async function fetchProcesoId(id: number) {
        const { data, error } = await useFetch(`/api/proceso/?usuario=${iduser}&id=${id}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })

        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }

    // Método para crear un nuevo proceso (POST)
    async function postProceso(proceso: { nombre: string; descripcion: string; usuario: number; fkequipo: number }) {
        const { data, error } = await useFetch(`${apiUrl}/api/v1/proceso/registro/`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${authStore.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proceso)
        })

        if (error.value) {
            throw new Error('Error al crear el proceso')
        }

        return data.value
    }

    return {
        fetchProceso,
        postProceso,
        fetchProcesoId
    }
}
