export default defineNuxtConfig({
    // Error de apexcharts
    build: {
        transpile: ['vue3-apexcharts']
    },
    modules: ['@nuxt/ui','@pinia/nuxt',],
    colorMode: {
        preference: 'light'
    },
    compatibilityDate: '2024-04-03',
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    plugins: [
        {src:  '~/plugins/vue-apexcharts.js', ssr: false},
    ],
    vite: {
        ssr: {
            noExternal: ['vue3-apexcharts']
        }
    },


})