<script lang="ts" setup>

</script>

<template>
  <section class="antialiased fondo min-h-screen bg-gray-50 dark:bg-gray-800 bg-cover bg-bottom ">
    <Sidebar/>
    <section class=" md:scroll-ml-60 h-full pt-20 px-14 dark:border-gray-600 dark:bg-gray-900 md:container md:mx-auto sm:container ">
      <slot/>
    </section>
  </section>
  <footer-dasborad/>
</template>

<style scoped>
.fondo{
    background-color: #ffffff;
    opacity: 1;
    background-image:  linear-gradient(#f9f9f9 1.1px, transparent 1.1px), linear-gradient(to right, #f9f9f9 1.1px, #ffffff 1.1px);
    background-size: 22px 22px;
}
</style>