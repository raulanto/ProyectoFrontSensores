// stores/auth.ts
import { defineStore } from 'pinia'


interface User {
    id: number | null
    email: string | null
    firstName: string | null
}

export const useAuthStore = defineStore('auth', () => {
    // Usamos useCookie para manejar el token
    const tokenCookie = useCookie<string | null>('auth_token')
    const userCookie = useCookie<User | null>('auth_user')

    const token: Ref<string | null> = ref(tokenCookie.value || null)
    const user: Ref<User | null> = ref(userCookie.value || null)

    const isAuthenticated = computed(() => !!token.value)

    function setToken(newToken: string) {
        token.value = newToken
        tokenCookie.value = newToken
    }

    function setUser(newUser: User) {
        user.value = newUser
        userCookie.value = newUser
    }

    function logout() {
        token.value = null
        user.value = null
        tokenCookie.value = null
        userCookie.value = null
    }

    return {
        token,
        user,
        isAuthenticated,
        setToken,
        setUser,
        logout,
    }
})
