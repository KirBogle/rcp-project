import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

export default function LoginView() {
  const { isAuthorized, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthorized) {
    return <Navigate to="/table" replace />;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    login();
    navigate('/table');
  };

  return (
    <div className="container">
      <h1>Вход</h1>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="username">Логин</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
        <div className="toolbar">
          <button type="submit">Войти</button>
          <button
            type="button"
            className="muted-button"
            onClick={() => {
              login();
              navigate('/table');
            }}
          >
            К таблице
          </button>
        </div>
      </form>
    </div>
  );
}
