// composables/usenotificaciones.ts
import {useFetch} from "#app";
import {useAuthStore} from "~/stores/auth";

export function useNotificaciones(){
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id

    async function fetchNotificacion(){
        const { data, error } = await useFetch(`http://127.0.0.1:8000/api/v1/notificacion/?use=${iduser}`, {
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
        notificacion:{
            user:number;
            message:string;
            tittle:string;

        }
    ){
        const { data, error } = await useFetch('http://127.0.0.1:8000/api/v1/notificacion/registro/', {
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

    return{
        fetchNotificacion
    }
}