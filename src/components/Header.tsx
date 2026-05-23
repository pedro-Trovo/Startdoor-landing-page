import { MoonIcon, SunIcon } from '@components/ThemeIcons';
import { useTheme } from '@contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Equipe', href: '/#equipe' },
  { label: 'Apresentação do Projeto', href: '/presentation' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isPresentation = location.pathname === '/presentation';

  if (isPresentation) return null;

  return (
    <header
      style={{ backgroundColor: 'var(--grey-1300)', borderBottom: '1px solid var(--grey-800)' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-3">
          <img src="/startdoor_icone.svg" alt="Startdoor" className="h-8 w-8" />
          <span className="text-lg font-bold tracking-wide" style={{ color: 'var(--grey-100)' }}>
            Startdoor
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--grey-300)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-200)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-300)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-sm transition-colors"
          style={{ color: 'var(--grey-300)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-200)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-300)')}
          title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
