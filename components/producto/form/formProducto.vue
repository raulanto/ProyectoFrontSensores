<!--
An SVG graph
-->

<script setup>
import PolyGraph from '~/components/producto/form/PoliGrap.vue'
import { ref, reactive } from 'vue'

const newLabel = ref('')
const stats = reactive([
    { label: 'A', value: 100 },
    { label: 'B', value: 100 },
    { label: 'C', value: 100 },

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
    <svg width="200" height="200">
        <PolyGraph :stats="stats"></PolyGraph>
    </svg>

    <!-- controls -->
    <div v-for="stat in stats">
        <label>{{stat.label}}</label>
        <input type="range" v-model="stat.value" min="0" max="100">
        <span>{{stat.value}}</span>
        <button @click="remove(stat)" class="remove">X</button>
    </div>

    <form id="add">
        <input name="newlabel" v-model="newLabel">
        <button @click="add">Add a Stat</button>
    </form>

</template>

<style >

circle {
    fill: #d7d7d7;
    stroke: #171717;
}

text {
    font-size: 10px;
    fill: #666;
}

label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
}


</style>