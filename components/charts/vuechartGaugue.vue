
<script setup>
import { computed } from "vue";
import { VueUiGauge } from "vue-data-ui";
import "vue-data-ui/style.css"

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
                    "text": "Title",
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
                "to": 5,
                "color": "#6376DD",
                "id": "111"
            },
            {
                "from": 5,
                "to": 10,
                "color": "#42d392",
                "id": "222"
            }
        ],
        "value": 6
    }
})

</script>

<template>
    <div style="width:600px">
        <ClientOnly>

            <VueUiGauge :config="config" :dataset="dataset" />
        </ClientOnly>
    </div>
</template>

