import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.button`
    display: flex;
    width: 100%;
    min-width: 150px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #f594a7c2;
    border: #f594a7c2;
    color: #150F0F;
    padding: 25px;
    border-radius: 6px;
    -webkit-box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.025);
    box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.20);
    margin: 5px 0;
    opacity: ${props => props.disabled ? '0.5' : '1'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    &:hover{
    background-color: #f594a7;
    color: #000000;
    }
    .card-header {
        font-size: 24px;
        color: #333;
        font-weight: bold;
    }

    .card-text {
        font-size: 16px;
        color: #444141;
        line-height: 1.6;
    }
`
const Card = (props) => {
    return <StyledCard {...props} onClick={props.disabled ? null : props.onClick} title={''}>
        <h2 className="card-header">{props.title}</h2>
        <p className="card-text">{props.body}</p>
    </StyledCard>
};

export { Card };