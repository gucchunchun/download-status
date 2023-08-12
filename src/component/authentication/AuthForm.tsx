import React, {useState, useEffect, useMemo} from 'react';
import * as Type from '../../Type';
import { GradientButton } from '../index';

interface AuthFormProps  {
    handleLogin:(index:number, user:Type.User) => void;
}
const AuthForm:React.FC<AuthFormProps> = (props) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [id, setId] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [error, setError] = useState<(string|null)>(null);


    function handleLoginSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        if ( id === "" || pwd === "" ) {
            setError('ID and Password must be filled')
            return;
        }
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, pwd })
        })
        .then((res)=> {
            if(res.status===401) {
                return res.json().then((errData)=>{
                    throw new Error(errData.message);
                })
            }
            return res.json()
        })
        .then((data:{message:string, token:number, user:Type.User})=>{
            alert(data.message);
            props.handleLogin(data.token, data.user);
        })
        .catch((err)=>{
            setError(err.message);
            console.log(err.message);
        });
    }
    function handleSignUpSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        if ( id === "" || pwd === "" ) {
            setError('ID and Password must be filled')
            return;
        }
        fetch('/api/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, pwd })
        })
        .then((res)=> {
            if(res.status===401) {
                return res.json().then((errData)=>{
                    throw new Error(errData.message);
                })
            }
            return res.json()
        })
        .then((data:{message:string, token:number, user:Type.User})=>{
            alert(data.message);
            props.handleLogin(data.token, data.user);
        })
        .catch((err)=>{
            setError(err.message);
            console.log(err.message);
        });
    }
    function handleToggleButton():void {
        setIsLogin((prev)=> !prev);
        setId('');
        setPwd('');
    }
    return(
        <form onSubmit={isLogin? handleLoginSubmit: handleSignUpSubmit}>
            {error? <p>{error}</p>: null}
            <p>{isLogin? 'login': 'sign up'}</p>
            <label htmlFor='id'>ID</label>
            <input 
                id='id'
                name='id'
                type='text'
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor='pwd'>Password</label>
            <input 
                id='pwd'
                name='pwd'
                type='password'
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
            />
            <GradientButton type='submit' text={isLogin? 'login': 'sign up'} />
            <GradientButton type='button' onClick={handleToggleButton} text={isLogin? "sign up": "login"} />
        </form>
    )
}

export default AuthForm;