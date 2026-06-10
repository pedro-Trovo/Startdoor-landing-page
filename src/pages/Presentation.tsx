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
  { id: 'demo', label: 'Demonstração' },
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
  'Investigar as principais dificuldades enfrentadas por estudantes na busca e avaliação de oportunidades de estágio',
  'Identificar quais informações são consideradas relevantes pelos estudantes na escolha de oportunidades de estágio',
  'Analisar como a ausência de avaliações e relatos compartilhados impacta a tomada de decisão dos estudantes',
  'Propor uma solução colaborativa que permita o compartilhamento de experiências relacionadas a processos seletivos e ambientes de estágio',
];

const FUTURE_FEATURES = [
  {
    icon: '🔒',
    title: 'Validação de Atuação',
    desc: 'Mecanismos para comprovar que o usuário realmente atuou na empresa, via documentos ou APIs externas, aumentando a confiabilidade das informações compartilhadas.',
  },
  {
    icon: '🧠',
    title: 'IA Avançada',
    desc: 'Interpretação mais aprofundada de compatibilidade, análise comportamental e personalização da experiência do usuário.',
  },
  {
    icon: '💬',
    title: 'Análise de Sentimentos',
    desc: 'Interpretação automática de opiniões positivas, negativas ou neutras nos comentários, oferecendo métricas adicionais para comparação entre empresas.',
  },
  {
    icon: '⭐',
    title: 'Sistema de Reputação',
    desc: 'Pontuação para usuários e organizações, incentivando avaliações confiáveis e moderação automática com IA.',
  },
  {
    icon: '📱',
    title: 'Experiência do Usuário',
    desc: 'Notificações inteligentes, autenticação Google/LinkedIn, histórico de pesquisas, acessibilidade e aplicativo mobile próprio.',
  },
  {
    icon: '🚀',
    title: 'Expansão para Novos Contextos',
    desc: 'Programas trainee, vagas júnior e oportunidades para recém-formados, acompanhando o desenvolvimento profissional do usuário.',
  },
];

