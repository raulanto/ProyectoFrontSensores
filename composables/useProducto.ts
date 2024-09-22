import { useFetch } from '#app'
import { useAuthStore } from '~/stores/auth'


export function useProducto(){
    const authStore = useAuthStore()
    // @ts-ignore
    const iduser=authStore.user.id
    async function fetchProducto() {
        const { data, error } = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/producto/?usuario=${iduser}`, {
            headers: {
                Authorization: `Token ${authStore.token}`
            }
        })
        if (error.value) {
            throw new Error('Error al consumir la API')
        }

        return data.value
    }

    async function postProducto(producto) {
        const authStore = useAuthStore();  // Assuming you're using a store for authentication
        const { data, error } = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/producto/registro/`, {
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
        const { data, error } = await useFetch(`https://apis-production-9a03.up.railway.app/api/v1/valoresproducto/?producto=${idproducto}`, {
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