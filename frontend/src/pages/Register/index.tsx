import React, { useState, FormEventHandler } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { OngProps } from '../../interfaces';
import api from '../../services/api';
import './styles.css';

const Register: React.FC = () => {
  const [name, setName] = useState<OngProps['name']>('');
  const [email, setEmail] = useState<OngProps['email']>('');
  const [whatsapp, setWhatsApp] = useState<OngProps['whatsapp']>('');
  const [city, setCity] = useState<OngProps['city']>('');
  const [uf, setUf] = useState<OngProps['uf']>('');

  const history = useHistory();

  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data: Omit<OngProps, 'id'> = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post<Pick<OngProps, 'id'>>('ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas
            a encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e): void => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e): void => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e): void => setWhatsApp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e): void => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e): void => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
