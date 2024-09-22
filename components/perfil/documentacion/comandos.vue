<script setup lang="ts">
const { metaSymbol } = useShortcuts()
</script>

<template>
    <section class="bg-white dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                    Comandos
                </h2>


            </div>

            <div class="flow-root max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16">
                <div class="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
                    <div class="flex flex-col gap-2 py-2 sm:gap-3 sm:flex-row sm:items-center">
                        <p class=" text-sm font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
                            <div class="flex items-center gap-0.5">
                                <UKbd>{{ metaSymbol }}</UKbd>
                                <UKbd>C</UKbd>
                            </div>
                        </p>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                            <p class="">Crear formulario</p>
                        </h3>
                    </div>
                    <div class="flex flex-col gap-2 py-2 sm:gap-3 sm:flex-row sm:items-center">
                        <p class=" text-sm font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
                            <div class="flex items-center gap-0.5">
                                <UKbd>{{ metaSymbol }}</UKbd>
                                <UKbd>P</UKbd>
                            </div>
                        </p>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                            <p class="">Mostrar Noticaciones</p>
                        </h3>
                    </div>
                    <div class="flex flex-col gap-2 py-2 sm:gap-3 sm:flex-row sm:items-center">
                        <p class=" text-sm font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
                            <div class="flex items-center gap-0.5">
                                <UKbd>{{ metaSymbol }}</UKbd>
                                <UKbd>Ñ</UKbd>
                            </div>
                        </p>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                            <p class="">Mostrar Menu</p>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>