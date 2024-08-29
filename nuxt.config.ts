export default defineNuxtConfig({
    modules: ['@nuxt/ui'],
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


    ui: {
        primary: 'green',
        gray: 'neutral'
    }


})