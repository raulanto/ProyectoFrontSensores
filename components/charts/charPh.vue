<script setup>
import { computed, defineProps, ref, watch } from "vue";
import { VueUiThermometer } from "vue-data-ui";
import "vue-data-ui/style.css";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    valorMax: {
        type: Number,
        required: true
    },
    valorMin: {
        type: Number,
        required: true
    },
    valoresArray: {
        type: Array,
        required: true
    },
});

const currentValue = ref(""); // Define a reactive value for the thermometer

const config = computed(() => ({
    "style": {
        "chart": {
            "backgroundColor": "#FFFFFF",
            "color": "#1A1A1A",
            "height": 360,
            "thermometer": {
                "width": 48
            },
            "animation": {
                "use": true,
                "speedMs": 1000
            },
            "padding": {
                "top": 12,
                "right": 64,
                "bottom": 12,
                "left": 64
            },
            "graduations": {
                "show": true,
                "sides": "both",
                "stroke": "#e1e5e8",
                "strokeWidth": 1,
                "showIntermediate": true,
                "gradient": {
                    "show": true,
                    "intensity": 20
                }
            },
            "label": {
                "color": "#1A1A1A",
                "fontSize": 20,
                "bold": true,
                "rounding": 1,
                "prefix": "",
                "suffix": ""
            }
        },
        "title": {
            "text": props.name,
            "color": "#1A1A1A",
            "fontSize": 20,
            "bold": true,
            "subtitle": {
                "text": "",
                "color": "#A1A1A1",
                "fontSize": 16,
                "bold": true
            }
        }
    },
    "userOptions": {
        "show": true
    }
}));

const dataset = computed(() => ({
    "value": currentValue.value, // Bind the value to the reactive currentValue
    "from": 0,
    "to": props.valorMax,
    "steps": 20,
    "colors": {
        "from": "#ff6400",
        "to": "#5f8bee"
    }
}));

console.log(currentValue)
// Watcher to update currentValue when valoresArray changes
watch(() => props.valoresArray, (newVal) => {
    if (newVal && newVal.length > 0) {
        currentValue.value = newVal[newVal.length - 1]; // Set the last fetched value
    }
}, { immediate: true });

</script>

<template>
    <div style="width:200px">
        <ClientOnly>
            <VueUiThermometer :config="config" :dataset="dataset" />
        </ClientOnly>
    </div>
</template>
