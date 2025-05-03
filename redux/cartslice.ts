import { productType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface cartItem extends productType {
    quantity: number;
}
 interface cartState{
    cart:cartItem[]
}
const initialState:cartState={
    cart:[]
}

// Create a slice of the store
// The slice contains the reducer and the actions
const cartSlice=createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        increseQuantity:(state,action)=>{
            const item = state.cart.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            } 
        },
        decreseQuantity:(state,action)=>{
           state.cart= state.cart.reduce((acc:cartItem[], item:cartItem) => {
                if (item.id === action.payload) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                        
                        acc.push(item)
                    } 
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);
        },
        setQuantity:(state,action)=>{
            // const item = state.cart.find((item) => item.id === action.payload.id);
            // if (item) {
            //     item.quantity = action.payload.quantity;
            // }
            state.cart=state.cart.reduce((acc:cartItem[],prev:cartItem)=>{
                if(prev.id===action.payload.id){
                    prev.quantity=action.payload.quantity;
                    if(prev.quantity>1){acc.push(prev)}
                    
                }else{
                    acc.push(prev)
                }
                return acc
            },[])
        }
        ,
        addToCart: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            // const index = state.cart.findIndex((item) => item.id === action.payload);
            // if (index !== -1) {
            //     state.cart.splice(index, 1);
                
            // }
            state.cart=state.cart.filter((item:cartItem)=>item.id!==action.payload)
        },
        clearCart: (state) => {
            state.cart = [];
        },
    }
})

export const {clearCart,setQuantity,increseQuantity,decreseQuantity,addToCart,removeFromCart}=cartSlice.actions;
export const getCart = (state: RootState) => state.cart.cart
export default cartSlice