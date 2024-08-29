<script lang="ts" setup>

import Line from "~/components/icons/Line.vue";

const emit = defineEmits(['toggleSidebar']);
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
                <NuxtLink to="/panel/" class="flex items-center justify-between mr-4" href="">
                    <img alt="Flowbite Logo" class="mr-3 h-8" src="~/assets/logo.svg"/>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >Dashboard</span
                    >
                </NuxtLink>
            </div>
            <div class="flex items-center lg:order-2">

                <Avatar/>

            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>