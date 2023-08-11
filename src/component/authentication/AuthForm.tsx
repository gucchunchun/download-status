import React, {useState, useEffect, useMemo} from 'react';
import * as Type from '../../Type';

interface AuthFormProps  {
    handleLogin:(index:number, user:Type.User) => void;
}
const AuthForm:React.FC<AuthFormProps> = (props) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState(null);


    function handleLoginSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
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
            setError(err);
            console.log(err);
        });
    }
    function handleSignUpSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
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
                    throw new Error(errData);
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
    return(
        <form onSubmit={isLogin? handleLoginSubmit: handleSignUpSubmit}>
            <label htmlFor='id'>ID</label>
            <input 
                id='id'
                name='id'
                type='text'
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor='pwd'>ID</label>
            <input 
                id='pwd'
                name='pwd'
                type='password'
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
            />
            <button type='submit'>{isLogin? "login": "sign up"}</button>
        </form>
    )
}

export default AuthForm;