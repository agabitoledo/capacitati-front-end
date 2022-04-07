import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../../contexts/AuthContext.js'
import UiButton from '../UiButton/index.jsx';
import Modal from '../../Modal';
import LoginForm from '../../LoginForm';

const StyledHeader = styled.nav`
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    min-width: auto;
    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    background-color: #54d3c89d;
    color: #6666;
    padding: 0 32px;
    flex-grow: 0;
    -webkit-box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.25);
    box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.25);
    .logo-header{
        font-size: 40px;
        margin-left: 16px;
        align-items: center;
        text-decoration: none;
        color: #000;
    }
`
const Dropdown = styled.div`
    position: relative;
    display: inline-block;
    padding: 10px;
    background-color: #4CAF50;
    color: #1b1a1a;
  .dropdown-content{
      display: none;
      position: absolute;
      padding: 0;
      right: 0;
      top: 40px;
      background-color: aliceblue;
      width: 120px;
      box-shadow: 0px 8px 16px 0 rgba(0,0,0,0.2);
      z-index: 1;
    p {
        background-color: aquamarine;
        margin: 0;
        padding: 1em;
    }  
    p:hover {
        background-color: #4CAF50;
    }  
  }

  &:hover .dropdown-content {
      display: block;
  }
`
// const FormStyled = styled(LoginForm)`
// background: red;
// `

const Header = (props) => {
    const { userInfo, setUserInfo } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setOpen] = React.useState(false)


    return (
        <>
        {
            isOpen &&
            <Modal onClose={() => setOpen(false)}> <LoginForm /> </Modal>
        }
            <StyledHeader {...props}>
                <Link className='logo-header' to='/homepage'>Hitss On</Link>
                {
                userInfo 
                    ? 
                    <Dropdown className='dropdown'>
                        <span>{userInfo.user.firstName}</span>
                        <div className='dropdown-content'>
                            <p onClick={()=> navigate('/homepage')}>TestPage</p>
                            <p onClick={()=> setUserInfo(null)}>Logout</p>
                        </div>
                    </Dropdown> 
                    :
                    <UiButton onClick={() => setOpen(true)}>Logar</UiButton>
                }
            </StyledHeader>
        </>
    )
}

export default Header;