import React, {useState, useEffect} from 'react'
import {useStateValue} from './StateProvider'
import {CheckoutProduct} from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import {useElements, useStripe, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from './reducer';
import axios from '../axios'
import {fb, db} from '../firebase';
import '../css/Payment.css'

export const Payment = () => {

    const [ state, dispatch ] = useStateValue();
    const history = useHistory();
    
    const [ error, setError ] = useState();
    const [ disabled, setDisabled ] = useState();
    const [ processing, setProcessing ] = useState();
    const [ succeeded, setSucceeded ] = useState();
    const [ clientSecret, setClientSecret ] = useState();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const getSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(state?.basket)}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getSecret();


    }, [state?.basket]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const getMpesa = async () => {
            await axios.get(`/mpesa/stk?total=${getBasketTotal(state?.basket)}`).then(result => {
                console.log(result);
            });
        }
        getMpesa();

        let fire = fb.functions().httpsCallable('mpesa1');
        fire().then(result => {
            console.log(result.data)
        });

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    }).then(({ paymentIntent }) => {

        db.collection('users').doc(state?.user?.uid).collection('orders').doc(paymentIntent.id).set({
            basket: state.basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
        })

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
            type: 'EMPTY_BASKET'
        });

        history.replace('/orders')
    })
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');
    }

    return (
        <div className='payment'>
            <div className='payment-cont'>

                <h1>Checkout (<Link to='/checkout'>{state?.basket.length} items</Link>) </h1>

                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment-address'>
                        <p>{state?.user?.email}</p>
                        <p>South B</p>
                        <p>Balozi</p>
                    </div>
                </div>

                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Review items in Basket</h3>
                    </div>
                    <div className='payment-items'>
                        {state?.basket.map((item) => (
                            <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            img={item.img}
                            price={item.price}
                            rating={item.rating}
                        />
                        ))}
                    </div>
                </div>

                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment-details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment-priceCont'>
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <>
                                        <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(state?.basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Kshs '}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                        <span>
                                            {processing ? <p>Processing</p> : 'Buy Now'}
                                        </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
