import folder_path from '../../assets/Icons/folder.svg';
import React from 'react';
import './FilesGrid.css'; // Importa os estilos CSS

const FileItem = ({ imageSrc, folderName, onClick }) => (
  <div className="menu-item-files" onClick={onClick}>
    <img className="image-files" src={`data:image/png;base64,${imageSrc}`} alt="image" />
    <h6 className='menu-item-label-files'>{folderName}</h6>
  </div>
);

const FilesGrid = ({ items, onItemClick }) => (
  <div className="grid-container-files">
    {items.map((item, index) => (
      <FileItem
        key={index}
        imageSrc={item.fileLink}
        folderName={item.fileName}
        onClick={() => onItemClick(index)}
      />
    ))}
  </div>
);

export default FilesGrid;
