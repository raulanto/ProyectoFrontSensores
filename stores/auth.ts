// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: {
            id: null as number | null,
            email: null as string | null,
            firstName: null as string | null,
        },
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUser(user: { id: number, email: string, firstName: string }) {
            this.user.id = user.id
            this.user.email = user.email
            this.user.firstName = user.firstName
        },
        logout() {
            this.token = null
            this.user = { id: null, email: null, firstName: null }
        }
    },
})
