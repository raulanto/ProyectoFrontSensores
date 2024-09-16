<script setup lang="ts">
import { useRouter } from '#imports'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()


const router = useRouter()
const items = [
    [{
        label:authStore.user.email ,
        slot: 'account',
        disabled: true
    }],
/*    [{
        label: 'Settings',
        icon: 'i-heroicons-cog-8-tooth'
    }],
    [{
        label: 'Documentation',
        icon: 'i-heroicons-book-open'
        },
        {
        label: 'Changelog',
        icon: 'i-heroicons-megaphone'
        },
        {
        label: 'Status',
        icon: 'i-heroicons-signal'
    }],*/
    [{
        label: 'Abandonar',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: () => logout()
    }]
]

function logout() {
    authStore.logout()
        // Redrigir al usuario a la página de inicio de sesión
        router.push('/login')

}

</script>

<template>
    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
               :popper="{ placement: 'bottom-start' }">
        <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
        />

        <template #account="{ item }">
            <div class="text-left">
                <p>
                    Cuenta
                </p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"/>
        </template>
    </UDropdown>
</template>

