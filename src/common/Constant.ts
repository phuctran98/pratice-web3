export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: "/",
    STAKING: "/staking",
    AIRDROP: "/airdrop",
    STAKING_CREATE: "/staking-create",
    AIRDROP_CREATE: "/airdrop-create",
    STAKING_DETAIL: "/staking-detail/:id",
    AIRDROP_DETAIL: "/airdrop-detail/:id",
    KYC_USER: "/kyc-user",
}
export const BUTTON_NAME = {
    CONNECT: "Connect",
    SIGN: "Sign",
};
export const LOGIN_STATUS = {
    METAMASK_UNAVAILABLE: "METAMASK_UNAVAILABLE",
    LOGGED_IN: "LOGGED_IN",
    NOT_ADMIN: "NOT_ADMIN",
    NOT_LOGGED_IN: "NOT_LOGGED_IN",
    CLOSE_CONNECT_METAMASK: "CLOSE_CONNECT_METAMASK",
    SIGN: "SIGN",
};
export const KEY = {
    USER: "USER",
    TOKEN_ACCESS: "TOKEN_ACCESS",
    SIGNATURE: "SIGNATURE",
}
export const NETWORK = {
    CHAIN_ID_HEX: process.env.REACT_APP_CHAIN_ID_HEX,
    CHAIN_ID_DECIMAL: process.env.REACT_APP_CHAIN_ID_DECIMAL,
    CHAIN_NAME: process.env.REACT_APP_CHAIN_NAME,
    RPC_URLS: process.env.REACT_APP_RPC_URLS,
    BLOCK_EXPLORER_URLS: process.env.REACT_APP_BLOCK_EXPLORER_URLS,
    NATIVE_CURRENCY: {
        NAME: process.env.REACT_APP_NATIVE_CURRENCY_NAME,
        SYMBOL: process.env.REACT_APP_NATIVE_CURRENCY_SYMBOL,
        DECIMAL: process.env.REACT_APP_NATIVE_CURRENCY_DECIMAL,
    },
}