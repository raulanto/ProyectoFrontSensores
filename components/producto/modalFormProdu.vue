<script lang="ts" setup>


import FormProducto from "~/components/producto/form/formProducto.vue";

const isOpen = ref(false)
</script>

<template>
    <div>
        <UButton color="white" label="Agregar Producto" variant="solid" @click="isOpen = true"/>

        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Crear Equipo
                        </h3>
                        <UButton class="-my-1" color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost"
                                 @click="isOpen = false"/>
                    </div>
                </template>

                <form-producto/>
            </UCard>
        </UModal>
    </div>
</template>

