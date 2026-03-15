import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLuvionStore } from './store/useLuvionStore';
import LuvionTerrariaWalletRestore from './pages/LuvionTerrariaWalletRestore';
import { Landing } from './pages/Landing';

const AppContent = () => {
  const s = useLuvionStore();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    if (isLanding) return;
    s.refreshNodes();
    s.refreshAllBalances();
    const timerNodes = setInterval(() => s.refreshNodes(), 5000);
    const timerBalances = setInterval(() => s.refreshAllBalances(), 15000);
    return () => {
      clearInterval(timerNodes);
      clearInterval(timerBalances);
    };
  }, []);

  if (isLanding) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/assets" replace />} />
      <Route path="/assets" element={<LuvionTerrariaWalletRestore />} />
      <Route path="/recovery" element={<LuvionTerrariaWalletRestore />} />
      <Route path="/settings" element={<LuvionTerrariaWalletRestore />} />
      <Route path="*" element={<Navigate to="/assets" replace />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
