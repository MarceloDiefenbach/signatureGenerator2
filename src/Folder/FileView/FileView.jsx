import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas'; // Importe a biblioteca
import './FileView.css';

const FileView = ({ selectedItem }) => {
  const imageContainerRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const printDiv = async () => {
    if (imageContainerRef.current) {
      try {
        const canvas = await html2canvas(imageContainerRef.current); // Captura a div como um canvas

        // Converte o canvas para uma URL de imagem
        const imgData = canvas.toDataURL('image/png');

        // Cria um link temporário para fazer o download da imagem
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'screenshot.png';
        link.click();
      } catch (error) {
        console.error('Erro ao capturar div:', error);
      }
    }
  };

  return (
    <div className='file-view-container'>
      <div className='image-container' ref={imageContainerRef}>
        <img src={selectedItem.fileLink} alt={selectedItem.fileName} onLoad={() => setDownloadUrl(selectedItem.fileLink)} />
        <h4>{selectedItem.fileName}</h4>
      </div>
      <button onClick={printDiv}>
        Download Screenshot
      </button>
    </div>
  );
}

export default FileView;
