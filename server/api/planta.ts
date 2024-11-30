export default defineEventHandler(
    (event) => {
        return {
            "count": 2,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 10,
                    "nombre": "Planta los 2 hemanos",
                    "codigo_postal": "86560",
                    "calle": "Felipe carrilo puerto",
                    "municipio": {
                        "id": 3,
                        "nombre": "Cardenas",
                        "estado": {
                            "id": 3,
                            "nombre": "Tabasco"
                        }
                    },
                    "descripcion": "Esto es una planta de pescados",
                    "usuario": 5
                },
                {
                    "id": 11,
                    "nombre": "Planta 1",
                    "codigo_postal": "8993",
                    "calle": "calle c",
                    "municipio": {
                        "id": 4,
                        "nombre": "Paraiso",
                        "estado": {
                            "id": 3,
                            "nombre": "Tabasco"
                        }
                    },
                    "descripcion": "",
                    "usuario": 4
                }
            ]
        }
    }
)