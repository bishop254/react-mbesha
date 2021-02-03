import React from 'react'
import {useStateValue} from './StateProvider'
import '../css/CheckoutProduct.css'

export const CheckoutProduct = ({ id, img, title, price, rating, hideButton }) => {

    const [ basket, dispatch ] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        });
    } 

    return (
        <div className='checkout-product'>
            <img src={img} alt='' className='checkout-product-img' />

            <div className='checkout-product-info'>
                <p className='checkout-product-title'>
                    {title}
                    </p> 
                <p className='checkout-product-price'>
                    <small>Kshs </small>
                    <strong>{price}</strong>
                    </p> 
                <p className='checkout-product-rating'>
                    {Array(rating).fill().map((_, i) => (
                    <p>⭐️</p>  
                    ))}
                    </p> 
                    {!hideButton && (
                       <button onClick={removeFromBasket}>Remove</button> 
                    )}
            </div>
            
        </div>
    )
}
