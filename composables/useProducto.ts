import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'

export function useProducto(){
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id
    const { public: { apiKey: apiUrl } } = useRuntimeConfig() // Ensure it's called within setup

    async function fetchProducto() {
        const { data, error } = await useFetch(`/api/producto/?usuario=${iduser}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })
        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }

    // @ts-ignore
    async function postProducto(producto) {
        const authStore = useAuthStore();  // Assuming you're using a store for authentication
        // @ts-ignore
        // @ts-ignore
        const { data, error } = await useFetch(`/api/producto/registro/`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${authStore.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: producto.nombre,
                descripcion: producto.descripcion || null,
                usuario: producto.usuario || null,
                fotografia:producto.fotografia,
                // @ts-ignore

                valores: producto.valores.map(valor => ({
                    nombre: valor.nombre,
                    valorMaximo: valor.valorMaximo || null,
                    valorMinimo: valor.valorMinimo || null
                }))
            })
        });

        if (error.value) {
            throw new Error('Error al crear el producto');
        }

        return data.value;
    }
    async function fetchProductoValores(idproducto:number) {
        const { data, error } = await useFetch(`/api/valoresproducto/?producto=${idproducto}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })
        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }

    return {
        fetchProducto,
        postProducto
    }

}