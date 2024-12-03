
export default defineEventHandler(
    (event) => {
        return {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 8,
                    "nombre": "TOTEM 1",
                    "descripcion": "Equipo para depurar ostiones",
                    "fkplanta_nombre": "Coperatica",
                    "fkproducto_nombre": "Ostiones",
                    "usuario": 5
                }
            ]
        }
    }
)