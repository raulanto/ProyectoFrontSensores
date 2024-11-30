
export default defineEventHandler(
    (event) => {
        return {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 8,
                    "nombre": "TOTEM 1 tilapia",
                    "descripcion": "equipo que contiene los seres vivos",
                    "fkplanta_nombre": "Planta los 2 hemanos",
                    "fkproducto_nombre": "Ostiones",
                    "usuario": 5
                },
                {
                    "id": 9,
                    "nombre": "motor",
                    "descripcion": "actulizacion",
                    "fkplanta_nombre": "Planta los 2 hemanos",
                    "fkproducto_nombre": "Ostiones",
                    "usuario": 5
                },
                {
                    "id": 10,
                    "nombre": "Depuradora",
                    "descripcion": "",
                    "fkplanta_nombre": "Planta 1",
                    "fkproducto_nombre": "Ostiones",
                    "usuario": 4
                }
            ]
        }
    }
)