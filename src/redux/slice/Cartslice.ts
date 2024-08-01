import { createSlice } from "@reduxjs/toolkit"
export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart") as string) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const exist = state.cart.find((cur: any) => cur.id === action.payload.id);
            if (exist) {
                const newArray = state.cart.map((cur: any) => {
                    if (cur.id === action.payload.id) {
                        cur.qty = cur.qty + 1
                    }
                    return cur
                })
                state.cart = newArray;
                localStorage.setItem("cart", JSON.stringify(newArray))
                return
            }
            state.cart = [...state.cart, action.payload];
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        incrementHandler: (state, action) => {
            const newArray = state.cart.map((cur: any) => {
                if (cur.id === action.payload) {
                    cur.qty = cur.qty + 1
                }
                return cur
            })
            state.cart = newArray;
            localStorage.setItem("cart", JSON.stringify(newArray))
            return
        },
        decrementHandler: (state, action) => {
            const exist = state.cart.find((cur: any) => cur.id === action.payload);
            if (exist) {
                const copy = JSON.parse(JSON.stringify(exist))
                if(copy.qty === 1){
                    const newArray = state.cart.filter((cur: any) =>
                        cur.id !== action.payload)
                    state.cart = newArray;
                    localStorage.setItem("cart", JSON.stringify(newArray))
                    return
                }
                const newArray = state.cart.map((cur: any) => {
                    if (cur.id === action.payload) {
                        cur.qty = cur.qty - 1
                    }
                    return cur
                })
                state.cart = newArray;
                localStorage.setItem("cart", JSON.stringify(newArray))
                return
            }
        },
        deleteHandler: (state, action) => {
            const newArray = state.cart.filter((cur: any) =>
                cur.id !== action.payload)
            state.cart = newArray;
            localStorage.setItem("cart", JSON.stringify(newArray))
            return
        }
    }
})
export const { addToCart, incrementHandler, decrementHandler,deleteHandler } = cartSlice.actions