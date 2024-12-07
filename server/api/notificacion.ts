export default defineEventHandler(
    (event) => {
        return {
            "count": 5,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 2,
                    "user": 5,
                    "message": "error",
                    "notification_type": "warning",
                    "created_at": "2024-09-19",
                    "is_read": true,
                    "tittle": "Esto es un problema"
                },
                {
                    "id": 3,
                    "user": 5,
                    "message": "Creado proceso",
                    "notification_type": "success",
                    "created_at": "2024-09-19",
                    "is_read": true,
                    "tittle": "Proceso  Creado exitosamente"
                },
                {
                    "id": 4,
                    "user": 5,
                    "message": "Etapa Creada",
                    "notification_type": "success",
                    "created_at": "2024-09-19",
                    "is_read": true,
                    "tittle": "Etapa  Creado exitosamente"
                },
                {
                    "id": 5,
                    "user": 5,
                    "message": "Etapa Creada",
                    "notification_type": "success",
                    "created_at": "2024-09-19",
                    "is_read": false,
                    "tittle": "Etapa  Creado exitosamente"
                },
                {
                    "id": 1,
                    "user": 5,
                    "message": "Alerta",
                    "notification_type": "info",
                    "created_at": "2024-09-15",
                    "is_read": true,
                    "tittle": "El valor de la sonda no es proporcionar los parametros del producto"
                }
            ]
        }
    }
)