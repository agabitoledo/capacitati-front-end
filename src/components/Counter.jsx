import React from "react";

const  Counter = ({initial}) => {
    const [count, setCount] = React.useState(initial);
  
    return (
      <div className="counter">
          <h1>Counter:</h1>
        <h3>
            {count}
        </h3>
        <button onClick={()=>setCount(count + 1)} >Adiciona</button>
      </div>
    );
  }
  
  export default Counter;
  