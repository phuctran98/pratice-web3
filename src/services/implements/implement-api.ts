import { LoginParams } from "../params-type.ts";

export interface Authentication {
    login: (params: LoginParams) => {};
}