import React, { useRef } from 'react';
import html2canvas from 'html2canvas'; // Import the library
import './FileView.css';
import ButtonPrimary from '../../Componentes/Button/ButtonPrimary'

const FileView = ({ selectedItem }) => {
  const imageContainerRef = useRef(null);

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
          <img
            className='file_vie_image'
            src={`data:image/png;base64,${selectedItem.fileLink}`}
            alt={selectedItem.fileName}
          />
          <div className='file-contact-div'>
            <h5 className='file-signaturaName'>{localStorage.getItem('name')}</h5>
            <h5 className='file-signaturaPhone'>{localStorage.getItem('phone')}</h5>
          </div>
        </div>
      </div>
      <div>
        <ButtonPrimary label="Baixar imagem" onClick={captureScreenshot} isFullWidth={false}/>
      </div>
    </div>
  );
  
}

export default FileView;
