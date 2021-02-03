import React from 'react'
import {Subtotal} from './Subtotal'
import {useStateValue} from './StateProvider'
import {CheckoutProduct} from './CheckoutProduct';
import '../css/Checkout.css'

export const Checkout = () => {

    const [ state ] = useStateValue();

    return (
        <div className='checkout'>
            
            <div className='checkout-left'>
                <div className='checkout-title'>
                    <h3>Hello {state?.user?.email}</h3>
                    <h1>Shopping Basket</h1>
                </div>
                {
                    state?.basket.map(item => (
                        <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            img={item.img}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))
                }
            </div>

            <div className='checkout-right'>
                <Subtotal />
            </div>
        </div>
    )
}
