import folder_path from '../../assets/Icons/folder.svg';
import React from 'react';
import './MenuGrid.css'; // Importa os estilos CSS

const MenuItem = ({ folderName, onClick }) => (
  <div className="menu-item" onClick={onClick}>
    <h5 className='menu-item-label'>{folderName}</h5>
  </div>
);

const MenuGrid = ({ items, onItemClick }) => (
  <div className="grid-container">
    {items.map((item, index) => (
      <MenuItem
        key={index}
        folderName={item.folderName}
        onClick={() => onItemClick(index)}
      />
    ))}
  </div>
);

export default MenuGrid;
