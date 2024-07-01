import { ElLoading } from 'element-plus'
const fetch = (url: string, options?: any): Promise<any>  => {
    const token = useCookie("set-cookie");
    const headers = { // headers信息
        'Authorization' : `Bearer ${token.value}`
    }

    let baseUrl = ''
    if(process.server){
        baseUrl =  'https://ylwj.ydlweb.com'
    }
    else{
        baseUrl = 'https://ylwj.ydlweb.com'
    }
    // let baseUrl = 'https://ylwj.ydlweb.com'
    let httpStr = location.origin
    if(httpStr.indexOf('https://www') != -1){
        // baseUrl = 'https://www.efuntoys.cn'
        // baseUrl = 'https://ylwj.ydlweb.com'
    }
    else if(httpStr.indexOf('http://www') != -1){
        // baseUrl = 'http://www.efuntoys.cn'
    }
    else if(httpStr.indexOf('https://hemayy') != -1){
        // baseUrl = 'https://efuntoys.cn'
    }
    else{
        // baseUrl = 'http://efuntoys.cn'
    }
    // const baseUrl = 'https://www.efuntoys.cn'
    const customHeaders = { 'Sec-Fetch-Mode': 'cors','Sec-Fetch-Site':'same-origin' }
    // const { public: { baseUrl } } = useRuntimeConfig()
    const reqUrl = baseUrl + url
 

    return new Promise((resolve, reject) => {
        useLazyFetch(reqUrl, { ...options, headers:customHeaders }).then(( {data} : any) => {
            const value = JSON.parse(data._rawValue)
            resolve(value)

            // if (!JSON.parse(data._rawValue)) {
            //     // 这里处理错误回调
            //     reject(value)
            // }else if(JSON.parse(data._rawValue).status != 0){

            //     console.log("！=0");
                
            // } else {
            //     console.log('40data', data._rawValue)
            //     resolve(ref(data))
            // }
        }).catch((err: any) => {
            reject(err)
        })
    })
}
 
export default new class Http {
 
    get(url: string, params?: any): Promise<any> {
        return fetch(url, { method: 'get', params })
    }
 
    post(url: string, params?: any): Promise<any>  {
        return fetch(url, { method: 'post', params })
    }
    posts(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'post', body })
    }
 
    put(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'put', body })
    }
 
    delete(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'delete', body })
    }
}