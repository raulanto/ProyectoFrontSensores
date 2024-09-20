import { ref } from 'vue'
import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function usePlanta() {
    const authStore = useAuthStore()
    const plantas = ref(null)
    const error = ref(null)

    const iduser = authStore.user?.id
    const token = authStore.token

    async function fetchPlantas() {
        const { data, error } = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/planta/?usuario=${iduser}`, {
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
        fetchPlantas,
    }
}
