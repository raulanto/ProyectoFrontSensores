<script setup>
import {computed, defineProps, ref, watch} from "vue";
import { VueUiGauge } from "vue-data-ui";
import "vue-data-ui/style.css"

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    valoresArray: {
        type: Array,
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
    valorPas: {
        type: Number,
        required: true
    },
});
const currentValue = ref(""); // Define a reactive value for the thermometer

const config = computed(() => {
    return {
        "style": {
            "fontFamily": "inherit",
            "chart": {
                "backgroundColor": "#FFFFFF",
                "color": "#000000",
                "animation": {
                    "use": false,
                    "speed": 1,
                    "acceleration": 1
                },
                "layout": {
                    "track": {
                        "size": 1,
                        "useGradient": true,
                        "gradientIntensity": "15"
                    },
                    "markers": {
                        "color": "#1A1A1A",
                        "bold": true,
                        "fontSizeRatio": 1,
                        "offsetY": 0,
                        "roundingValue": 0
                    },
                    "pointer": {
                        "type": "pointy",
                        "size": 1,
                        "stroke": "#1A1A1A",
                        "strokeWidth": 12,
                        "useRatingColor": true,
                        "color": "#CCCCCC",
                        "circle": {
                            "radius": 10,
                            "stroke": "#1A1A1A",
                            "strokeWidth": 2,
                            "color": "#FFFFFF"
                        }
                    }
                },
                "legend": {
                    "fontSize": 48,
                    "prefix": "",
                    "suffix": "",
                    "showPlusSymbol": true,
                    "useRatingColor": true,
                    "color": "#1A1A1A",
                    "roundingValue": 1
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
                        "bold": false
                    }
                }
            }
        },
        "userOptions": {
            "show": true,
            "buttons": {
                "pdf": true,
                "img": true,
                "fullscreen": true
            },
            "buttonTitles": {
                "open": "Open options",
                "close": "Close options",
                "pdf": "Download PDF",
                "img": "Download PNG",
                "fullscreen": "Toggle fullscreen"
            }
        }
    }
})


const dataset = computed(() => {
    return {
        "series": [
            {
                "from": 0,
                "to": props.valorMin,
                "color": "#ffcf00",
                "id": "111"
            },
            {
                "from": props.valorMin,
                "to": props.valorMax,
                "color": "#42d392",
                "id": "222"
            },
            {
                "from": props.valorMax,
                "to": props.valorPas,
                "color": "#ff0000",
                "id": "9cb0373d-d245-4116-bc59-1932a06a7632"
            }
        ],
        "value": currentValue.value
    }
})
watch(() => props.valoresArray, (newVal) => {
    if (newVal && newVal.length > 0) {
        currentValue.value = newVal[newVal.length - 1]; // Set the last fetched value
    }
}, { immediate: true });

</script>

<template>
    <div style="width:500px">
        <ClientOnly>
            <VueUiGauge :config="config" :dataset="dataset" />
        </ClientOnly>
    </div>
</template>