const TECH_BADGES: Record<string, { name: string; color: string; logo?: string; url: string }> = {
  React: { name: 'React', color: '#61DAFB', logo: 'react', url: 'https://react.dev' },
  TypeScript: { name: 'TypeScript', color: '#3178C6', logo: 'typescript', url: 'https://www.typescriptlang.org' },
  Tailwind: { name: 'Tailwind', color: '#06B6D4', logo: 'tailwindcss', url: 'https://tailwindcss.com' },
  Vite: { name: 'Vite', color: '#646CFF', logo: 'vite', url: 'https://vitejs.dev' },
  MobX: { name: 'MobX', color: '#FF9955', logo: 'mobx', url: 'https://mobx.js.org' },
  'React Router': { name: 'React Router', color: '#CA4245', logo: 'reactrouter', url: 'https://reactrouter.com' },
  'React Hook Form': { name: 'React Hook Form', color: '#EC5990', logo: 'reacthookform', url: 'https://react-hook-form.com' },
  Zod: { name: 'Zod', color: '#3E67B1', logo: 'zod', url: 'https://zod.dev' },
  Axios: { name: 'Axios', color: '#5A29E4', logo: 'axios', url: 'https://axios-http.com' },
  'Chart.js': { name: 'Chart.js', color: '#FF6384', logo: 'chartdotjs', url: 'https://www.chartjs.org' },
  Java: { name: 'Java', color: '#ED8B00', logo: 'openjdk', url: 'https://www.java.com' },
  Spring: { name: 'Spring', color: '#6DB33F', logo: 'spring', url: 'https://spring.io' },
  JWT: { name: 'JWT', color: '#000000', logo: 'jsonwebtokens', url: 'https://jwt.io' },
  'JPA / Hibernate': { name: 'Hibernate', color: '#59666C', logo: 'hibernate', url: 'https://hibernate.org' },
  'Gemini API': { name: 'Gemini', color: '#8E75B2', logo: 'googlegemini', url: 'https://deepmind.google/technologies/gemini' },
  Lombok: { name: 'Lombok', color: '#185B5B', logo: 'lombok', url: 'https://projectlombok.org' },
  MySQL: { name: 'MySQL', color: '#4479A1', logo: 'mysql', url: 'https://www.mysql.com' },
  Docker: { name: 'Docker', color: '#2496ED', logo: 'docker', url: 'https://www.docker.com' },
  Nginx: { name: 'Nginx', color: '#009639', logo: 'nginx', url: 'https://nginx.org' },
  'GitHub Actions': { name: 'GitHub Actions', color: '#2088FF', logo: 'githubactions', url: 'https://github.com/features/actions' },
  Figma: { name: 'Figma', color: '#F24E1E', logo: 'figma', url: 'https://www.figma.com' },
  Swagger: { name: 'Swagger', color: '#85EA2D', logo: 'swagger', url: 'https://swagger.io' },
  'Docker Hub': { name: 'Docker Hub', color: '#2496ED', logo: 'docker', url: 'https://hub.docker.com' },
  BCrypt: { name: 'BCrypt', color: '#003545', url: 'https://en.wikipedia.org/wiki/Bcrypt' },
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
        className="no-print fixed right-14 top-3 z-50 rounded-lg p-2 transition-all"
        style={{ color: 'var(--grey-300)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-200)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-300)')}
        title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
      >
        {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
      </button>

      {/* Export PDF button */}
      <button
        onClick={() => window.print()}
        className="no-print fixed right-3 top-3 z-50 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
        style={{ backgroundColor: 'var(--grey-900)', color: 'var(--grey-300)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--grey-900)')}
      >
        {'🖨️'} Exportar PDF
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
              { icon: '📈', title: 'Match Automático', desc: 'Calcula se a empresa atende ≥80% das suas expectativas' },
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
              { t: 'Backend e IA', c: 'var(--blue-100)', items: ['Java', 'Spring', 'JWT', 'JPA / Hibernate', 'Gemini API'] },
              { t: 'DevOps e Design', c: 'var(--green-100)', items: ['MySQL', 'Docker', 'Nginx', 'GitHub Actions', 'Figma', 'Swagger', 'Docker Hub', 'BCrypt'] },
            ].map(cat => (
              <div key={cat.t} className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: cat.c }}>{cat.t}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => {
                    const b = TECH_BADGES[item];
                    if (!b) return <span key={item} className="text-[10px]" style={{ color: 'var(--grey-500)' }}>{item}</span>;
                    const url = `https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.color.slice(1)}?style=for-the-badge${b.logo ? `&logo=${b.logo}&logoColor=white` : ''}`;
                    return (
                      <a key={item} href={b.url} target="_blank" rel="noopener noreferrer" title={b.name}>
                        <img alt={b.name} src={url} className="h-6 w-auto" />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 7. DEMONSTRAÇÃO ===== */}
      <Slide id="demo" bg="var(--grey-1300)">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            {'🖥️'} Demonstração do Sistema
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
            demonstrando como a aplicação funciona na prática
          </p>
        </div>
      </Slide>

      {/* ===== 8. IMPLEMENTAÇÕES FUTURAS ===== */}
      <Slide id="future" bg="var(--grey-1300)">
        <div className="mx-auto max-w-5xl">
          <SNum n="06" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Implementações Futuras
          </h2>
          <p className="mb-3 text-sm" style={{ color: 'var(--grey-400)' }}>
            Próximos passos para evolução da plataforma
          </p>

          <p className="mb-6 text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
            Embora os resultados obtidos tenham sido satisfatórios, a plataforma ainda apresenta
            possibilidades significativas de evolução. As funcionalidades abaixo foram planejadas
            para versões futuras.
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

          <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--grey-400)' }}>
            Espera-se que a Startdoor continue evoluindo como uma plataforma colaborativa voltada
            à transparência e ao compartilhamento de experiências profissionais para estudantes e
            profissionais em início de carreira.
          </p>
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
          <div className="mx-auto mb-8 flex max-w-md flex-col gap-3">
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
            FATEC Ipiranga — ADS — 2026
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


