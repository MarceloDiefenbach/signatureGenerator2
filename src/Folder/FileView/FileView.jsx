import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './FileView.css';
import ButtonPrimary from '../../Componentes/Button/ButtonPrimary';
import axios from 'axios'; // Importe o Axios

const FileView = ({ selectedItem }) => {
  const imageContainerRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Faça a requisição HTTP quando o componente for montado
    axios
      .post('http://gpt-treinador.herokuapp.com/v2/file_get_image', {
        imageLink: selectedItem.fileLink, // Usar "imageLink" aqui
      })
      .then(response => {
        const data = response.data;
        if (data.statusCode === '200') {
          setImageSrc(`data:image/png;base64,${data.image}`);
        } else {
          console.error('Erro ao carregar a imagem:', data.error);
        }
      })
      .catch(error => {
        console.error('Erro ao carregar a imagem:', error);
      });
  }, [selectedItem.fileLink]);

  const captureScreenshot = () => {
    const divElement = imageContainerRef.current;

    if (divElement) {
      html2canvas(divElement).then(canvas => {
        const screenshotUrl = canvas.toDataURL('image/png');
        downloadScreenshot(screenshotUrl);
      });
    }
  };

  const downloadScreenshot = (url) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${selectedItem.fileName}.png`;
    anchor.click();
  };

  return (
    <div className='file-view-container'>
      <div className='file_shadow'>
        <div className='image-container' ref={imageContainerRef}>          
          {!imageSrc && (
            <img
              className='file_vie_image'
              src={selectedItem.fileLink}
              alt={selectedItem.fileName}
            />
          )}
          {imageSrc && (
            <img
              className='file_vie_image'
              src={imageSrc}
              alt={selectedItem.fileName}
            />
          )}
          <div className='file-contact-div'>
            <h5 className='file-signaturaName'>{localStorage.getItem('name')}</h5>
            <h5 className='file-signaturaPhone'>{localStorage.getItem('phone')}</h5>
          </div>
        </div>
      </div>
      <div>
        <ButtonPrimary label="Baixar imagem" onClick={captureScreenshot} isFullWidth={false} />
      </div>
    </div>
  );
};

export default FileView;
