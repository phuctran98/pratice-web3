import { KEY } from "../common/Constant"

export default class StorageUtils {
    static setSectionStorageItem(key: string, value: string) {
        window.sessionStorage.setItem(key, value)
    }
    static getSectionStorageItem(key: string) {
        return window.sessionStorage.getItem(key)
    }
    static removeSectionStorageItem(key: string) {
        window.sessionStorage.removeItem(key)
    }
    static setUser(value: any) {
        this.setSectionStorageItem(KEY.USER, JSON.stringify(value))
    }
    static getUser() {
        const user = this.getSectionStorageItem(KEY.USER) as string
        return JSON.parse(user)
    }
    static removeUser() {
        this.removeSectionStorageItem(KEY.USER);
    }
    static setToken(value: any) {
        StorageUtils.setSectionStorageItem(KEY.TOKEN_ACCESS, value);
    }
    static getToken() {
        return StorageUtils.getSectionStorageItem(KEY.TOKEN_ACCESS);
    }

    static removeToken() {
        StorageUtils.removeSectionStorageItem(KEY.TOKEN_ACCESS);
    }

    static setSignature(value = "") {
        StorageUtils.setSectionStorageItem(KEY.SIGNATURE, value);
    }

    static getSignature() {
        return StorageUtils.getSectionStorageItem(KEY.SIGNATURE);
    }

    static removeSignature() {
        StorageUtils.removeSectionStorageItem(KEY.SIGNATURE);
    }
}