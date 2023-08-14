import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import * as Type from '../../Type';
import { Button, Form } from '../common/index';

interface AuthFormProps  {
    handleLogin:(index:number, user:Type.User) => void;
}
const StyledForm = styled('form')`
    width: 16rem;
    height: 16rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
const AuthForm:React.FC<AuthFormProps> = (props) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [id, setId] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [error, setError] = useState<(string|null)>(null);
const ToggleDiv = styled('div')`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ToggleP = styled('p')`
    width: fit-content;
    font-size: 0.7rem;
    &:first-letter {
        text-transform: capitalize;
    }
`;

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
        <StyledForm onSubmit={isLogin? handleLoginSubmit: handleSignUpSubmit}>
            {error? <p>{error}</p>: null}
            <h3>{isLogin? 'login': 'sign up'}</h3>
            <Form.MyInput 
                id={'id'} 
                name={'id'} 
                value={id} 
                type={'text'} 
                label={'ID'} 
                inputTextSize={'0.8rem'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setId(e.target.value)}
                 />
            <Form.MyInput 
                id={'pwd'} 
                name={'pwd'} 
                value={pwd} 
                type={'password'} 
                label={'Password'} 
                inputTextSize={'0.8rem'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>setPwd(e.target.value)}
                 />
            <ToggleDiv>
                <ToggleP>{isLogin? 'you don\'t have account?':'do you have account?'}</ToggleP>
                <Button.TextButton 
                    type='button' 
                    text={isLogin? 'sign up': 'login'} 
                    textColor={`rgb(${theme.colors.textPrimary})`} 
                    hoveredTextColor={`rgb(${theme.colors.resolve})`} 
                    onClick={handleToggleButton}/>
            </ToggleDiv>
            <Button.GradientButton 
                type='submit' 
                text={isLogin? 'login': 'sign up'} 
                isDisabled={false}
                width={'5rem'} 
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.textPrimary})`}
                border={`1px solid rgb(${theme.colors.border})`}
                />
        </StyledForm>
    )
}

export default AuthForm;