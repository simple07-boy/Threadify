import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ProductApi } from "./queries/ProductApi";
import { cartSlice } from "./slice/Cartslice";

export const Store = configureStore({
    reducer:{
        [ProductApi.reducerPath]:ProductApi.reducer,
        [cartSlice.name]:cartSlice.reducer
    },
    middleware:(d)=>d().concat(ProductApi.middleware)
})
setupListeners(Store.dispatch)