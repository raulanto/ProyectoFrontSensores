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
                {
                    "id": 28,
                    "nombre": "Proceso",
                    "descripcion": "proceso de lectura",
                    "usuario": 5,
                    "fkequipo": 9
                },
                {
                    "id": 29,
                    "nombre": "Proceso de prueba",
                    "descripcion": "estados de  prueba",
                    "usuario": 4,
                    "fkequipo": 10
                }
            ]
        }
    }
)