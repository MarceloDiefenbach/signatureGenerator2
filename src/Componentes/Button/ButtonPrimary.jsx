import React from 'react';
import './ButtonPrimary.css'; // Importando o novo componente

function Button({ label, onClick }) {
    return (
        <button className="full-width-button" onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;