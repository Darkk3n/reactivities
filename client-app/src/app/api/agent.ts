import axios, { AxiosResponse } from "axios";
import { Activity } from './../Models/activity';

const sleep = (delay: number) =>
   new Promise(resolve => {
      setTimeout(() => resolve, delay);
   })

axios.defaults.baseURL = 'http://localhost:5000/api';

// axios.interceptors.response.use(async res => {
//    try {
//       await sleep(1000);
//       return res;
//    } catch (err) {
//       console.log(err);
//       return await Promise.reject(err);
//    }
// });

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
   get: <T>(url: string) => axios.get<T>(url).then(responseBody),
   post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
   put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
   del: <T>(url: string, body: {}) => axios.delete<T>(url, body).then(responseBody),
}

const Activities = {
   list: () => requests.get<Activity[]>('/activities'),
   details: (id: string) => requests.get<Activity>(`/activities/${id}`),
   create: (activity: Activity) => axios.post<void>('/activities', activity),
   update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
   del: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
   Activities
}

export default agent;