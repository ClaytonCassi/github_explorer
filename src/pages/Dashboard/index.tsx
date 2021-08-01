import React, {useState, FormEvent, useEffect} from 'react';
import { Title, Form, Repositories, Error } from './styles';
import { Link } from 'react-router-dom';
import {FiChevronRight} from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;

    };

}

const Dashboard: React.FC= () => {
const [newRepo, setNewRepo] = useState('');
const [inputError, setInputError] = useState('');
const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories= localStorage.getItem(
        '@GitbubExplorer:repositories',
    );
    if(storageRepositories) {
        return JSON.parse(storageRepositories);
    }
    return [];
});

useEffect(() => {
    localStorage.setItem(
        '@GitbubExplorer:repositories',
         JSON.stringify(repositories),
    );
}, [repositories]);

 async function handeAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    //adicao de um novo repositorio
    //consumir api do git
    //salvar o novo repositorio no estado
    event.preventDefault();
    if(!newRepo) {
        setInputError('Digite o autor/nome do repositorio');
        return;
    }
    try{
    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

     setRepositories([ ... repositories, repository]);
     setNewRepo('');
     setInputError('');
    } catch (err){
        setInputError('Erro a busca por esse repositório');
    }

}
    return (
    <>
    <img src={logoImg} alt="GitHub Explorer" />
    <Title> Explore repositorios no github </Title>

    <Form hasError={!! inputError} onSubmit={handeAddRepository}> 
        <input 
        value={newRepo}
        onChange={(e) => setNewRepo(e.target.value)}
        placeholder="Digite o nome do repositório"/>
        <button type="submit"> Pesquisar</button>
    </Form>
    { inputError && <Error>{inputError}</Error>}
    <Repositories>
       {repositories.map(repository => (
                   <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
                   <img src={repository.owner.avatar_url}
                   alt={repository.owner.login}
                   />
                   <div>
                       <strong>{repository.full_name}</strong>
                       <p>{repository.description}</p>
                   </div>
                   <FiChevronRight size={20}/>
               </Link>
       ))}
 
    </Repositories>
    </>
    )
};

export default Dashboard;