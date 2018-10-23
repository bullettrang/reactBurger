import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    };
}

export const authFail = (error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    };
}
//this is an action , do asyncs and return type and objects in actions
export const auth = (email,password,isSignUp)=>{
    console.log(email);
    console.log(password);
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC2hlztKJZJWRKsxDayac7KT5cLYwd_HVU'
        if(!isSignUp){
           url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC2hlztKJZJWRKsxDayac7KT5cLYwd_HVU'
        }
        console.log(authData);
        axios.post(url,authData)
            .then(response=>{
                console.log(response.data);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
            })
            .catch(error=>{
                dispatch(authFail(error));
            })
    };
}