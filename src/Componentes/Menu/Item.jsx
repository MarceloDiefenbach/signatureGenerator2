import React from 'react';
import '../TextStyles.css';
import './Item.css'

function MenuItem({ iconSrc, labelText, onClick }) {

  const handleItemClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className='item' onClick={handleItemClick}>
      <img className="icon" src={iconSrc} alt="Ícone" />
      <h6 className='menu-item-label'>{labelText}</h6>
    </div>
  );
}

export default MenuItem;