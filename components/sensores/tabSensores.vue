<script lang="ts" setup>
import {useseccionSensor} from '~/composables/useseccionSensor'
import {onBeforeMount, onMounted, ref} from "vue";

const props = defineProps({
  fkseccionEquipo: {
    type: Number,
    required: true
  }
})

const seccionEquipoSensor = ref([])
const {fetchseccionSensor} = useseccionSensor()

onMounted(async () => {
  try {
    const data = await fetchseccionSensor(props.fkseccionEquipo)
    seccionEquipoSensor.value = data.results
  } catch (e) {
    console.error('Error al obtener los datos:', e.message)
  }
})
onBeforeMount(async () => {
  try {
    const data = await fetchseccionSensor(props.fkseccionEquipo)
    seccionEquipoSensor.value = data.results
  } catch (e) {
    console.error('Error al obtener los datos:', e.message)
  }
})


</script>

<template>
  <pre>
    {{ seccionEquipoSensor }}
  </pre>
</template>

<style scoped>

</style>