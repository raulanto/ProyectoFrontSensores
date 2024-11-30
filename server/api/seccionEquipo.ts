export default defineEventHandler(
    (event) => {
        return{
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 22,
                    "nombre": "Sonda multiparametrica",
                    "fkequipo_nombre": "Depuradora",
                    "descripcion": "esto es una sonda",
                    "fkequipo": 10
                }
            ]
        }
    }
)