<script setup lang="ts">
import FormEquipo from "~/components/equipo/form/formEquipo.vue";
import {ref} from "vue";

const isOpen = ref(false);
const emit = defineEmits(['recargardatos']);
// Función para cerrar el modal cuando se envía correctamente
const closeModal = () => {
    isOpen.value = false;
};
const { metaSymbol } = useShortcuts()


defineShortcuts({
    meta_c: {
        usingInput: true,
        handler: () => {
            isOpen.value = !isOpen.value
        }
    }
})


</script>

<template>

    <div>
        <UTooltip text="Crear proceso" :shortcuts="[metaSymbol, 'c']">
            <UButton label="Crear Equipo" @click="isOpen = true" color="white" variant="solid" />
        </UTooltip>

        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Crear Equipo
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
                    </div>
                </template>

                <form-equipo :is-open="isOpen" @form-success="closeModal" @recargardatos="$emit('recargardatos')"/>
            </UCard>
        </UModal>
    </div>
</template>

