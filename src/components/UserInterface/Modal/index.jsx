import React from "react";
import styled from "styled-components";

const ModalStyled = styled.div`
    box-sizing: border-box;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0,0,0,0.8);
`
const ContainerStyled = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    color: #000;
    width:30%;
    height: 40%;
    border-radius: 20px;
    text-align: center;
`

const ButtonStyled = styled.button`
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    outline: none;
    width: 32px;
    height: 32px;
    right: calc(-100% + 64px);
    cursor: pointer;
    top: 16px;
    display: flex;
    position: relative;
    align-items: center;
    &:before,
    &:after {
    content:' ';
    position: absolute;
    width: 2.5px;
    height: 24px;
    background-color: #000;
    }
    &:before{
    transform: rotate(45deg);
    }
    &:after {
    transform: rotate(-45deg);
    }
`

export default function Modal({ id = 'modal', onClose = () => { }, children }) {
    const handleOutsideClick = (e) => {
        if (e.target.id === id) return onClose();
    }

    return (
        <ModalStyled id={id} onClick={handleOutsideClick} >
            <ContainerStyled>
                <ButtonStyled onClick={onClose} />
                <div className="content">
                    {children}
                </div>
            </ContainerStyled>
        </ModalStyled>
    )
}