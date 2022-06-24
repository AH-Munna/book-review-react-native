import * as actTypes from './ActionType.js';
import axios from 'axios';
import { navigate } from '../components/myNavigationRoot.js';

const authenticateUser = (token, userId, email) => {
    return {
        type: actTypes.AUTHENTICATED,
        payload: {
            token: token,
            userId: userId,
            email: email,
        }
    }
}

export const signUp = (email, password, mode) => dispatchEvent => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let authMode = "signUp";
    if (mode === 'login') authMode = 'signInWithPassword';
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${authMode}?key=${actTypes.API_KEY}`, authData)
        .then(res => {
            if (res.status >= 200 && res.status <= 204) {
                alert('Successfully Authenticated');
                dispatchEvent(authenticateUser(res.data.idToken, res.data.localId, email));
                navigate('HomeDrawer');
            } else {
                alert("Error occured. Developer recieved error.log. we will try fixing it ASAP");
                // future todo
            }
        }).catch(err => {
            alert(err.response.data.error.message);
        })
}

export const LogoutUser = () => {
    return {
        type: actTypes.LOGOUT_USER,
    }
}