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
                {
                    "id": 21,
                    "fkseccionEquipo_nombre": "Sonda multiparametrica",
                    "fksensor_nombre": "Temperatura1",
                    "fkseccionEquipo": 22,
                    "fksensor": 5
                },
                {
                    "id": 22,
                    "fkseccionEquipo_nombre": "Sonda multiparametrica",
                    "fksensor_nombre": "Ph",
                    "fkseccionEquipo": 22,
                    "fksensor": 10
                }
            ]
        }
    }
)