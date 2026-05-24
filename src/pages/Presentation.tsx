import { MoonIcon, SunIcon } from '@components/ThemeIcons';
import { useTheme } from '@contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  { id: 'cover', label: 'Capa' },
  { id: 'problem', label: 'Problema' },
  { id: 'motivations', label: 'Motivações' },
  { id: 'objectives', label: 'Objetivos' },
  { id: 'features', label: 'Funcionalidades' },
  { id: 'tech', label: 'Tecnologias' },
  { id: 'future', label: 'Futuro' },
  { id: 'qa', label: 'Dúvidas' },
  { id: 'thanks', label: 'Obrigado' },
];

const MOTIVATIONS = [
  {
    icon: '🔍',
    title: 'Transparência no Mercado de Estágio',
    desc: 'Estudantes tomam decisões sem informação sobre a realidade das empresas — queremos mudar isso.',
  },
  {
    icon: '📊',
    title: 'Decisão Baseada em Dados',
    desc: 'Transformar experiências individuais em dados estruturados para escolhas mais conscientes.',
  },
  {
    icon: '🔄',
    title: 'Redução de Turnover',
    desc: 'Ajudar empresas a atrair talentos alinhados com sua cultura, diminuindo a rotatividade.',
  },
  {
    icon: '⭐',
    title: 'Valorização do Estagiário',
    desc: 'Dar voz aos estudantes para que suas experiências ajudem a melhorar o ambiente de estágio.',
  },
];

const OBJECTIVES = [
  'Criar uma plataforma colaborativa onde estudantes registram avaliações detalhadas sobre empresas estagiadas',
  'Disponibilizar avaliação quantitativa em 12 competências (notas 1 a 5) + relato textual da experiência',
  'Implementar algoritmo de match que compara expectativas do estudante com médias reais da empresa',
  'Integrar IA Gemini para gerar textos explicativos personalizados sobre o resultado do match',
  'Oferecer busca avançada com filtros combináveis por nome, setor e faixa de nota',
  'Fornecer autenticação segura com JWT e recuperação de senha por email',
];

const FUTURE_FEATURES = [
  {
    icon: '📈',
    title: 'Dashboard com Gráficos e Indicadores',
    desc: 'Área visual com estatísticas como evolução de notas, empresas mais bem avaliadas e tendências do mercado.',
  },
  {
    icon: '🔔',
    title: 'Sistema de Notificações e Lembretes',
    desc: 'Alertas para novos comentários, respostas de empresas e lembretes para avaliar experiências recentes.',
  },
  {
    icon: '🔗',
    title: 'Integração com LinkedIn',
    desc: 'Permitir que estudantes importem seu perfil profissional e compartilhem avaliações de forma integrada.',
  },
  {
    icon: '🏆',
    title: 'Gamificação',
    desc: 'Sistema de conquistas e pontuação para incentivar avaliações detalhadas e participação ativa.',
  },
];

const SKILL_ICONS: Record<string, string> = {
  React: 'react',
  TypeScript: 'ts',
  Tailwind: 'tailwindcss',
  Vite: 'vite',
  Java: 'java',
  Spring: 'spring',
  MySQL: 'mysql',
  Docker: 'docker',
  Figma: 'figma',
  Nginx: 'nginx',
  'GitHub Actions': 'githubactions',
};

const TECH_COLORS: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  Tailwind: '#06B6D4',
  Vite: '#646CFF',
  MobX: '#FF9955',
  'React Router': '#CA4245',
  'React Hook Form': '#EC5990',
  Zod: '#3E67B1',
  Axios: '#5A29E4',
  'Chart.js': '#FF6384',
  Java: '#ED8B00',
  Spring: '#6DB33F',
  JWT: '#000000',
  'JPA / Hibernate': '#59666C',
  'Gemini API': '#8E75B2',
  JavaMailSender: '#ED8B00',
  MVC: '#6DB33F',
  Lombok: '#185B5B',
  MySQL: '#4479A1',
  Docker: '#2496ED',
  Nginx: '#009639',
  'GitHub Actions': '#2088FF',
  Figma: '#F24E1E',
  Swagger: '#85EA2D',
  'Docker Hub': '#2496ED',
  BCrypt: '#003545',
};

