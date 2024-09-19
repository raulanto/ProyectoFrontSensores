<script lang="ts" setup>

import Line from "~/components/icons/Line.vue";

const emit = defineEmits(['toggleSidebar']);
const isOpen = ref(false)
</script>

<template>
    <nav
        class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50 w-screen backdrop-blur-sm bg-white/30"
    >
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
                <div class="text-center">
                    <button
                        id="toggle-sidebar-button"
                        class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        @click="$emit('toggleSidebar')"
                    >
                        <Line></Line>
                    </button>
                </div>
                <NuxtLink class="flex items-center justify-between mr-4" href="" >
                    <img alt="Flowbite Logo" class="mr-3 h-8" src="~/assets/logo.svg"/>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Dashboard
                    </span>
                </NuxtLink>
            </div>
            <div class="flex items-center lg:order-2 gap-2 mx-8">
                <div>
                    <UButton label="Notificaciones" @click="isOpen = true"/>

                    <USlideover v-model="isOpen" prevent-close>
                        <UCard
                            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
                            class="flex flex-col flex-1">
                            <template #header>
                                <div class="flex items-center justify-between">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                        Notificaciones
                                    </h3>
                                    <UButton class="-my-1" color="gray" icon="i-heroicons-x-mark-20-solid"
                                             variant="ghost" @click="isOpen = false"/>
                                </div>
                            </template>
                            <UAlert
                                :avatar="{
                                  src: 'https://avatars.githubusercontent.com/u/739984?v=4',
                                  alt: 'Avatar',

                                }"
                                :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
                                description="Insert custom content into the avatar slot!"
                                title="Customize Alert Avatar"
                            >
                                <template #avatar="{ avatar }">
                                    <UAvatar
                                        chip-color="primary"
                                        chip-position="top-right"
                                        chip-text=""
                                        v-bind="avatar"
                                    />
                                </template>
                            </UAlert>
                        </UCard>
                    </USlideover>
                </div>
                <Avatar/>

            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>