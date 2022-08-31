import { ServiceBase } from "./core/service-base";
import { Authentication } from "./implements/implement-api";
import { LoginParams } from "./params-type.ts";

export class AuthServices extends ServiceBase implements Authentication {
    constructor() {
        super(false)
    }
    login = async (params: LoginParams) => {
        return await this.post(`/admin/login`, params);
    };
}