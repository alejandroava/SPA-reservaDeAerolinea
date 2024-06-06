export async function FetchApi(url,options) {
    try {
        const res = await fetch(url, options)
        return res.json()
    } catch (error) {
        alert('Ocurrio un error con la data', error)
    }
}