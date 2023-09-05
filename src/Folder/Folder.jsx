import arrow_right from '../assets/Icons/right-arrow-svgrepo-com.svg';

import React, { useState, useEffect } from 'react';
import './Folder.css';
import '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';
import FilesGrid from './Componentes/FilesGrid';
import FileView from './FileView/FileView'
import LoadingView from '../Componentes/Loading/Loading'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://gpt-treinador.herokuapp.com/'; // Altere para a URL correta do seu servidor

function Folder() {

    const navigate = useNavigate();
    const { folderid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [itemIsOpen, setItemIsOpen] = useState(false);
    const [folderName, setFolderName] = useState(true);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const apiUrl = `${API_BASE_URL}/v2/files`; // Atualize com a URL completa da sua API
          const requestData = {
            folderID: folderid,
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
          };
    
          try {
            const response = await axios.post(apiUrl, requestData);
    
            if (response.status === 200) {
              console.error('sucesso');
              const data = response.data;
              setFiles(data.files);
              setFolderName(data.folderName);
              setIsLoading(false);
            } else if (response.status === 401) {
              console.error('1');
              setIsLoading(false);
            } else if (response.status === 400) {
              console.error('2');
              setIsLoading(false);
            } else if (response.status === 500) {
              console.error('3');
              setIsLoading(false);
            } else {
              setIsLoading(false);
              console.error('4');
              console.error('Error fetching data:', response.statusText);
            }
          } catch (error) {
            setIsLoading(false);
            console.error('5');
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const openFile = (index) => {
        console.log(`Item ${index + 1} clicado.`);
        setSelectedFile(files[index]);
        setItemIsOpen(true);
    };

    const goToMyFolders = (index) => {
        console.log(`clicou`);
        navigate("/dashboard");
    };

    const backToFolder = (index) => {
        setItemIsOpen(false);
    };

    return (
        <div>
            <div className='folder-container'>
                <div className='vertical-breadcrumbs'>
                    <h5 className='folder-title' onClick={goToMyFolders}>
                        Minhas pastas
                    </h5>
                    <img className="arrow-icon-breadcrumb" src={arrow_right} alt="arrow right" />
                    <h5 className='folder-actual-name' onClick={backToFolder}>
                        {folderName}
                    </h5>                </div>
                <div className='container-folders-view'>
                    {itemIsOpen && (
                        <FileView selectedItem={selectedFile}/>
                    )}
                    {!itemIsOpen && (
                        <FilesGrid items={files} onItemClick={openFile} />
                    )}
                </div>
            </div>
            {isLoading && ( 
                <LoadingView />
            )}
        </div>
    );
}

export default Folder;
