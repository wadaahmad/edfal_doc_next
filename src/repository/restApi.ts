import { getSession } from "next-auth/react"
import formRepo from './formRepo'
interface requestOption {
    method: string,
    url: string,
    data: object,
}
var token = ''
const baseUrl = process.env.NEXT_PUBLIC_EDFAL_API_URL
async function getToken() {
    await getSession().then((res) => {
        if (res)
            if (res.token)
                token = res.token.token_type + ' ' + res.token.access_token
    })
}
function objectToQuery(obj?: Object) {
    if (obj) {
        const queries = Object.keys(obj).map((key) =>
            key + '=' + obj[key as keyof typeof obj]
        );
        return "?" + queries.join('&');
    }
    return ''
}

async function $get(url: string, query?: Object) {
    await getToken()
    const getData = await fetch(baseUrl + url + objectToQuery(query), {
        method: 'GET',
        headers: { "Authorization": token }
    })
    return await getData.json()
}
async function $post(url: string, body?: Object, is_multipart: boolean = false) {
    await getToken()
    const getData = await fetch(baseUrl + url, {
        method: 'POST',
        body: is_multipart ? formRepo.objectToFormData(body) : JSON.stringify(body),
        headers: {
            "Authorization": token,
            "Content-Type": is_multipart ? "multipart/form-data" : "application/json"
        }
    })
    return await getData.json()
}
async function $put(url: string, body?: Object, is_multipart: boolean = false) {
    await getToken()
    const getData = await fetch(baseUrl + url, {
        method: 'PUT',
        body: is_multipart ? formRepo.objectToFormData(body) : JSON.stringify(body),
        headers: {
            "Authorization": token,
            "Content-Type": is_multipart ? "multipart/form-data" : "application/json"
        }
    })
    return await getData.json()
}
async function $delete(url: string, body?: Object) {
    await getToken()
    const getData = await fetch(baseUrl + url, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    })
    return await getData.json()
}
async function $request(options: requestOption) {
    await getToken()
    const getData = await fetch(baseUrl + options.url, {
        method: options.method,
        body: JSON.stringify(options.data),
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    })
    return await getData.json()
}
export default { $get, $post, $put, $delete, $request }