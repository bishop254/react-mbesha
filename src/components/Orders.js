import React, {useState, useEffect} from 'react'
import {db} from '../firebase';
import {useStateValue} from './StateProvider';
import {Order} from './Order';

export const Orders = () => {

    const [ state ] = useStateValue();
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        if(state?.user) {
          db.collection('users').doc(state?.user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapshot => {
                setOrders(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })));
            })  
        } else {
            setOrders([]);
        }
    }, [state?.user]);

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders-order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}
