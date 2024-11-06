<script lang="ts" setup>
import {useseccionSensor} from '~/composables/useseccionSensor'
import {onMounted, ref} from "vue";
import ViewArea from "~/components/charts/viewArea.vue";
import ViewpH from "~/components/charts/viewpH.vue";
import SectionchartGaugue from "~/components/charts/sectionchartGaugue.vue";

const props = defineProps({
    fkseccionEquipo: {
        type: Number,
        required: true
    },
    idetapa: {
        type: Number,
        required: true
    },
})

const seccionEquipoSensor = ref([])
const {fetchseccionSensor} = useseccionSensor()
const items = ref([])
onMounted(async () => {
    try {
        const data = await fetchseccionSensor(22)
        seccionEquipoSensor.value = data.results
        items.value = data.results.map((item: any) => ({
            key: item.fksensor,
            label: item.fksensor_nombre,
            etapa:props.idetapa
        }));
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

onBeforeMount(async () => {
    try {
        const data = await fetchseccionSensor(22)
        seccionEquipoSensor.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})


</script>

<template>
<!--    <secrionnueva :etapa="props.idetapa"  :fk="20" :name="'Oxigeno'"></secrionnueva>-->
    <div class="grid grid-cols-6 grid-rows-2 gap-4">
        <div class="col-span-2 row-span-2">
            <secrionnueva :etapa="props.idetapa"  :fk="20" :name="'Oxigeno'" :valor-max="15" :valor-min="10" :valor-pas="20"></secrionnueva>
        </div>
        <div class="col-span-2 row-span-2 col-start-3">
            <secrionnueva :etapa="props.idetapa"  :fk="21" :name="'Temperatura'" :valor-max="37" :valor-min="25" :valor-pas="45"></secrionnueva>
        </div>
        <div class="col-span-2 row-span-2 col-start-5">
            <secrionnueva :etapa="props.idetapa"  :fk="22" :name="'pH'" :valor-max="8" :valor-min="7" :valor-pas="10"></secrionnueva>
        </div>
    </div>

</template>

<style scoped>
</style>
