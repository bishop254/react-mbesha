import React, {useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import {Link} from 'react-router-dom'
import {useStateValue} from './StateProvider'
import {auth} from '../firebase'
import '../css/Header.css'


export const Header = () => {

    const [ state ] = useStateValue();
    
    const handleAuth = () => {
            auth.signOut();
    }

    const toggle = () => {
        const toggleBtn = document.querySelector('.toggle-btn');
        const navLinks = document.querySelector('.nav-links');

        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });

    }

    return (
        <div>
                
            <nav className='navbar'>
                
                <div className='nav-title'>
                    <Link to='/'>
                        Nyah-Giz
                    </Link>
                </div>
            
                <Link to='/checkout'>
                   <div className='header-basket'>
                        <ShoppingBasketIcon />
                        <span className='header-basketCount'>
                            {
                                (state?.basket) ? (state?.basket.length) : 0
                            }
                        </span>
                    </div> 
                </Link>

                <a href='#' className='toggle-btn' onClick={toggle}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </a>
                <div className='nav-links'>
                    <ul>
                        <li onClick={handleAuth}><Link to={!(state?.user) && '/login'}> 
                                <span className='header-option1'>Hello {state?.user?.email}</span><br/>
                                <span className='header-option2'>{state?.user ? 'Sign Out' : 'Sign In'}</span>
                         </Link></li>
                        <li><Link to='/orders'>
                                <span className='header-option1'>Returns</span><br/>
                                <span className='header-option2'>&amp; Orders</span>
                            </Link></li>
                        <li><Link to=''>
                                <span className='header-option1'>Your</span><br/>
                                <span className='header-option2'>Prime</span>
                            </Link></li>
                    </ul>
                </div>

                

            </nav>
        </div>
    )
    
}
