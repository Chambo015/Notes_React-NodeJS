export async function request(url = '/notes', method = 'GET', body = null) {
    try {
        const response = await fetch(`/api${url}`, {method, headers: {'Content-Type': 'application/json'} , body})
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
    
}