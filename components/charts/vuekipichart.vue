<!--vueiki-->

<script setup>
import {computed, defineProps, ref, watch} from "vue";
import {VueUiKpi} from "vue-data-ui";
import "vue-data-ui/style.css";

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
});

// Ref para almacenar el valor actual del KPI
const currentValue = ref(props.valor);

const config = computed(() => {
    return {
        "animationFrames": 60,
        "backgroundColor": "#FFFFFF",
        "fontFamily": "inherit",
        "layoutClass": "p-4 m-4 rounded-md shadow",
        "layoutCss": "",
        "prefix": "",
        "suffix": "",
        "title": props.name,
        "titleBold": true,
        "titleColor": "#1A1A1A",
        "titleClass": "",
        "titleCss": "",
        "titleFontSize": 16,
        "useAnimation": true,
        "valueBold": true,
        "valueColor": "#6376DD",
        "valueClass": "",
        "valueCss": "",
        "valueFontSize": 32,
        "valueRounding": 0
    }
});


watch(() => props, (newProps) => {
    // Puedes agregar lógica aquí si necesitas realizar alguna acción cuando las props cambien
    console.log(props.valor,"nuevo valor")
    currentValue.value=newProps.valor
}, { deep: true });


// Dataset calculado basado en el valor actual
const dataset = ref(
    currentValue.value
);

</script>

<template>
    <div style="width:250px">
        <ClientOnly>
            <VueUiKpi :config="config" :dataset="dataset"/>
        </ClientOnly>
    </div>
</template>