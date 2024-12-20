import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../../models/pagination";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";


const sleep=()=>new Promise(resolve=>setTimeout(resolve,500));
axios.defaults.baseURL='http://localhost:5000/api/';
axios.defaults.withCredentials=true;

const responseBody=(res:AxiosResponse)=>res.data;

axios.interceptors.request.use((config:any)=>{
    const token=store.getState().account.user?.token;
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
},(error:AxiosError)=>{
    return Promise.reject(error);
});

axios.interceptors.response.use(async (res:any)=>{
    await sleep();
    const pagination=res.headers['pagination'];
    if(pagination){
        res.data=new PaginatedResponse(res.data,JSON.parse(pagination));
        return res;
    }
    return res
},(error:AxiosError)=>{
    const {data,status}= error.response as AxiosResponse;
    switch(status){
        case 400:
            if(data.errors){
                const modelStateError:string[]=[];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateError.push(data.errors[key]);
                    }
                }
                throw modelStateError.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error',{state:{error:data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.message);
})

const requests={
    get:(url:string,params?:URLSearchParams)=>axios.get(url,{params}).then(responseBody),
    post:(url:string,body:object)=>axios.post(url,body).then(responseBody),
    put:(url:string,body:object)=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
}
const Catalog={
    list: (params: URLSearchParams) => requests.get('Products',params),
    details:(id:number)=>requests.get(`products/${id}`),
    fetchFilters:()=>requests.get('Products/filters')
}

const TestErrors={
    get400Error:()=>requests.get('Buggy/bad-request'),
    get401Error:()=>requests.get('Buggy/unauthorised'),
    get404Error:()=>requests.get('Buggy/not-found'),
    get500Error:()=>requests.get('Buggy/server-error'),
    getValidationError:()=>requests.get('Buggy/validation-error')
}
const Basket={
    get:()=>requests.get('basket'),
    addItem:(productId:number,quantity=1)=>requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number,quantity=1)=>requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}
const Account={
    login:(values:any)=>requests.post('Account/login',values),
    register:(values:any)=>requests.post('Account/register',values),
    currentUser:()=>requests.post('Account/currentUser', {})
}

const agents={
    Catalog,
    TestErrors,
    Basket,
    Account
}
export default agents;