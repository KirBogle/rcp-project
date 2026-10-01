import EmployeeAPI from './service';

const actions = ['Добавить', 'Изменить', 'Удалить'];

export default function TableView() {
  const rows = EmployeeAPI.all();

  return (
    <div className="container">
      <h1>Таблица</h1>
      <div className="toolbar">
        {actions.map((label) => (
          <button key={label} type="button" onClick={() => console.log(label)}>
            {label}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.job}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