export default function Presentation() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    slides.forEach((slide, index) => {
      const el = document.getElementById(slide.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSlide(index);
              setVisible(prev => new Set(prev).add(slide.id));
            }
          });
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="relative">
      <style>{`
        @media print {
          @page { margin: 0; size: landscape; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          nav, .no-print { display: none !important; }
          section { min-height: 100vh !important; height: 100vh !important; page-break-after: always; break-after: page; padding: 2rem !important; }
          section:last-child { page-break-after: auto; }
          * { box-shadow: none !important; text-shadow: none !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="no-print fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center justify-center"
            title={s.label}
          >
            <span
              className="block h-2.5 w-2.5 rounded-full transition-all"
              style={{
                backgroundColor: i === activeSlide ? 'var(--purple-200)' : 'var(--grey-600)',
                transform: i === activeSlide ? 'scale(1.4)' : 'scale(1)',
              }}
            />
            <span
              className="absolute right-5 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] opacity-0 transition-opacity group-hover:opacity-100"
              style={{ backgroundColor: 'var(--grey-900)', color: 'var(--grey-200)' }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => navigate('/')}
        className="no-print fixed left-3 top-3 z-50 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
        style={{ backgroundColor: 'var(--grey-900)', color: 'var(--grey-300)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--grey-900)')}
      >
        {'←'} Início
      </button>

      <button
        onClick={toggleTheme}
        className="no-print fixed right-3 top-3 z-50 rounded-lg p-2 transition-all"
        style={{ color: 'var(--grey-300)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-200)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-300)')}
        title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      >
        {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
      </button>

      <div className="no-print fixed top-0 left-0 right-0 z-40 h-0.5" style={{ backgroundColor: 'var(--grey-800)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${((activeSlide + 1) / slides.length) * 100}%`, backgroundColor: 'var(--purple-300)' }}
        />
      </div>

      {/* ===== 1. COVER ===== */}
      <Slide id="cover" bg="var(--grey-1300)">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <img src="/startdoor_logo1_s_correto_banner.svg" alt="Startdoor" className="mb-6 w-full max-w-sm" />
          <p className="mb-1 text-lg font-light md:text-xl" style={{ color: 'var(--grey-200)' }}>
            Plataforma Colaborativa de Avaliação de Experiências de Estágio
          </p>
          <p className="mb-6 text-xs" style={{ color: 'var(--grey-400)' }}>
            TCC — FATEC Ipiranga — Análise e Desenvolvimento de Sistemas
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs" style={{ color: 'var(--grey-400)' }}>
            <span>Afonso Scrivani <span style={{ color: 'var(--grey-500)' }}>(Documentador)</span></span>
            <span>Gustavo Balbino <span style={{ color: 'var(--grey-500)' }}>(Backend)</span></span>
            <span>Gustavo Soares <span style={{ color: 'var(--grey-500)' }}>(Frontend)</span></span>
            <span>Lucas Okokama <span style={{ color: 'var(--grey-500)' }}>(Frontend)</span></span>
            <span>Pedro Trovo <span style={{ color: 'var(--grey-500)' }}>(Backend)</span></span>
          </div>
        </div>
      </Slide>

      {/* ===== 2. O PROBLEMA ===== */}
      <Slide id="problem" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="01" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            O Problema
          </h2>

          <div className="mb-6 rounded-xl p-6" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              A busca por estágio é uma etapa decisiva na vida acadêmica, mas os estudantes enfrentam uma
              <strong> grande assimetria de informação</strong>. Não há transparência sobre como é o dia a dia,
              a cultura, o aprendizado e os benefícios reais de cada empresa.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-2 block text-lg">{'❌'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--red-100)' }}>Consequências</h3>
              <ul className="space-y-1.5 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Decisões baseadas apenas em descrições genéricas de vagas</li>
                <li>{'•'} Alta rotatividade por expectativas desalinhadas</li>
                <li>{'•'} Estagnação profissional em ambientes inadequados</li>
                <li>{'•'} Frustração e desmotivação durante o estágio</li>
              </ul>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-2 block text-lg">{'💡'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--green-100)' }}>Oportunidade</h3>
              <ul className="space-y-1.5 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Centralizar relatos de estagiários em um único lugar</li>
                <li>{'•'} Transformar experiências individuais em dados acessíveis</li>
                <li>{'•'} Permitir escolhas mais conscientes e alinhadas ao perfil</li>
                <li>{'•'} Incentivar empresas a melhorar sua reputação</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 3. NOSSAS MOTIVAÇÕES ===== */}
      <Slide id="motivations" bg="var(--grey-1300)">
        <div className="mx-auto max-w-5xl">
          <SNum n="02" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Nossas Motivações
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Por que decidimos construir o Startdoor
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {MOTIVATIONS.map((m, i) => (
              <div
                key={m.title}
                className="rounded-xl p-5 opacity-0 transition-all duration-500"
                style={{
                  backgroundColor: 'var(--grey-1100)',
                  border: '1px solid var(--grey-800)',
                  transform: visible.has('motivations') ? 'translateY(0)' : 'translateY(15px)',
                  opacity: visible.has('motivations') ? 1 : 0,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span className="mb-2 block text-2xl">{m.icon}</span>
                <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>{m.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 4. OBJETIVOS ESPECÍFICOS ===== */}
      <Slide id="objectives" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="03" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Objetivos Específicos
          </h2>

          <div className="space-y-3">
            {OBJECTIVES.map((obj, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl p-4 opacity-0 transition-all duration-500"
                style={{
                  backgroundColor: 'var(--grey-1100)',
                  border: '1px solid var(--grey-800)',
                  transform: visible.has('objectives') ? 'translateX(0)' : 'translateX(-15px)',
                  opacity: visible.has('objectives') ? 1 : 0,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: 'var(--purple-600)', color: 'var(--purple-100)' }}
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-200)' }}>{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 5. PRINCIPAIS FUNCIONALIDADES ===== */}
      <Slide id="features" bg="var(--grey-1300)">
        <div className="mx-auto max-w-5xl">
          <SNum n="04" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Principais Funcionalidades
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            O que o Startdoor oferece para estudantes e empresas
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🔍', title: 'Pesquisar Empresas', desc: 'Busca por nome, setor e faixa de nota com resultados paginados' },
              { icon: '⭐', title: 'Avaliações', desc: 'Notas de 1 a 5 em 12 competências mais relato textual da experiência' },
              { icon: '📊', title: 'Gráfico Radar', desc: 'Compara visualmente suas expectativas com as médias reais da empresa' },
              { icon: '📈', title: 'Match Automático', desc: 'Calcula se a empresa atende ≥70% das suas expectativas' },
              { icon: '🤖', title: 'IA Gemini', desc: 'Gera um texto explicativo personalizado justificando o match' },
              { icon: '❤️', title: 'Favoritar', desc: 'Salve empresas de interesse para consultar depois' },
              { icon: '💬', title: 'Comentários', desc: 'Feedbacks com moderação de anonimato para proteger privacidade' },
              { icon: '🔐', title: 'Autenticação', desc: 'Login seguro com token JWT e senhas protegidas por hash' },
              { icon: '📧', title: 'Recuperar Senha', desc: 'Redefinição de senha via email com código de verificação' },
            ].map(f => (
              <div
                key={f.title}
                className="rounded-xl p-4 text-center transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}
              >
                <span className="mb-2 block text-2xl">{f.icon}</span>
                <h3 className="mb-1 text-sm font-semibold" style={{ color: 'var(--grey-100)' }}>{f.title}</h3>
                <p className="text-xs" style={{ color: 'var(--grey-400)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 6. TECNOLOGIAS ===== */}
      <Slide id="tech" bg="var(--grey-1300)">
        <div className="mx-auto max-w-5xl">
          <SNum n="05" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Tecnologias Utilizadas
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'Frontend', c: 'var(--purple-300)', items: ['React', 'TypeScript', 'Tailwind', 'Vite', 'MobX', 'React Router', 'React Hook Form', 'Zod', 'Axios', 'Chart.js'] },
              { t: 'Backend e IA', c: 'var(--blue-100)', items: ['Java', 'Spring', 'JWT', 'JPA / Hibernate', 'Gemini API', 'JavaMailSender', 'MVC', 'Lombok'] },
              { t: 'DevOps e Design', c: 'var(--green-100)', items: ['MySQL', 'Docker', 'Nginx', 'GitHub Actions', 'Figma', 'Swagger', 'Docker Hub', 'BCrypt'] },
            ].map(cat => (
              <div key={cat.t} className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: cat.c }}>{cat.t}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => {
                    const color = TECH_COLORS[item];
                    const iconId = SKILL_ICONS[item];
                    return (
                      <span key={item} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap"
                        style={{
                          backgroundColor: color ? `${color}20` : 'var(--grey-800)',
                          color: color ?? 'var(--grey-300)',
                          border: `1px solid ${color ? `${color}40` : 'var(--grey-700)'}`,
                        }}
                      >
                        {iconId ? <img src={`https://skillicons.dev/icons?i=${iconId}`} alt="" className="h-4 w-4" /> : null}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 7. IMPLEMENTAÇÕES FUTURAS ===== */}
      <Slide id="future" bg="var(--grey-1300)">
        <div className="mx-auto max-w-5xl">
          <SNum n="06" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Implementações Futuras
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Próximos passos para evolução da plataforma
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {FUTURE_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="rounded-xl p-5 opacity-0 transition-all duration-500"
                style={{
                  backgroundColor: 'var(--grey-1100)',
                  border: '1px solid var(--grey-800)',
                  transform: visible.has('future') ? 'translateY(0)' : 'translateY(15px)',
                  opacity: visible.has('future') ? 1 : 0,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span className="mb-2 block text-2xl">{f.icon}</span>
                <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 10. DÚVIDAS? ===== */}
      <Slide id="qa" bg="var(--grey-1200)">
        <div className="mx-auto max-w-3xl text-center">
          <SNum n="07" />
          <h2 className="mb-6 text-4xl font-bold md:text-5xl" style={{ color: 'var(--purple-100)' }}>
            Dúvidas e Perguntas
          </h2>
          <p className="text-lg" style={{ color: 'var(--grey-300)' }}>
            Estamos abertos para perguntas!
          </p>
        </div>
      </Slide>

      {/* ===== 9. OBRIGADO! ===== */}
      <Slide id="thanks" bg="var(--grey-1300)">
        <div className="mx-auto max-w-3xl text-center">
          <SNum n="08" />
          <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: 'var(--purple-100)' }}>
            Obrigado pela Atenção!!!
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-300)' }}>
            Acesse o projeto completo nos links abaixo
          </p>

          <div className="mx-auto mb-8 flex max-w-md flex-col gap-3">
            <a
              href="https://github.com/Balbinao/Startdoor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)', color: 'var(--grey-200)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple-300)'; e.currentTarget.style.color = 'var(--purple-100)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--grey-800)'; e.currentTarget.style.color = 'var(--grey-200)'; }}
            >
              <img src="https://skillicons.dev/icons?i=github" alt="GitHub" className="h-5 w-5" />
              Repositório no GitHub
            </a>
            <a
              href="https://www.figma.com/proto/uMYDnHDMyCmws5SYpOI9VS/AvaliarEstagios_Prototipo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)', color: 'var(--grey-200)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple-300)'; e.currentTarget.style.color = 'var(--purple-100)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--grey-800)'; e.currentTarget.style.color = 'var(--grey-200)'; }}
            >
              <img src="https://skillicons.dev/icons?i=figma" alt="Figma" className="h-5 w-5" />
              Protótipo no Figma
            </a>
            <button
              onClick={() => navigate('/')}
              className="rounded-xl px-5 py-3 text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--purple-500)', color: 'var(--grey-100)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-400)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
            >
              {'←'} Voltar ao Início
            </button>
          </div>

          <p className="text-[10px]" style={{ color: 'var(--grey-500)' }}>
            FATEC Ipiranga — ADS — 2025/2026
          </p>
        </div>
      </Slide>
    </div>
  );
}

/* ===== SUB-COMPONENTS ===== */

function Slide({ id, bg, children }: { id: string; bg: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex min-h-screen items-center px-6 py-20 md:px-12" style={{ backgroundColor: bg }}>
      {children}
    </section>
  );
}

function SNum({ n }: { n: string }) {
  return (
    <span
      className="mb-3 inline-block rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
      style={{ backgroundColor: 'var(--purple-600)', color: 'var(--purple-100)' }}
    >
      Slide {n}
    </span>
  );
}


