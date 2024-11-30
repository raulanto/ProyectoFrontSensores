// composables/useEquipo.ts
import {useFetch} from '#app'
import {useAuthStore} from '~/stores/auth'
export function useEquipo() {
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser = authStore.user.id
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    async function fetchEquipos() {
        const {data, error} = await useFetch(`/api/equipo?usuario=${iduser}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })

        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }

    async function postEquipos(
        equipo: {
            nombre: string;
            descripcion: string;
            fkplanta: number;
            fkproducto: number;
            usuario: number
        }
    ) {
        const {data, error} = await useFetch(`${apiUrl}/api/v1/equipo/registro/`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${authStore.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(equipo)
        })

        if (error.value) {
            throw new Error('Error al crear el proceso')
        }

        return data.value
    }

    return {
        fetchEquipos,
        postEquipos
    }
}
