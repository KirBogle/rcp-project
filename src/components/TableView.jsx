import { useState } from 'react';
import EmployeeAPI from '../api/service';

const jobs = ['Тренер', 'Админ', 'Посетитель'];
const emptyForm = { name: '', job: 'Посетитель' };

export default function TableView() {
  const [rows, setRows] = useState(() => EmployeeAPI.all());
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  const refresh = () => setRows([...EmployeeAPI.all()]);

  const openAdd = () => {
    setMode('add');
    setForm(emptyForm);
    setMessage('');
  };

  const openEdit = () => {
    const row = rows.find((item) => item.id === selectedId);
    if (!row) {
      setMessage('Сначала выберите строку в таблице');
      return;
    }
    setMode('edit');
    setForm({ name: row.name, job: row.job });
    setMessage('');
  };

  const removeSelected = () => {
    if (selectedId == null) {
      setMessage('Сначала выберите строку в таблице');
      return;
    }
    EmployeeAPI.delete(selectedId);
    setSelectedId(null);
    setMode(null);
    setMessage('');
    refresh();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setMessage('Введите имя');
      return;
    }

    if (mode === 'add') {
      const created = EmployeeAPI.add({ name, job: form.job });
      setSelectedId(created.id);
    } else {
      EmployeeAPI.update({ id: selectedId, name, job: form.job });
    }

    setMode(null);
    setForm(emptyForm);
    setMessage('');
    refresh();
  };

  return (
    <div className="container">
      <h1>Таблица</h1>
      <div className="toolbar">
        <button type="button" onClick={openAdd}>
          Добавить
        </button>
        <button type="button" onClick={openEdit}>
          Изменить
        </button>
        <button type="button" onClick={removeSelected}>
          Удалить
        </button>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
      {mode ? (
        <form className="record-form" onSubmit={onSubmit}>
          <h2>{mode === 'add' ? 'Новая запись' : 'Изменить запись'}</h2>
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <label htmlFor="job">Роль</label>
          <select
            id="job"
            name="job"
            value={form.job}
            onChange={(event) => setForm({ ...form, job: event.target.value })}
          >
            {jobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
          <div className="toolbar">
            <button type="submit">{mode === 'add' ? 'Сохранить' : 'Обновить'}</button>
            <button type="button" className="muted-button" onClick={() => setMode(null)}>
              Отмена
            </button>
          </div>
        </form>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={row.id === selectedId ? 'selected-row' : undefined}
              onClick={() => setSelectedId(row.id)}
            >
              <td>{row.name}</td>
              <td>{row.job}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
