// middleware/auth.global.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if (!authStore.token) {
        if (to.path !== '/login') {
            return navigateTo('/login')
        }
    }
})
