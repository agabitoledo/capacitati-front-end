import React from "react";
import styled from 'styled-components';

const StyledLi = styled.li `
    width: 200px;
    display: flex;
    justify-content: space-between;
`
const CloseBtn = styled.button `
    color: red;
    outline: none;
    border: none;
    background: none;

`

const List = ({initial})=>{
    const [list, setList] = React.useState(['Item A', 'Item B', 'Item C']);
    const [currentValue, setCurrentValue] = React.useState('');

    const handleSubmit = () => {
        setList([...list, currentValue])
        setCurrentValue('');
    }


    React.useEffect(()=>{
        console.log('testando')
    })

    return (
        <>
            <h3>Listagem</h3>
            <input type="text" value={currentValue} onChange={(e)=> setCurrentValue(e.target.value)}/>
            <br />
            <button onClick={()=>handleSubmit('')}>Adicionar item a lista</button>
            <ul className="list">
                {
                    list.map((item, index) => (
                        <StyledLi key={`${index}-item`}>
                            {item}
                            <CloseBtn onClick={()=> setList(list.filter((value => value !== list[index])))}>X</CloseBtn>
                        </StyledLi>
                    ))
                }
            </ul>
        </>
    )

}

export default List;