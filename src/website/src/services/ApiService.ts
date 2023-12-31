import {
  AddHeaderInterceptor,
  HttpClient,
  HttpResponse,
} from '@miracledevs/paradigm-web-fetch';
import { QueryString } from '@miracledevs/paradigm-web-fetch';
import { environment } from './environment';
export class ApiService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
    this.httpClient.registerInterceptor(
      new AddHeaderInterceptor('content-type', 'application/json')
    );
  }

  authorize(token: string): void {
    this.httpClient.registerInterceptor(
      new AddHeaderInterceptor('x-auth', token)
    );
  }

  async get<T>(url?: string, queryString?: QueryString): Promise<T> {
    const response = await this.httpClient.get(
      `${this.baseUrl}/${url}`,
      queryString
    );
    return (await response.json()) as T;
  }

  async getById<T>(id: string, endpoint?: string): Promise<T> {
    const response = await this.httpClient.get(
      `${this.baseUrl}/${endpoint}/${id}`
    );
    return (await response.json()) as T;
  }

  async post(
    url?: string,
    queryString?: QueryString,
    body?: BodyInit
  ): Promise<HttpResponse> {
    const response = await this.httpClient.post(
      `${this.baseUrl}/${url}`,
      queryString,
      body
    );
    return response as HttpResponse;
  }

  async put(
    url?: string,
    queryString?: QueryString,
    body?: BodyInit
  ): Promise<HttpResponse> {
    const response = await this.httpClient.put(
      `${this.baseUrl}/${url}`,
      queryString,
      body
    );
    return response as HttpResponse;
  }

  protected async patch<T>(
    url?: string,
    queryString?: QueryString,
    body?: BodyInit
  ): Promise<T> {
    const response = await this.httpClient.patch(
      `${this.baseUrl}/${url}`,
      queryString,
      body
    );
    return (await response.json()) as T;
  }

  async delete(
    url?: string,
    queryString?: QueryString,
    body?: BodyInit | undefined
  ): Promise<HttpResponse> {
    const response = await this.httpClient.delete(
      `${this.baseUrl}/${url}`,
      queryString,
      body
    );
    return response as HttpResponse;
  }
}

export const apiServiceInstance = new ApiService();
