import React from 'react';
import UiButton from '../UserInterface/UiButton';
import styled from 'styled-components';
import * as UserService from '../../services/Users';
import { AuthContext } from '../../contexts/AuthContext';

const FormLogin = styled.form`
    max-width: 600px;
    margin: 4px auto;
    padding: 8px;
    display: flex;
`
const InputLogin = styled.input`
font-family: inherit;
  width: 100%;
  border: 1px solid;
  border-bottom: 2px solid $gray;
  border-radius: 4px;
  border-color: #bebeb6dd;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 10px;
  margin: 6px;
  /* background: #458; */
  &:hover {
      border-color: #d1d12cdd;
  }
`
const LoginForm = () => {
    const [form, setForm] = React.useState({});
    const {userInfo, setUserInfo} = React.useContext(AuthContext);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleSubimit = (e) => {
        e.preventDefault();
        UserService.login(form);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData); //ES2019 - Object.fromEntries convert a list-key-value (array) in a object
        console.log('formData', formData)
        console.log('data', data)
    };
    console.log('joiwsjodjsad', userInfo)
    return (
        <>
            <FormLogin
                // action="" method=''
                onSubmit={handleSubimit}
            >
                <InputLogin type='text' name='email' placeholder='E-mail' onChange={handleInput} value={form.email || ''} />
                <InputLogin type='text' name='password' placeholder='Senha' onChange={handleInput} value={form.password || ''} />
                <UiButton type="submit">Loguin</UiButton >
                {userInfo !== null ? <h2>Bem vindo, {userInfo.user.firstName + ' ' + userInfo.user.lastName}</h2> : <h3>SAI DAQUI</h3>}
                <UiButton onClick={(e)=> setUserInfo(null)}>Deslogar</UiButton>
            </FormLogin>
        </>
    )
}

export default LoginForm;