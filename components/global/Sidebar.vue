<script lang="ts" setup>
import {ref} from 'vue'
import {useRoute} from 'vue-router';

const isSidebarVisible = ref(false)


const route = useRoute();


const links = [{
    label: 'Equipo',
    icon: 'i-heroicons-home',
    to: `/equipos`
},
    {
        label: 'Planta',
        icon: 'i-heroicons-chart-bar',
        to: "/planta"
    }, {
        label: 'Producto',
        icon: 'i-heroicons-command-line',
        to: '/productos'
    }, {
        label: 'Sensores',
        icon: 'i-heroicons-command-line',
        to: '/sensores'
    }, {
        label: 'Procesos',
        icon: 'i-heroicons-command-line',
        to: '/procesos'
    }, {
        label: 'Notificaciones',
        icon: 'i-heroicons-command-line',
        to: '/notificaciones'
    }
    ]

const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
}

const handleClickOutside = (event) => {
    const button = document.getElementById('toggle-sidebar-button')
    const sidebar = document.getElementById('default-sidebar')

    if (isSidebarVisible.value) {
        if (sidebar && !sidebar.contains(event.target) && button && !button.contains(event.target)) {
            isSidebarVisible.value = false
        }
    }
}

const handleResize = () => {
    if (window.innerWidth > 640 && isSidebarVisible.value) {
        isSidebarVisible.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', handleResize)

})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', handleResize)

})
</script>

<template>
    <!--nav de cerrar o abrir-->
    <NavarDas @toggleSidebar="toggleSidebar"/>
    <transition name="slide-fade">
        <div
            v-if="isSidebarVisible"
            id="default-sidebar"
            aria-labelledby="default-sidebar"
            class="fixed top-0 left-0 z-40 w-60 h-screen p-2 pt-14 transition-transform bg-white dark:bg-gray-800"
            tabindex="-1"
        >
            <section class="overflow-y-auto py-5 px-2 h-full bg-white dark:bg-gray-800">
                <div>
                    <UVerticalNavigation :links="links"/>
                </div>
            </section>
        </div>
    </transition>

</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    transform: translateX(0);
    opacity: 1;
}
</style>
