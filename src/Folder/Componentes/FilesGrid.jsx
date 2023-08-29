import folder_path from '../../assets/Icons/folder.svg';
import React from 'react';
import './FilesGrid.css'; // Importa os estilos CSS

const FileItem = ({ iconSrc, folderName, onClick }) => (
  <div className="menu-item-files" onClick={onClick}>
    <img className="image-files" src="https://encartefacilapp.com.br/imagesSignature/card%201.png" alt="image" />
    <h6 className='menu-item-label-files'>{folderName}</h6>
  </div>
);

const FilesGrid = ({ items, onItemClick }) => (
  <div className="grid-container-files">
    {items.map((item, index) => (
      <FileItem
        key={index}
        iconSrc={folder_path}
        folderName={item.fileName}
        onClick={() => onItemClick(index)}
      />
    ))}
  </div>
);

export default FilesGrid;
