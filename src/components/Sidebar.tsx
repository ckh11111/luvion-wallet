import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Sidebar = () => {
  const { t } = useTranslation();

  const getStyle = ({ isActive }: { isActive: boolean }) => ({
    className: `text-sm transition-all duration-200 cursor-pointer no-underline block ${
      isActive ? 'text-slate-900 font-bold opacity-100' : 'text-slate-400 font-medium opacity-80'
    }`,
  });

  return (
    <nav className="flex flex-col gap-8 pt-12 pl-8 w-48 shrink-0">
      <div className="text-xl font-black italic tracking-tighter mb-8 text-slate-900 select-none">
        LUVION
      </div>

      <NavLink to="/assets" className={({ isActive }) => getStyle({ isActive }).className}>
        {t('assets')}
      </NavLink>
      <NavLink to="/recovery" className={({ isActive }) => getStyle({ isActive }).className}>
        {t('recovery')}
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => getStyle({ isActive }).className}>
        {t('settings')}
      </NavLink>
    </nav>
  );
};
