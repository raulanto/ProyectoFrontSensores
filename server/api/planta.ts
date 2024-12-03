export default defineEventHandler(
    (event) => {
        return {
            "count": 2,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 10,
                    "nombre": "Coperativa Trasformando Mecuuocan",
                    "codigo_postal": "86560",
                    "calle": "Carretera federal,Paraiso,bellote(Miguel de la Madrid,8613),Paraiso Tabasco México",
                    "municipio": {
                        "id": 3,
                        "nombre": "Paraiso",
                        "estado": {
                            "id": 3,
                            "nombre": "Tabasco"
                        }
                    },
                    "descripcion": "Planta Mecuuocan ",
                    "usuario": 5
                },

            ]
        }
    }
)