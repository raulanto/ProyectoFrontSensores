import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'


export function useProducto(){
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id

}