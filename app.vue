<template>
  <div class="">

  </div>
</template>
<script setup lang="ts">
useHead({
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'theme-color', name: 'theme-color' }
    ],
    link: [
        { rel: 'icon', href: '/logo.png' }
    ],
    htmlAttrs: {
        lang: 'en'
    }
});

const title = 'Panel Admin';
const description = 'Sistema estadistico para sensores';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: 'https://dashboard-template.nuxt.dev/social-card.png',
    // twitterImage: 'https://dashboard-template.nuxt.dev/social-card.png',
    // twitterCard: 'summary_large_image'
});


</script>