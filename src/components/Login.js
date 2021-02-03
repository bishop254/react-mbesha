import React, {useState} from 'react'
import {Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'


export const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, pass).then(
            (auth) => {
                history.push('/');
            }
        ).catch(error => 
            alert(error.message)
        )
    }

    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, pass).then(
            (auth) => {
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            }
        ).catch((error) => {
            console.log(error.message)
        });

    }

    return (
        <div className='login'>
            <Link to='/'>
                <img  src='logo3.png' alt='' className='login-logo' />
            </Link>

            <div className='login-cont'>
                <h1>Sign In</h1>

                <form className='login-form'>
                    <h5>E-mail</h5>
                    <input type='email' value={email} 
                    onChange={(e) => {setEmail(e.target.value)}}
                    />

                    <h5>Password</h5>
                    <input type='password' value={pass} 
                    onChange={(e) => {setPass(e.target.value)}}
                    />

                    <button type='submit' onClick={signIn} className='login-signin'>Sign-In</button>
                </form>
                <p>By signing in you agree to this websites terms and conditions</p>
        <br/>

                <p>Don't have an account?</p>
                <button onClick={register} className='login-register'>Create Account</button>
            </div>
            
        </div>
    )
}
