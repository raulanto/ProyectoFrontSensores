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
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    async function fetchLectura(etapa:number) {
        const { data, error } = await useFetch(`${apiUrl}/api/v1/lectura/?fkEtapa=${etapa}`, {
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
            await useFetch(`${apiUrl}/api/v1/lectura/?fkEtapa=${etapa}&fkESeccionEquipoSensor=${fkESeccionEquipoSensor}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })
        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }


    async function fetchLecturaEquipolast(etapa:number,fkESeccionEquipoSensor:number) {
        const { data, error } =
            await useFetch(`${apiUrl}/api/v1/lectura/last/?fkEtapa=${etapa}&fkESeccionEquipoSensor=${fkESeccionEquipoSensor}`, {
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
        fetchLecturaEquipolast,
        fetchLecturaEquipo
    }
}
