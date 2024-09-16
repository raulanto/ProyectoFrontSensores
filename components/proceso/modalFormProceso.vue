<script lang="ts" setup>
import FormProceso from "~/components/proceso/form/formProceso.vue";
import { ref } from 'vue';

const isOpen = ref(false);
const emit = defineEmits(['recargardatos']);
// Función para cerrar el modal cuando se envía correctamente
const closeModal = () => {
    isOpen.value = false;
};
</script>

<template>
    <div>
        <UButton color="white" label="Crear Proceso" variant="solid" @click="isOpen = true"/>

        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Crear Proceso
                        </h3>
                        <UButton class="-my-1" color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost"
                                 @click="isOpen = false"/>
                    </div>
                </template>
                <form-proceso :is-open="isOpen" @form-success="closeModal" @recargardatos="$emit('recargardatos')"/>            </UCard>
        </UModal>
    </div>
</template>
