export const initialState = {
    basket: [],
    user: null
};

//Selector
export const getBasketTotal = (basket) => {
    if(basket){
        return basket.reduce((amount, item) => item.price + amount, 0);
    } else {
        return 0
    }
    
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let tempBasket = [...state.basket];

            if (index >= 0) {
                tempBasket.splice(index, 1);
            } else {
                alert('error in  removing item')
            }

            return {
                ...state,
                basket: tempBasket
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };

        case 'EMPTY_BASKET':
            return {
                ...state, 
                basket: []
            }


        default:
            return state;
    }
}