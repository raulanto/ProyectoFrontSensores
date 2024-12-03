export default defineEventHandler(
    (event) => {
        return {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 15,
                    "nombre": "Etapa",
                    "activo": 1,
                    "fkProceso": {
                        "fkequipo": 8
                    },
                    "duracion": "1 00:00:00",
                    "created_at": "2024-09-24",
                    "createdTime_at": "18:28:01",
                    "updated_at": "2024-09-25T00:28:01.980756Z",
                    "proceso": 0
                },

            ]
        }
    }
)