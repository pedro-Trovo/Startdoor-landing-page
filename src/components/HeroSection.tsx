import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16"
      style={{
        background: 'radial-gradient(ellipse at center, var(--purple-600) 0%, var(--grey-1300) 70%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, var(--purple-500) 0%, transparent 50%), radial-gradient(circle at 75% 75%, var(--purple-400) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <img src="/startdoor_logo1_s_correto_banner.svg" alt="Startdoor" className="mb-8 w-full max-w-lg" />

        <p className="mb-4 text-xl font-light md:text-2xl" style={{ color: 'var(--grey-200)' }}>
          Plataforma web colaborativa dedicada à avaliação e ao compartilhamento de experiências de estágio.
        </p>

        <p className="mb-10 max-w-2xl text-sm md:text-base" style={{ color: 'var(--grey-400)' }}>
          Transforme experiências individuais em informação acessível para ajudar estudantes a escolherem
          as melhores oportunidades de estágio.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('/presentation')}
            className="rounded-lg px-8 py-3 text-sm font-semibold transition-all"
            style={{ backgroundColor: 'var(--purple-300)', color: 'var(--grey-100)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-200)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--purple-300)')}
          >
            Ver Apresentação do Projeto
          </button>

          <a
            href="https://github.com/Balbinao/Startdoor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border px-8 py-3 text-sm font-medium transition-all"
            style={{ borderColor: 'var(--grey-600)', color: 'var(--grey-200)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--purple-300)';
              e.currentTarget.style.color = 'var(--purple-100)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--grey-600)';
              e.currentTarget.style.color = 'var(--grey-200)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
            Código Fonte
          </a>
        </div>
      </div>
    </section>
  );
}
