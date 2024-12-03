export default defineEventHandler(
    (event) => {
        return {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 27,
                    "nombre": "Proceso de lectura",
                    "descripcion": "recolección de datos",
                    "usuario": 5,
                    "fkequipo": 8
                },
            ]
        }
    }
)