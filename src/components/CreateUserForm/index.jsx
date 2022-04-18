import React from 'react';
import UiButton from '../UserInterface/UiButton';
import styled from 'styled-components';
import * as UserService from '../../services/Users';

const FormAddCourse = styled.form`
    max-width: 600px;
    margin: 4px auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
`
const InputCreateUser = styled.input`
font-family: inherit;
  border: 2px solid;
  border-bottom: 2px solid $gray;
  border-radius: 4px;
  border-color: #bebeb6dd;
  outline: 1;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 10px;
  margin: 6px;
  &:hover {
      border-color: #f0b1c0;
  }
`;
const CreateUserForm = (props) => {
    const [form, setForm] = React.useState({});
    const [newUser, setNewUser] = React.useState();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
        setNewUser({ ...form, [name]: value })
    };

    const handleSubimit = (e) => {
        e.preventDefault();
        UserService.createUser(form)
            .then((response) => {
                setNewUser(response);
                props.updateUser();
            }).catch((err) => { console.error('ops', err) })
            console.log('newUser', newUser)
    };

    return (
        <FormAddCourse
            // action="" method=''
            onSubmit={handleSubimit}
            {...props}
        >
            <InputCreateUser type='text' name='firstName' placeholder='Nome' onChange={handleInput} value={form.firstName || ''} />
            <InputCreateUser type='text' name='lastName' placeholder='Sobrenome' onChange={handleInput} value={form.lastName || ''} />
            <InputCreateUser type='text' name='email' placeholder='E-mail' onChange={handleInput} value={form.email || ''} />
            <InputCreateUser type='text' name='password' placeholder='Senha' onChange={handleInput} value={form.password || ''} />
            <InputCreateUser type='text' name='cpf' placeholder='CPF' onChange={handleInput} value={form.cpf || ''} />
            <InputCreateUser type='text' name='phone' placeholder='Telefone' onChange={handleInput} value={form.phone || ''} />
            <UiButton type="submit">Salvar</UiButton >
        </FormAddCourse>
    )
}

export default CreateUserForm;