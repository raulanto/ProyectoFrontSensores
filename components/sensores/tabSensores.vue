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
    <sectionchart-gaugue :etapa="props.idetapa" :valor-min="0" :valor-max="14" :fk="20" :name="'Oxigeno'"/>
    <UDivider />
    <sectionchart-gaugue :etapa="props.idetapa" :valor-min="-30" :valor-max="30" :fk="21" :name="'Temperatura'"/>
    <UDivider />
    <sectionchart-gaugue :etapa="props.idetapa" :valor-min="0" :valor-max="14" :fk="22" :name="'ph'"/>

    <UTabs :items="items" class="w-full">
        <template #item="{ item }">


            <div v-if="item.key === 4" class="space-y-3">
                <div class="grid grid-cols-6 grid-rows-5 gap-4">
                    <div class="col-span-4">
                        <section class="section-card">
                            Sensor de {{item.label}}
                        </section>
                    </div>
                    <div class="col-span-2 row-span-5 col-start-5">
                        <viewp-h :etapa="item.etapa" :y2="0" :y="60" :fk="20" :name="item.label"/>
                    </div>
                    <div class="col-span-4 row-span-4 row-start-2">
                        <view-area :etapa="item.etapa" :y2="0" :y="60" :fk="20" :name="item.label"/>
                    </div>
                </div>
            </div>
            <div v-else-if="item.key === 5" class="space-y-3">
                    <div class="grid grid-cols-6 grid-rows-5 gap-4">
                        <div class="col-span-4">
                            <section class="section-card">
                                Sensor de {{item.label}}
                            </section>
                        </div>
                        <div class="col-span-2 row-span-5 col-start-5">
                            <viewp-h :etapa="item.etapa" :y2="0" :y="14" :fk="21" :name="item.label"/>
                        </div>
                        <div class="col-span-4 row-span-4 row-start-2">
                            <view-area :etapa="item.etapa" :y2="0" :y="14" :fk="21" :name="item.label"/>
                        </div>
                    </div>




            </div>
            <div v-else-if="item.key === 10" class="space-y-3">
                <div class="grid grid-cols-6 grid-rows-5 gap-4">
                    <div class="col-span-4">
                        <section class="section-card">
                            Sensor de {{item.label}}
                        </section>
                    </div>
                    <div class="col-span-2 row-span-5 col-start-5">
                        <viewp-h :etapa="item.etapa" :y2="0" :y="100" :fk="22" :name="item.label"/>
                    </div>
                    <div class="col-span-4 row-span-4 row-start-2">
                        <view-area :etapa="item.etapa" :y2="0" :y="100" :fk="22" :name="item.label"/>
                    </div>
                </div>
            </div>

        </template>
    </UTabs>


</template>

<style scoped>
</style>
