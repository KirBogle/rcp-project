import { Provider } from 'react-redux';
import Employees from './employees/components/Employees';
import LoginView from './login/LoginView';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <LoginView />
      <Employees />
    </Provider>
  );
}
