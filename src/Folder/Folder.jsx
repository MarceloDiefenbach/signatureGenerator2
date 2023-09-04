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
        
        const tokenData = {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token')
        };

        axios.post(`${API_BASE_URL}/v1/check_token`, tokenData)
            .then(tokenResponse => {
            if (tokenResponse.status === 200) {
                axios.post(`${API_BASE_URL}/v2/files`, {
                folderID: folderid
                })
                .then(response => {
                    setFiles(response.data.files);
                    setFolderName(response.data.folderName);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Erro ao obter arquivos:', error);
                    setIsLoading(false);
                });
            } else {
                console.log("vai pra login");
                navigate('/');
            }
            })
            .catch(tokenError => {
                console.error('Erro ao verificar token:', tokenError);
                navigate('/');
            });
    }, [folderid]);

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
