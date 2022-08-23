import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

let customStore: Store | undefined;

export const setStoreStaking = (store: Store) => {
  customStore = store;
};

const initialState = {
  tokenSymbol :'token symbol'
}

const storeStaking = createSlice({
  name: 'storeStaking',
  initialState,
  reducers: {
    setTokenSymbol: (state, action: PayloadAction<any>) =>({
      ...state,
      tokenSymbol : action.payload
    })
  }
});

export const setTokenSymbol = (tokenSymbol : string) =>{
  customStore && customStore.dispatch(storeStaking.actions.setTokenSymbol(tokenSymbol));
}

export { storeStaking };