import React from 'react';
import './ButtonPrimary.css';
import '../TextStyles.css';

function Button({ label, onClick, isFullWidth }) {
    if (isFullWidth) {
        return (
            <button className="full-width-button" onClick={onClick}>
                {label}
            </button>
        );
    } else {
        return (
            <button className="button-text-size" onClick={onClick}>
                {label}
            </button>
        );
    }
}

export default Button;
