import React from 'react'
import {Product} from './Product'
import '../css/Home.css'

export const Home = () => {
    return (
        <div className='home'>
            <div className='home-cont'>
                <img className='home-img' src='logo21.jpg' alt=''/>

                <div className='home-row home-row1'>
                    <Product
                        id={1} 
                        title='konyagi 750ml'
                        img='img/one.png'
                        price={650}
                        rating={5} />
                    <Product 
                        id={2} 
                        title='konyagi 250ml'
                        img='img/two.jpeg'
                        price={220}
                        rating={5} />
                </div>

                <div className='home-row'>
                <Product 
                        id={3} 
                        title='smirnoff 750ml'
                        img='img/three.jpeg'
                        price={1500}
                        rating={3} />
                    <Product 
                        id={4} 
                        title='konyagi 750ml'
                        img='img/one.png'
                        price={650}
                        rating={5} />
                    <Product 
                        id={5} 
                        title='konyagi 750ml'
                        img='img/one.png'
                        price={650}
                        rating={5} />
                </div>

                <div className='home-row'>
                    <Product 
                        id={6} 
                        title='bombay 750ml'
                        img='img/four.jpeg'
                        price={2400}
                        rating={4} />
                </div>
            </div>
        </div>
    )
}
