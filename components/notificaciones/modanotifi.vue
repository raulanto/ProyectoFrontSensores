<script setup lang="ts">
import { useNotificaciones } from "~/composables/useNotificaciones";
import { ref, onMounted } from 'vue';

const { fetchNotificacionRead, putNotificacion } = useNotificaciones();
const notificacion = ref([]);

// Fetch notifications initially
onMounted(async () => {
    await refreshNotifications();
});

// Function to get the color of the notification according to type
function getColor(value) {
    const colors = { info: 'emerald', warning: 'yellow', error: 'red', success: 'sky' };
    return colors[value] || 'gray';
}

// Function to handle notification "read" state
async function handleNotificationRead(id: number) {
    try {
        await putNotificacion(id, { is_read: true });
        await refreshNotifications(); // Refresh the notifications after marking as read
    } catch (e) {
        console.log('Error al marcar la notificación como leída', e);
    }
}

// Function to refresh the notifications (re-fetch the latest data)
async function refreshNotifications() {
    try {
        const data = await fetchNotificacionRead();
        notificacion.value = data.results; // Update the notification list with new data
    } catch (e) {
        console.log('Error al actualizar las notificaciones', e);
    }
}

// Page metadata
definePageMeta({
    layout: 'dasboradlyt',
    middleware: ['auth'],
});

const isOpen = ref(false);

const { metaSymbol } = useShortcuts()


defineShortcuts({
    meta_P: {
        usingInput: true,
        handler: () => {
            isOpen.value = !isOpen.value
        }
    }
})
</script>

<template>
    <UTooltip text="Mostrar" :shortcuts="[metaSymbol, 'P']">
        <UChip>
             <UButton label="Notificaciones" @click="isOpen = true" color="white"     chip-color="primary"/>
        </UChip>
    </UTooltip>

    <USlideover v-model="isOpen" prevent-close>
        <UCard class="flex flex-col flex-1">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Notificaciones
                    </h3>
                    <UButton class="-my-1" color="gray" icon="i-heroicons-x-mark-20-solid"
                             variant="ghost" @click="isOpen = false"/>
                </div>
            </template>
            <!-- Display notifications -->
            <div v-for="item in notificacion" :key="item.id">
                <UAlert
                    :title="item.tittle"
                    :description="item.message"
                    :icon="item.notification_type === 'info' ? 'i-heroicons-information-circle' : 'i-heroicons-command-line'"
                    :color="getColor(item.notification_type)"
                    class="my-2"
                    :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'white', variant: 'link', padded: false }"
                    @close="handleNotificationRead(item.id)"
                />
            </div>
            <div class="mt-4">
                <UButton label="Actualizar Notificaciones" @click="refreshNotifications" block/>
            </div>
        </UCard>
    </USlideover>
</template>

<style scoped>
</style>
