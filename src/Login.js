import React from 'react'
import './Login.css'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { login } from './features/appSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch(login({
                    username: result.user.displayName,
                    profilePic: result.user.photoURL,
                    id: result.user.uid,
                }))
                history("/chats");
            })
            .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt=""/>
                <Button variant='outlined' onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
