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
                {
                    "id": 16,
                    "nombre": "Etapa principal",
                    "activo": 1,
                    "fkProceso": {
                        "fkequipo": 9
                    },
                    "duracion": "1 00:00:00",
                    "created_at": "2024-09-27",
                    "createdTime_at": "12:17:20",
                    "updated_at": "2024-10-06T22:43:50.236981Z",
                    "proceso": 0
                },
                {
                    "id": 17,
                    "nombre": "Etapa de prueba",
                    "activo": 1,
                    "fkProceso": {
                        "fkequipo": 10
                    },
                    "duracion": "00:30:00",
                    "created_at": "2024-11-11",
                    "createdTime_at": "12:01:46",
                    "updated_at": "2024-11-11T18:01:46.017030Z",
                    "proceso": 0
                }
            ]
        }
    }
)