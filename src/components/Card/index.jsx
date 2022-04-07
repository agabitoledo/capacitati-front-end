import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.button`
    display: flex;
    width: 50%;
    min-width: 120px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #84bacf;
    border: #84bacf;
    color: blue;
    padding: 25px;
    border-radius: 6px;
    -webkit-box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.025);
    box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.20);
    margin: 5px 0;
    .card-header {
        font-size: 24px;
        color: #333;
        font-weight: bold;
    }
    .card-text {
        font-size: 16px;
        color: #666;
        line-height: 1.6;
    }
`
const Card = (props) => {

    return <StyledCard {...props}>
        <h2 className="card-header">{props.title}</h2>
        <p className="card-text">{props.body}</p>
    </StyledCard>
}

export {Card};