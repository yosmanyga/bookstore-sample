import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Secure from 'secure-ls';

class AxiosInstance {
  private readonly apiBase!: string;
  private headers!: object;

  private instance!: typeof axios;

  constructor() {
    // TODO: Improve baseURL to use environment variables
    this.apiBase = 'http://localhost:3333'
  }

  withAuthentication = () => {
    const secure = new Secure();

    const token = secure.get('token');

    if (!token) {
      throw new Error('Token not found');
    }

    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };

    return this;
  };

  get = <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    const result = (this.instance
      ? this.instance.get(url, config)
      : this.instantiate().get(url, config)) as Promise<R>;

    this.restoreHeaders();

    return result;
  }

  post = <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    const result = (this.instance
      ? this.instance.post(url, data, config)
      : this.instantiate().post(url, data, config)) as Promise<R>;

    this.restoreHeaders();

    return result;
  }


  put = <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    const result = (this.instance
      ? this.instance.put(url, data, config)
      : this.instantiate().put(url, data, config)) as Promise<R>;

    this.restoreHeaders();

    return result;
  }

  delete = <T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    const result = (this.instance
      ? this.instance.delete(url, config)
      : this.instantiate().delete(url, config)) as Promise<R>;

    this.restoreHeaders();

    return result;
  }

  private instantiate = () => {
    const instance = axios.create({
      baseURL: this.apiBase,
      headers: this.headers,
      responseType: 'json',
      // transformResponse: (response) => {
      //   if (!response) {
      //     return response;
      //   }
      //
      //   try {
      //     return JSON.parse(response);
      //   } catch (e) {
      //     console.error(e);
      //   }
      // },
    });

    instance.interceptors.response.use(
      response => response,
      error => {

        if (!error.response || !error.response.data || !error.response.data.message) {
          throw new Error("Request failed. Please try later");
        }

        throw new Error(error.response.data.message);
      }
    );

    return instance;
  };

  private restoreHeaders = () => {
    this.headers = {};
  }
}

export default new AxiosInstance();
