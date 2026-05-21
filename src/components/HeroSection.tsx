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
            className="rounded-lg border px-8 py-3 text-sm font-medium transition-all"
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
            Código Fonte
          </a>
        </div>
      </div>
    </section>
  );
}
