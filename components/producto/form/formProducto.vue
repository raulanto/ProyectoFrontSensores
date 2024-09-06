
<script setup>
import {ref, reactive} from 'vue'
import RadiarChart from "~/components/charts/radiarChart.vue";

const newLabel = ref('')
const stats = reactive([
    {label: 'ph', value: 4},
    {label: 'Temperatura', value: 4},
    {label: 'Oxgeno Disuelto', value: 4},

])

function add(e) {
    e.preventDefault()
    if (!newLabel.value) return
    stats.push({
        label: newLabel.value,
        value: 100
    })
    newLabel.value = ''
}

function remove(stat) {
    if (stats.length > 3) {
        stats.splice(stats.indexOf(stat), 1)
    } else {
        alert("Can't delete more!")
    }
}

</script>

<template>


    <div class="grid grid-cols-3 grid-rows-5 gap-4">
        <div>
            <div v-for="stat in stats" >
                <label>{{ stat.label }}</label>
                <URange v-model="stat.value" min="0" max="100"/>
                <span>{{ stat.value }}</span>
                <UInput type="number" v-model="stat.value" />
                <UButton @click="remove(stat)" class="remove">x</UButton>
            </div>

            <form id="add" class="flex gap-3">
                <UInput name="newlabel" color="primary" variant="outline" placeholder="Agregar..." v-model="newLabel"/>
                <UButton @click="add">Agregar</UButton>
            </form>
        </div>
        <div class="col-span-2 row-span-2">
            <radiar-chart/>
        </div>
        <div class="row-start-2">
            <UInput type="file" size="sm" icon="i-heroicons-folder"/>
        </div>
    </div>


</template>

<style>


</style>