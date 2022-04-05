import React from "react";
import './styles.css'

//https://medium.com/@diihfilipe/criando-componentes-realmente-reutilizaveis-com-react-f3f744d7af8e
const UiButton = ({children, className, theme, component: Component, ...restProps})  => {
    return <Component className={`ui-button ui-button--${theme} ${className}`} {...restProps}>{children}</Component>
};

UiButton.defaultProps = {
    className: '',
    component: 'button',
    theme: 'pattern'
};

export default UiButton;