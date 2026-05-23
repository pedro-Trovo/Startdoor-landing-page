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
          className="mr-4 rounded-lg p-2 text-sm transition-colors md:mr-0"
          style={{ color: 'var(--grey-300)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-200)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-300)')}
          title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <a
          href="https://github.com/Balbinao/Startdoor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--purple-500)', color: 'var(--grey-100)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-400)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          GitHub
        </a>
      </div>
    </header>
  );
}
