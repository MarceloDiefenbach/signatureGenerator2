import folder_path from '../../assets/Icons/folder.svg';
import React from 'react';
import './MenuGrid.css'; // Importa os estilos CSS

const MenuItem = ({ iconSrc, folderName, onClick }) => (
  <div className="menu-item" onClick={onClick}>
    <div className='icon-background-item'>
      <img className="icon" src={iconSrc} alt="Ícone" />
    </div>
    <h6 className='menu-item-label'>{folderName}</h6>
  </div>
);

const MenuGrid = ({ items, onItemClick }) => (
  <div className="grid-container">
    {items.map((item, index) => (
      <MenuItem
        key={index}
        iconSrc={folder_path}
        folderName={item.folderName}
        onClick={() => onItemClick(index)}
      />
    ))}
  </div>
);

export default MenuGrid;
