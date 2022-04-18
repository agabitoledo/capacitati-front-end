import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styled from 'styled-components';

const ListStyled = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
`;

const LiStyled = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    //TODO: COLOCAR PROPS DE COR DEPOIS DE PALETA DEFINIDA
    color: #A94C5D;
    background: ${(props) => props.index % 2 === 1 ? 'white' : '#f594a7c2'};
    padding: 16px;
    margin: 0px;
    border-radius: 8px;
    b {
        color: #A94C5D;
    }
`;

const  Perfil = () => {
    const { userInfo } = useContext(AuthContext);

    console.log('userinfo', userInfo.user.firstName)

    return (
    <>
    <div>
        <ListStyled >
                <LiStyled>
                    <span><b>Usuário:</b> {userInfo.user.firstName + ' ' + userInfo.user.lastName}</span>
                </LiStyled>
                <LiStyled>
                    <span><b>E-mail:</b> {userInfo.user.email}</span>
                </LiStyled>
                <LiStyled>
                    <span><b>Telefone:</b> {userInfo.user.phone}</span>
                </LiStyled>
        </ListStyled>
    </div>
    </>
    )
}

export default Perfil;