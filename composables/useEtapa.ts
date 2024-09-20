import {useFetch} from '#app'
import {useAuthStore} from '~/stores/auth'

interface FkProceso {
    fkequipo: number;
}

interface Etapa {
    id: number;
    nombre: string;
    activo: boolean;
    fkProceso: FkProceso;
    duracion: string;
    created_at: string,
    createdTime_at: string,
    updated_at: string
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Etapa[];
}


export function useEtapa() {
    const authStore = useAuthStore()

    async function fetchEtapa(fkProceso: number) {
        const {data, error} = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/etapa/?fkProceso=${fkProceso}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })
        if (error.value) {
            throw new Error('Error al consumir la API')
        }
        return data.value
    }

    async function fetchEtapaid(id: number): Promise<{
        fkProceso: FkProceso;
        etapaPrincipal: { duracion: string; id: number; nombre: string; activo: boolean }
    }> {
        const {data, error} = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/etapa/?id=${id}`, {
            headers: {
                Authorization: `Token ${authStore.token}`,
            },
        });

        if (error.value) {
            throw new Error('Error al consumir la API');
        }

        // @ts-ignore
        const result: ApiResponse = data.value;

        if (!result || result.results.length === 0) {
            throw new Error('No data found in the response');
        }

        const etapa = result.results[0];

        const etapaPrincipal = {
            id: etapa.id,
            nombre: etapa.nombre,
            activo: etapa.activo,
            duracion: etapa.duracion,
            created_at: etapa.created_at,
            createdTime_at: etapa.createdTime_at,
            updated_at: etapa.updated_at
        };

        const fkProceso = etapa.fkProceso;

        console.log('Objeto Principal:', etapaPrincipal);
        console.log('Objeto fkProceso:', fkProceso);

        return {etapaPrincipal, fkProceso};
    }

    async function postEtapa(proceso: { nombre: string; descripcion: string; duracion: string; fkProceso: number; activo:number }) {
        const {data, error} = await useFetch('https://apis-production-9a03.up.railway.app/api/v1/etapa/registro/', {
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
    async function putEtapa(proceso: { activo:number },id:number) {
        const {data, error} = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/etapa/${id}/`, {
            method: 'PUT',
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
        fetchEtapa,
        fetchEtapaid,
        postEtapa,
        putEtapa,

    }
}
