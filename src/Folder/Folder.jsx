import React, { useState, useEffect } from 'react';
import './Folder.css';
import '../Componentes/TextStyles.css';
import { useNavigate } from 'react-router-dom';
import MenuGrid from '../Dashboard/Componentes/MenuGrid';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://gpt-treinador.herokuapp.com/'; // Altere para a URL correta do seu servidor

function Folder() {

    const { folderid } = useParams();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/v1/folders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ownerID: '1' })
        })
        .then(response => response.json())
        .then(data => {
            setFolders(data.folders);
            setIsLoading(false); // Marcar o carregamento como concluído
        })
        .catch(error => {
            console.error('Erro ao obter pastas:', error);
            setIsLoading(false); // Marcar o carregamento como concluído mesmo em caso de erro
        });
    }, []);

    const handleItemClick = (index) => {
        console.log(`Item ${index + 1} clicado.`);
    };

    return (
        <div className='folder-container'>
            {isLoading && ( // Renderização condicional com base no estado isLoading
                <div className='folder-overlay'>
                <h4>
                    Carregando
                </h4>
                </div>
            )}
            <h1 className='folder-title'>
                Seus arquivos ~ nome da pasta
            </h1>
            <div className='folder-container'>
                <MenuGrid items={folders} onItemClick={handleItemClick} />
            </div>
        </div>
    );
}

export default Folder;
