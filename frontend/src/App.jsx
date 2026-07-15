import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

// Layouts
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { TechnicianLayout } from './layouts/TechnicianLayout.jsx';
import { PublicLayout } from './layouts/PublicLayout.jsx';

// Pages
import { HomePage } from './pages/home/HomePage.jsx';
import { LoginPage } from './pages/login/LoginPage.jsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.jsx';
import { AssetsListPage } from './pages/assets-list/AssetsListPage.jsx';
import { CreateAssetPage } from './pages/create-asset/CreateAssetPage.jsx';
import { AssetDetailPage } from './pages/asset-detail/AssetDetailPage.jsx';
import { IssuesListPage } from './pages/issues-list/IssuesListPage.jsx';
import { PublicAssetPage } from './pages/public-asset/PublicAssetPage.jsx';
import { ReportIssuePage } from './pages/report-issue/ReportIssuePage.jsx';
import { IssueStatusLookupPage } from './pages/issue-status-lookup/IssueStatusLookupPage.jsx';
import { TechnicianDashboard } from './pages/technician-dashboard/TechnicianDashboard.jsx';
import { IssueWorkPage } from './pages/issue-work/IssueWorkPage.jsx';
import { BulkPrintPage } from './pages/bulk-print/BulkPrintPage.jsx';
import { ManageTeamPage } from './pages/manage-team/ManageTeamPage.jsx';
// =================================================================================================

// Route guards
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'technician' ? '/technician' : '/admin'} replace />;
  }

  return children;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routing layout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="public/lookup" element={<IssueStatusLookupPage />} />
            <Route path="public/assets/:slug" element={<PublicAssetPage />} />
            <Route path="public/assets/:slug/report" element={<ReportIssuePage />} />
          </Route>

          {/* Login router */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="assets" element={<AssetsListPage />} />
            <Route path="assets/new" element={<CreateAssetPage />} />
            <Route path="assets/:id" element={<AssetDetailPage />} />
            <Route path="assets/bulk-print" element={<BulkPrintPage />} />
            <Route path="issues" element={<IssuesListPage />} />
            <Route path="team" element={<ManageTeamPage />} />
          </Route>

          {/* Technician routes protected */}
          <Route
            path="/technician"
            element={
              <ProtectedRoute allowedRoles={['technician']}>
                <TechnicianLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TechnicianDashboard />} />
            <Route path="issues/:id/work" element={<IssueWorkPage />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
