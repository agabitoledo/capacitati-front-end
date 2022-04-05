import React from "react";

export default function Modal ({ id='modal',onClose=()=>{}, children }){
    const handleOutsideClick = (e) => {
        if(e.target.id === id) return onClose();
    }
    return (
        <div id={id}className="modal" onClick={handleOutsideClick} >
            <div className="container">
                <button className="btn-close" onClick={onClose} />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}