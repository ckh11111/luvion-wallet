import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLuvionStore } from './store/useLuvionStore';
import { Sidebar } from './components/Sidebar';
import { Assets } from './pages/Assets';
import { ShardRecovery } from './pages/ShardRecovery';
import { Settings } from './pages/Settings';
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
    <div className="flex h-screen w-full bg-[#F8FAFC] text-[#1E293B]">
      <aside className="w-64 shrink-0 bg-white border-r border-slate-200 p-8 flex flex-col">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-auto p-12">
        <Routes>
          <Route path="/assets" element={<Assets />} />
          <Route path="/recovery" element={<ShardRecovery />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/assets" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
