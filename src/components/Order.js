import React from 'react'
import moment from 'moment'
import {CheckoutProduct} from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format'

export const Order = ({ order }) => {
    return (
        <div className='order'> 
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY h:mma')}</p>

            <p className='order-id'>
                <small>{order.id}</small>
            </p>
            
            {order.data.basket?.map(item => (
                <CheckoutProduct 
                    id={item.id}
                    title={item.title}
                    img={item.img}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat 
            renderText={(value) => (
                <h3>Order Total: {value}</h3>
            )}
            decimalScale={2}
            thousandSeparator={true}
            displayType={'text'}
            prefix={'Kshs '}
            value={order.data.amount}
            />

        </div>
    )
}
