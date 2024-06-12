import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class Request {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.request<T>({
        ...config,
        baseURL: this.baseUrl,
      });
      return response.data;
    } catch (error) {
      // 处理错误
      throw error;
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, url, data, method: 'POST' });
  }

  // 添加其他请求方法，如 PUT、DELETE 等

}

export default Request;

// import Api from './api';

// const api = new Api('https://api.example.com');

// // 发送 GET 请求
// api.get<{ name: string }>('/user/1')
//   .then(response => {
//     console.log(response.name);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // 发送 POST 请求
// api.post<{ id: number }>('/user', { name: 'John' })
//   .then(response => {
//     console.log(response.id);
//   })
//   .catch(error => {
//     console.error(error);
//   });
