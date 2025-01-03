// composables/usenotificaciones.ts
import {useFetch} from "#app";
import {useAuthStore} from "~/stores/auth";
export function useNotificaciones() {
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser = authStore.user.id
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    async function fetchNotificacion() {
        const {data, error} = await useFetch(`/api/notificacion/?use=${iduser}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })

        if (error.value) {
            throw new Error('Error al consumir la API')
        }
        return data.value
    }

    async function fetchNotificacionRead() {
        const {data, error} = await useFetch(`/api/notificacion/?use=${iduser}&is_read=false`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })

        if (error.value) {
            throw new Error('Error al consumir la API')
        }
        return data.value
    }

    async function postNotificacion(
        notificacion: {
            user: number;
            message: string;
            tittle: string;
            notification_type:string;

        }
    ) {
        const {data, error} = await useFetch('${apiUrl}/api/v1/notificacion/registro/', {
            method: 'POST',
            headers: {
                Authorization: `Token ${authStore.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificacion)
        })

        if (error.value) {
            throw new Error('Error al crear el proceso')
        }

        return data.value

    }

    async function putNotificacion(id: number,
                                   notificacion: {
                                       is_read: boolean

                                   }) {
        const {data, error} = await useFetch(`${apiUrl}/api/v1/notificacion/${id}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Token ${authStore.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificacion)
        })

        if (error.value) {
            throw new Error('Error al actulizar el valor')
        }

        return data.value

    }

    return {
        fetchNotificacion,
        putNotificacion,
        postNotificacion,
        fetchNotificacionRead
    }
}