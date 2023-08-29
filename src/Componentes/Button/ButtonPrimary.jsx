import React from 'react';
import './ButtonPrimary.css';
import '../TextStyles.css'

function Button({ label, onClick }) {
    return (
        <button className="full-width-button" onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;