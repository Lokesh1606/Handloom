import { environment } from '../../environments/environment';

export class ApiConfig {
    public static readonly baseUrl = environment.apiBaseUrl;
    public static readonly login = ApiConfig.baseUrl + 'login';
    public static readonly signup = ApiConfig.baseUrl + 'signup';
}