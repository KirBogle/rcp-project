import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth';
import LoginView from './LoginView';
import TableView from './TableView';

function RequireAuth({ children }) {
  const { isAuthorized } = useAuth();

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/table" replace />} />
      <Route path="/login" element={<LoginView />} />
      <Route
        path="/table"
        element={
          <RequireAuth>
            <TableView />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
