import React, { useState, FormEventHandler } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import { IncidentProps } from '../../interfaces';
import api from '../../services/api';

const NewIncident: React.FC = () => {
  const [title, setTitle] = useState<IncidentProps['title']>('');
  const [description, setDescription] = useState<IncidentProps['description']>('');
  const [value, setValue] = useState<IncidentProps['value']>();

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const handleNewIncident: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data: IncidentProps = {
      title,
      description,
      value: value as number,
    };

    try {
      await api.post<IncidentProps>('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e): void => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e): void => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e): void => setValue(e.target.value as unknown as number)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
