<script lang="ts" setup>

import { ref } from 'vue';
import FormEtapa from "~/components/etapa/form/formEtapa.vue";

const isOpen = ref(false);
const emit = defineEmits(['recargardatos']);
const props = defineProps({
    prcesoId:{
        type:Number,
        required:true
    }
})
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
            <UButton color="white" label="Crear Etapa" variant="solid" @click="isOpen = true"/>
        </UTooltip>

        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Crear Etapa
                        </h3>
                        <UButton class="-my-1" color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost"
                                 @click="isOpen = false"/>
                    </div>
                </template>
                <form-etapa :procesoid="props.prcesoId" :is-open="isOpen" @form-success="closeModal" @recargardatos="$emit('recargardatos')"/>
            </UCard>
        </UModal>
    </div>
</template>
