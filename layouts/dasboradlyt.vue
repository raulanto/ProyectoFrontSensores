<script lang="ts" setup>

</script>

<template>
  <section class="antialiased fondo  min-h-screen  bg-cover bg-bottom ">
    <Sidebar/>
    <section class=" md:scroll-ml-60 h-full pt-20 px-14   md:container md:mx-auto sm:container ">
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


.fondodark{
    background-color: #0f172a;
    opacity: 1;
    background-image:  linear-gradient(#242424 1.3px, transparent 1.3px), linear-gradient(to right, #242424 1.3px, #0f172a 1.3px);
    background-size: 26px 26px;
}
</style>