<script setup>
import { useNotificaciones } from "~/composables/useNotificaciones";
import { ref, computed, onMounted } from 'vue';

const { fetchNotificacion } = useNotificaciones();
const notificacion = ref([]);

// Fetch notifications
onMounted(async () => {
    try {
        const data = await fetchNotificacion();
        notificacion.value = data.results;
    } catch (e) {
        console.log('Error al obtener los datos', e);
    }
});

onBeforeMount(async () => {
    try {
        const data = await fetchNotificacion();
        notificacion.value = data.results;
    } catch (e) {
        console.log('Error al obtener los datos', e);
    }
});

// Definir enlaces para el breadcrumb
const links = [
    {
        label: 'Notificaciones',
        icon: 'i-heroicons-square-3-stack-3d',
    },
];

// Opciones para los tipos de notificaciones
const estado = [
    { id: "all", name: 'Todos' }, // Opción para mostrar todas las notificaciones
    { id: "info", name: 'Informacion' },
    { id: "warning", name: 'Problema' },
    { id: "error", name: 'Error' },
    { id: "success", name: 'Suceso' },
];

// Valor seleccionado para el tipo de notificación
const selected = ref(estado[0].id);

// Toggle para filtrar por estado de leído/no leído
const leido = ref(false);

// Función para obtener el color de la notificación según el tipo
function getColor(value) {
    const colors = { info: 'emerald', warning: 'yellow', error: 'red', success: 'sky' };
    return colors[value] || 'gray';
}

// Filtrar notificaciones según el tipo seleccionado y estado de leído/no leído
const filteredNotificaciones = computed(() => {
    return notificacion.value.filter(item => {
        const tipoMatches = selected.value === 'all' || item.notification_type === selected.value;
        const leidoMatches = item.is_read === leido.value;
        return tipoMatches && leidoMatches;
    });
});

// Definir metadatos de la página
definePageMeta({
    layout: 'dasboradlyt',
    middleware: ['auth'],
});

</script>

<template>
    <UBreadcrumb :links="links" class="section-card"/>

    <section class="section-card">
        <section class="mx-3 my-2">
            <h1 class="text-xl font-bold">Notificaciones</h1>
        </section>

        <!-- Formulario para seleccionar estado y tipo de notificación -->
        <UForm class="my-3">
            <UFormGroup label="Estado leido">
                <UToggle v-model="leido" />
            </UFormGroup>

            <UFormGroup label="Tipo de Notificación">
                <USelectMenu
                    v-model="selected"
                    :options="estado"
                    placeholder="Seleccione un tipo de notificación"
                    value-attribute="id"
                    option-attribute="name"
                />
            </UFormGroup>
        </UForm>

        <!-- Mostrar notificaciones filtradas -->
        <div v-for="item in filteredNotificaciones" :key="item.id">
            <UAlert
                :title="item.tittle"
                :description="item.message"
                :icon="item.notification_type === 'info' ? 'i-heroicons-information-circle' : 'i-heroicons-command-line'"
                :color="getColor(item.notification_type)"
                class="my-2"
            />
        </div>
    </section>
</template>

<style scoped>
/* Scoped styles */
</style>
