import React from "react";
import styled from 'styled-components';

const StyledContainer = styled.ul `
    position: absolute;
    height: 100vh;
    width: 300px;
    min-width: 280px;
    max-width: 500px;
    top: 0;
    left:0;
    margin: 0;
    padding-top: 65px;
    padding-left: 0;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    z-index: 900;
    background: pink;
    box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.25);
`
const LiStyled = styled.button `
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 12px;
    border: none;
    background-color: ${props => props.active ? '#5555' : 'transparent'};
    &:hover {
        background-color: #312f2f8f;
        color: pink;
    }
`

const SideBar = ({props, handleSelect, activeTab})=>{

    return (
            <StyledContainer  className="sidebar">
                {
                    props.map((item, index) => (
                        <LiStyled onClick={() =>handleSelect(item.id)} activeTab={ item.id === activeTab} key={`${index}-item`}>
                            {item.label}
                        </LiStyled>
                    ))
                }
            </StyledContainer>
    )

}

export default SideBar;