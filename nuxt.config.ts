
export default defineNuxtConfig({
    modules: [
      '@nuxt/ui',
      '@pinia/nuxt',
      '@formkit/auto-animate/nuxt',
    ],
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
        {src:  '~/plugins/vue-data-ui.client.js'},
    ],
    vite: {
        ssr: {
            noExternal: ['vue3-apexcharts']
        }
    },
    runtimeConfig: {
        public: {
            apiKey:'http://127.0.0.1:8000'
        }
    }


})