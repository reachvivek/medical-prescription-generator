import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import MockProtectedRoute from './components/auth/MockProtectedRoute';
import MockLayout from './components/layout/MockLayout';
import QuickStart from './pages/QuickStart';
import DashboardMock from './pages/DashboardMock';
import ProfileMock from './pages/ProfileMock';
import CreatePrescriptionNew from './pages/CreatePrescriptionNew';

// DEMO MODE: Using mock authentication and localStorage
// To switch to real backend:
// 1. Replace Mock* components with real versions
// 2. Uncomment Login/Signup routes
// 3. Update .env.local with Supabase credentials
// 4. Run Supabase setup SQL

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<QuickStart />} />

          {/* Protected Routes (Mock Mode) */}
          <Route
            element={
              <MockProtectedRoute>
                <MockLayout />
              </MockProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardMock />} />
            <Route path="profile" element={<ProfileMock />} />
            <Route path="create-prescription" element={<CreatePrescriptionNew />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
