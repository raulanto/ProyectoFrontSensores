export default defineEventHandler(
    (event) => {
        return {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 5,
                    "nombre": "Ostiones",
                    "descripcion": "Crassostrea es un género de moluscos bivalvos de la familia Ostreidae conocidos vulgarmente como ostiones, estrechamente emparentados con las ostras. Son ampliamente aprovechados por el hombre como alimento por su alto valor nutritivo y debido a la facilidad con que se obtiene y los múltiples métodos para lograrlo, desde la captura a mano, hasta grandes cultivos ostrícolas.",
                    "usuario": 5,
                    "fotografia": "http://127.0.0.1:8000/producto/ostiones_PqmJbU7.jpg"
                },
            ]
        }
    }
)