import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../store/actions/employeeActions';

export default function Employees() {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employee);

  // Список запрашивается один раз, когда компонент появляется на странице.
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container">
      <h1>Сотрудники</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} — {employee.job}
          </li>
        ))}
      </ul>
    </div>
  );
}
