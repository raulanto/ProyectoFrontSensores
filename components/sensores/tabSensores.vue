<script lang="ts" setup>
import {useseccionSensor} from '~/composables/useseccionSensor'
import {onMounted, ref} from "vue";
import ViewArea from "~/components/charts/viewArea.vue";
import ViewpH from "~/components/charts/viewpH.vue";

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
        const data = await fetchseccionSensor(props.fkseccionEquipo)
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
        const data = await fetchseccionSensor(props.fkseccionEquipo)
        seccionEquipoSensor.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})
// {
//     "id": 1,
//     "fkseccionEquipo_nombre": "Sonda multiparametrica",
//     "fksensor_nombre": "temperatura",
//     "fkseccionEquipo": 1,
//     "fksensor": 1
// },

// const items = [{
//     key: 'account',
//     label: 'Account',
//     description: 'Make changes to your account here. Click save when you\'re done.'
// }, {
//     key: 'password',
//     label: 'Password',
//     description: 'Change your password here. After saving, you\'ll be logged out.'
// }]

</script>

<template>
  <pre>
    {{ items }}
  </pre>
    <UTabs :items="items" class="w-full">
        <template #item="{ item }">


            <div v-if="item.key === 1" class="space-y-3">
                <div class="grid grid-cols-6 grid-rows-5 gap-4">
                    <div class="col-span-4">
                        <section class="section-card">
                            Sensor de {{item.label}}
                        </section>
                    </div>
                    <div class="col-span-2 row-span-5 col-start-5">
                        <viewp-h :etapa="item.etapa" :y2="0" :y="14" :fk="item.key" :name="item.label"/>
                    </div>
                    <div class="col-span-4 row-span-4 row-start-2">
                        <view-area :etapa="item.etapa" :y2="0" :y="14" :fk="item.key" :name="item.label"/>
                    </div>
                </div>
            </div>
            <div v-else-if="item.key === 2" class="space-y-3">
                    <div class="grid grid-cols-6 grid-rows-5 gap-4">
                        <div class="col-span-4">
                            <section class="section-card">
                                Sensor de {{item.label}}
                            </section>
                        </div>
                        <div class="col-span-2 row-span-5 col-start-5">
                            <viewp-h :etapa="item.etapa" :y2="0" :y="14" :fk="item.key" :name="item.label"/>
                        </div>
                        <div class="col-span-4 row-span-4 row-start-2">
                            <view-area :etapa="item.etapa" :y2="0" :y="14" :fk="item.key" :name="item.label"/>
                        </div>
                    </div>
            </div>
            <div v-else-if="item.key === 3" class="space-y-3">
                {{item.label}}
            </div>

        </template>
    </UTabs>


</template>

<style scoped>
</style>
