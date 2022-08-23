import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

const initialState = {
    tokenSymbol: 'token symbol'
}
const storeAirDrop = createSlice({
    name: 'storeAirDrop',
    initialState,
    reducers: {
        setTokenSymbol: (state, action: PayloadAction<any>) => ({
            ...state,
            tokenSymbol: action.payload
        })
    }
})

export const { setTokenSymbol } = storeAirDrop.actions
export const selectTokenSympol = (state: RootState) => state.storeAirDrop.tokenSymbol
export default storeAirDrop.reducer