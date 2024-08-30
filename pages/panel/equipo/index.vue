<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEquipo } from '~/composables/useEquipo'

const { fetchEquipos } = useEquipo()

const equipos = ref([])
const page = ref(1)
const rowsPerPage = ref(5)

onMounted(async () => {
    try {
        const data = await fetchEquipos()
        equipos.value = data.results
    } catch (e) {
        console.error('Error al obtener los datos:', e.message)
    }
})

const rows = computed(() => {
    const start = (page.value - 1) * rowsPerPage.value
    const end = start + rowsPerPage.value
    return equipos.value.slice(start, end)
})

const pageCount = computed(() => {
    return Math.ceil(equipos.value.length / rowsPerPage.value)
})

function handleAction(row) {
    console.log('Acción en:', row)
    // Aquí puedes agregar la lógica que deseas ejecutar al hacer clic en el botón
}
</script>

<template>
    <div class="section-card">
        <UTable
            :rows="rows"
            :columns="[
        { label: 'Nombre', key: 'nombre' },
        { label: 'Descripción', key: 'descripcion' },
        { label: 'Planta', key: 'fkplanta_nombre' },
        { label: 'Producto', key: 'fkproducto_nombre' },
        { label: 'Acciones', key: 'actions' }
      ]"
        >
            <template #row="{ row, column }">
                <template v-if="column.key === 'actions'">
                    <button @click="handleAction(row)" class="btn btn-primary">
                        Acción
                    </button>
                </template>
                <template v-else>
                    {{ row[column.key] }}
                </template>
            </template>
        </UTable>

        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" />
        </div>
    </div>
</template>
