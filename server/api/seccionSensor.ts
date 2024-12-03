export default defineEventHandler(
    (event) => {
        return {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 20,
                    "fkseccionEquipo_nombre": "Sonda multiparametrica",
                    "fksensor_nombre": "Oxigeno",
                    "fkseccionEquipo": 22,
                    "fksensor": 4
                },
            ]
        }
    }
)