export const initialState = {
    basket: [],
    user: null
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);

export const getBasketTotalQuantity = (basket) =>
    basket?.reduce((quantity, item) => item.quantity + quantity, 0);

const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'INCREASE_ITEM':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            let increasedQuantity = state.basket[index].quantity + 1;
            newBasket[index] = { ...state.basket[index], quantity: increasedQuantity }
            return {
                ...state,
                basket: newBasket
            }

        case 'DECREASE_ITEM':
            const decindex = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket2 = [...state.basket];
            let decresedQuantity = state.basket[decindex].quantity - 1;
            newBasket2[decindex] = { ...state.basket[decindex], quantity: decresedQuantity }
            return {
                ...state,
                basket: newBasket2
            }
        
        case 'SET_BASKET':
            return {
                ...state,
                basket: [...action.basket]
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case "REMOVE_FROM_BASKET":
            const remindex = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket1 = [...state.basket];

            if (remindex >= 0) {
                newBasket1.splice(remindex, 1);

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket1
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
};

export default reducer;