import { appInfo } from "../constants/appInfos"
import axiosClient from "./axiosClient"

class AuthAPI {
    HandleAuthentication = async (url, data, method = 'get'|'pos'|'put'|'delete') => {
        return await axiosClient(`${appInfo.BASE_URL}/users${url}`,{
            method: method ?? 'get',
            data, 
        })
    }
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;