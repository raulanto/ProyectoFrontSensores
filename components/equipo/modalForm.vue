<script setup lang="ts">
import FormEquipo from "~/components/equipo/formEquipo.vue";

const isOpen = ref(false)
</script>

<template>
    <div>
        <UButton label="Crear Equipo" @click="isOpen = true" color="white" variant="solid" />

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

                <form-equipo/>
            </UCard>
        </UModal>
    </div>
</template>

