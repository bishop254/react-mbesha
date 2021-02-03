import React from 'react'
import {useStateValue} from './StateProvider'
import '../css/Product.css'

export const Product = ({id, title, img, price, rating}) => {

    const [ state, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id:id,
                title: title,
                img: img,
                price: price,
                rating: rating
            }
        })
    }

    return (
        <div className='product'>
            <div className='product-info'>
                <p>{title}</p>
                <p className='product-price'>
                    <small>Kshs.</small>
                    <strong>{price}</strong>
                </p>
            </div>
            <div className='product-rating'>
                {Array(rating).fill().map((_, i) => (
                  <p>⭐️</p>  
                ))}
                
            </div>
            <img src={img} alt='' />

            <button onClick={addToBasket}>Add To Basket</button>
        </div>
    )
}
