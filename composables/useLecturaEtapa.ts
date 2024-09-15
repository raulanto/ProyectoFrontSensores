// composables/useEquipo.ts
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

interface DatosLectura {
    id: number;
    valor:number;
    fkEtapa: number;
    fkESeccionEquipoSensor: number;
    created_at: string;
    createdTime_at: String;
}



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

    async function fetchLecturaEquipo(etapa:number,fkESeccionEquipoSensor:number) {
        const { data, error } =
            await useFetch(`http://127.0.0.1:8000/api/v1/lectura/?fkEtapa=${etapa}&fkESeccionEquipoSensor=${fkESeccionEquipoSensor}`, {
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
        fetchLecturaEquipo
    }
}
