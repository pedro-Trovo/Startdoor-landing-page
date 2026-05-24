import { MoonIcon, SunIcon } from '@components/ThemeIcons';
import { useTheme } from '@contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  { id: 'cover', label: 'Introdução' },
  { id: 'overview', label: 'O que é' },
  { id: 'flow-1', label: 'Cadastro e Pesquisa' },
  { id: 'flow-2', label: 'Avaliação e Match' },
  { id: 'flow-3', label: 'IA e Favoritos' },
  { id: 'home', label: 'Home/Dashboard' },
  { id: 'match-1', label: 'Match — Fórmula' },
  { id: 'match-2', label: 'Match — Exemplo' },
  { id: 'radar', label: 'Gráfico Radar' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'ia', label: 'IA Gemini' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'permissoes', label: 'Permissões' },
  { id: 'comentarios', label: 'Comentários' },
  { id: 'infra', label: 'Infraestrutura' },
  { id: 'cta', label: 'Encerramento' },
];

export default function Explanation() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

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

      {/* Navigation dots */}
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

      {/* Início button */}
      <button
        onClick={() => navigate('/')}
        className="no-print fixed left-3 top-3 z-50 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
        style={{ backgroundColor: 'var(--grey-900)', color: 'var(--grey-300)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--grey-900)')}
      >
        {'←'} Início
      </button>

      {/* Theme toggle */}
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

      {/* Progress bar */}
      <div className="no-print fixed top-0 left-0 right-0 z-40 h-0.5" style={{ backgroundColor: 'var(--grey-800)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${((activeSlide + 1) / slides.length) * 100}%`, backgroundColor: 'var(--purple-300)' }}
        />
      </div>

      {/* ===== 1. COVER ===== */}
      <Slide id="cover" bg="var(--grey-1300)">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: 'var(--purple-600)', color: 'var(--purple-100)' }}
          >
            Guia Rápido do Projeto
          </span>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: 'var(--purple-100)' }}>
            Startdoor — Explicação do Projeto
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--grey-300)' }}>
            Este guia foi preparado para ajudar você a entender o Startdoor de forma simples e direta.
            Aqui explicamos como a plataforma funciona, como o sistema de match e a inteligência artificial
            se encaixam, e qual o propósito de cada tecnologia — sem jargões desnecessários.
          </p>
        </div>
      </Slide>

      {/* ===== 2. OVERVIEW ===== */}
      <Slide id="overview" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="01" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Afinal, o que é o Startdoor?
          </h2>
          <div className="space-y-4">
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              O Startdoor é uma plataforma web colaborativa onde estudantes que já estagiaram podem avaliar
              as empresas de forma estruturada — e quem ainda busca um estágio pode usar essas informações
              para escolher melhor.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              Os estudantes dão notas de 1 a 5 em 12 competências
              diferentes (como aprendizado, ambiente, benefícios, etc.) e escrevem um relato textual da
              experiência. Tudo isso fica disponível para a comunidade.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              Empresas também podem se cadastrar, criar um perfil público, acompanhar suas avaliações e
              responder comentários.
            </p>
          </div>
        </div>
      </Slide>

      {/* ===== 3. FLOW — CADASTRO E PESQUISA ===== */}
      <Slide id="flow-1" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="02" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Como o sistema funciona?
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            O fluxo principal é simples — etapas 1 e 2
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg" style={{ backgroundColor: 'var(--purple-600)' }}>{'👤'}</span>
              <div className="flex-1">
                <h3 className="mb-3 font-semibold" style={{ color: 'var(--grey-100)' }}>
                  <span style={{ color: 'var(--purple-200)' }}>1.</span> Cadastro e Login
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-800)' }}>
                    <p className="mb-1 text-xs font-bold" style={{ color: 'var(--purple-200)' }}>{'📝'} Criação de conta</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                      Estudantes e empresas criam contas com email e senha. A senha é protegida com criptografia. Também é possível adicionar uma foto de perfil ou logotipo.
                    </p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-800)' }}>
                    <p className="mb-1 text-xs font-bold" style={{ color: 'var(--purple-200)' }}>{'🔑'} Autenticação JWT</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                      Ao logar, o servidor gera um token único enviado no header de toda requisição,
                      informando identidade e permissões sem reenviar a senha.
                    </p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-800)' }}>
                    <p className="mb-1 text-xs font-bold" style={{ color: 'var(--purple-200)' }}>{'🔐'} Recuperação de senha</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                      Usa SMTP para enviar um código numérico de 6 dígitos ao email. O código expira em 15 minutos e autoriza a redefinição da senha.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <StepCard
              number="2"
              icon="🔍"
              title="Pesquisa"
              desc='O estudante pode buscar empresas filtrando por nome (com tolerância a erros de digitação via algoritmo de Levenshtein), setor, faixa de nota, porte, receita e cada uma das 12 competências — totalizando 15 critérios de filtro. Os resultados aparecem paginados, de forma organizada.'
            />
          </div>
        </div>
      </Slide>

      {/* ===== 4. FLOW — AVALIAÇÃO E MATCH ===== */}
      <Slide id="flow-2" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="03" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Como o sistema funciona?
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            O fluxo principal — etapas 3 e 4
          </p>

          <div className="space-y-4">
            <div>
              <StepCard
                number="3"
                icon="⭐"
                title="Avaliação"
                desc="Após estagiar em uma empresa, o estudante a avalia dando notas de 1 a 5 em 12 competências e escrevendo um relato textual. O estudante pode optar por fazer a avaliação de forma anônima — neste caso, seu nome, foto e usuário não ficam visíveis para outras pessoas, aparecendo apenas para ele mesmo em seu histórico pessoal."
              />
              <div className="mt-3 flex items-start gap-3 rounded-lg p-3" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
                <span className="mt-0.5 text-sm">{'💰'}</span>
                <div>
                  <p className="mb-0.5 text-[11px] font-bold" style={{ color: 'var(--blue-100)' }}>Estatísticas salariais</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                    Com base nos salários informados nas avaliações, o sistema calcula automaticamente
                    três indicadores por empresa: piso (25º percentil), teto (75º percentil) e base
                    salarial mediana — exibidos no perfil público da empresa.
                  </p>
                </div>
              </div>
            </div>
            <StepCard
              number="4"
              icon="📊"
              title="Match"
               desc="Antes de avaliar, o estudante define quais notas considera ideais em cada competência. O sistema compara essas expectativas com as médias reais da empresa. Se a compatibilidade for de 80% ou mais, é considerado um match."
            />
          </div>
        </div>
      </Slide>

      {/* ===== 5. FLOW — IA E FAVORITOS ===== */}
      <Slide id="flow-3" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="04" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Como o sistema funciona?
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            O fluxo principal — etapas 5 e 6
          </p>

          <div className="space-y-4">
            <StepCard
              number="5"
              icon="🤖"
              title="Recomendação com IA"
              desc="Quando há match, a inteligência artificial Gemini (do Google) entra em ação. Ela gera um texto explicativo personalizado, em linguagem natural, justificando por que aquela empresa é compatível com o perfil do estudante."
            />
            <StepCard
              number="6"
              icon="❤️"
              title="Favoritar"
              desc="O estudante pode salvar empresas como favoritas para consultar depois, montando uma lista de interesse personalizada."
            />
          </div>
        </div>
      </Slide>

      {/* ===== 6. HOME / DASHBOARD ===== */}
      <Slide id="home" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="05" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Página Inicial — o que o usuário logado vê primeiro?
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            A home do Startdoor exibe um resumo do conteúdo da plataforma para usuários autenticados
          </p>

          <div className="mb-6 grid gap-4 md:grid-cols-2 print:grid-cols-2">
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-3 block text-2xl">{'🕐'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Avaliações Recentes</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                As 4 avaliações mais recentes da plataforma são exibidas na home, com nota geral,
                nome da empresa e, se o autor não optou por anonimato, seu nome e foto.
              </p>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-3 block text-2xl">{'🏆'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Empresas Top</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                As 4 empresas com a maior média geral aparecem em destaque, permitindo conhecer
                as melhores avaliadas de cara, sem precisar pesquisar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
            <span className="mt-0.5 text-lg">{'🔒'}</span>
            <div>
              <p className="mb-1 text-xs font-bold" style={{ color: 'var(--green-100)' }}>Requer autenticação</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                A home e as demais páginas do sistema exigem que o usuário esteja logado.
                O acesso é controlado por token JWT — sem login, não é possível navegar pela
                plataforma.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 7. PORTFÓLIO DE EXPERIÊNCIAS ===== */}
      <Slide id="portfolio" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="06" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Portfólio de Experiências — o histórico do estudante
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Cada estudante pode montar um perfil completo com suas experiências acadêmicas e profissionais
          </p>

          <div className="mb-6 grid gap-4 md:grid-cols-2 print:grid-cols-2">
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-3 block text-2xl">{'🎓'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Experiências Acadêmicas</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                O estudante cadastra cursos, faculdades e certificações — informando instituição,
                modalidade (presencial ou EAD), período e descrição. Tudo fica público em seu perfil.
              </p>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-3 block text-2xl">{'💼'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Experiências Profissionais</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                O estudante registra empregos anteriores vinculados a empresas cadastradas no sistema
                — com cargo, período, modelo de trabalho e descrição. O perfil profissional fica
                completo e público.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
            <span className="mt-0.5 text-lg">{'📝'}</span>
            <div>
              <p className="mb-1 text-xs font-bold" style={{ color: 'var(--green-100)' }}>Gerenciamento completo</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                O estudante pode adicionar, editar e excluir suas experiências a qualquer momento.
                As experiências profissionais são vinculadas a empresas que existem na plataforma,
                garantindo consistência dos dados.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 8. MATCH — FÓRMULA ===== */}
      <Slide id="match-1" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="07" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Sistema de Match — como decidimos se "deu match"?
          </h2>

          <div className="mb-6 rounded-xl p-6 text-center" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="mb-3 text-sm font-medium" style={{ color: 'var(--grey-300)' }}>
              A lógica do match em uma frase:
            </p>
            <p className="text-base font-semibold leading-relaxed md:text-lg" style={{ color: 'var(--purple-100)' }}>
              O estudante define suas expectativas → o sistema calcula a afinidade com gaps ponderados →
              se <span style={{ color: 'var(--green-100)' }}>≥80%</span> de afinidade, é match!
            </p>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <span className="mb-2 block text-lg">{'📐'}</span>
            <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Como funciona o cálculo</h3>
            <ul className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
              <li>{'•'} Estudante define nota ideal (1 a 5) para cada competência — quanto maior a nota, maior o <strong style={{ color: 'var(--grey-200)' }}>peso</strong> dela no resultado</li>
              <li>{'•'} Plataforma calcula a média real da empresa em cada competência</li>
              <li>{'•'} Se a média ≥ expectativa, o gap é zero; se menor, o gap é a diferença</li>
              <li>{'•'} Cada gap é multiplicado pelo peso da competência, gerando um erro ponderado</li>
              <li>{'•'} A afinidade é: <code style={{ color: 'var(--green-100)' }}>((total - erros) / total) × 100</code> — se ≥80%, o match é confirmado</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* ===== 7. MATCH — EXEMPLO ===== */}
      <Slide id="match-2" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="08" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Sistema de Match — exemplo
          </h2>

          <div className="mb-6 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Exemplo prático</h3>

            <div className="mb-4 grid gap-3 md:grid-cols-2 print:grid-cols-2">
              <div className="rounded-lg px-4 py-3" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-700)' }}>
                <p className="mb-1.5 text-[11px] font-bold" style={{ color: 'var(--green-100)' }}>{'✅'} Empresa atingiu ou superou sua nota?</p>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>Nada é somado aos pontos perdidos. A competência não penaliza o match.</p>
              </div>
              <div className="rounded-lg px-4 py-3" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-700)' }}>
                <p className="mb-1.5 text-[11px] font-bold" style={{ color: 'var(--red-100)' }}>{'❌'} Empresa ficou abaixo da sua nota?</p>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>Perde pontos: <strong style={{ color: 'var(--grey-200)' }}>diferença × sua nota</strong>.</p>
              </div>
            </div>

            <div className="mb-4 grid gap-4 md:grid-cols-2 print:grid-cols-2">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-800)' }}>
                <p className="mb-2 text-xs font-bold" style={{ color: 'var(--purple-200)' }}>Aprendizado (sua nota 5)</p>
                <div className="space-y-1 text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                  <p>{'•'} Empresa tem média: <span style={{ color: 'var(--grey-100)' }}>4,7</span></p>
                  <p>{'•'} Ficou abaixo da sua nota? <span style={{ color: 'var(--red-100)' }}>SIM</span></p>
                  <p>{'•'} Diferença: 5 − 4,7 = <span style={{ color: 'var(--grey-100)' }}>0,3</span></p>
                  <p>{'•'} Perdeu: 0,3 × 5 = <span style={{ color: 'var(--green-100)' }}>1,5 pontos</span></p>
                </div>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-800)' }}>
                <p className="mb-2 text-xs font-bold" style={{ color: 'var(--purple-200)' }}>Benefícios (sua nota 2)</p>
                <div className="space-y-1 text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                  <p>{'•'} Empresa tem média: <span style={{ color: 'var(--grey-100)' }}>1</span></p>
                  <p>{'•'} Ficou abaixo da sua nota? <span style={{ color: 'var(--red-100)' }}>SIM</span></p>
                  <p>{'•'} Diferença: 2 − 1 = <span style={{ color: 'var(--grey-100)' }}>1</span></p>
                  <p>{'•'} Perdeu: 1 × 2 = <span style={{ color: 'var(--green-100)' }}>2 pontos</span></p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--grey-1200)', border: '1px solid var(--grey-800)' }}>
              <div className="space-y-1 text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                <p><strong style={{ color: 'var(--grey-200)' }}>TotalMáximo</strong> = soma de (4 × sua nota), ex: (4×5)+(4×2)+... <span style={{ color: 'var(--grey-400)' }}>(4 é a maior diferença na escala 1-5)</span></p>
                <p><strong style={{ color: 'var(--grey-200)' }}>TotalPerdidos</strong> = soma de (diferença × sua nota), ex: 1,5+2+...</p>
                <p><strong style={{ color: 'var(--green-100)' }}>NotaFinal</strong> = ((TotalMáximo − TotalPerdidos) / TotalMáximo) × 100</p>
                <p className="pt-1 text-center font-bold" style={{ color: 'var(--green-100)' }}>Se NotaFinal ≥ 80 → match confirmado!</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--purple-200)' }}>
              As 12 Competências Avaliadas
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-3">
              {['Ambiente', 'Aprendizado', 'Benefícios', 'Cultura', 'Efetivação', 'Entrevista', 'Feedback', 'Infraestrutura', 'Integração', 'Remuneração', 'Rotina', 'Liderança'].map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs" style={{ color: 'var(--grey-300)' }}>
                  <span style={{ color: 'var(--purple-200)' }}>{'▸'}</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 8. GRÁFICO RADAR ===== */}
      <Slide id="radar" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="09" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Gráfico Radar — enxergando o match de forma visual
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Como o sistema ajuda a comparar expectativas e médias reais lado a lado
          </p>

          <div className="mb-6 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <span className="mb-2 block text-lg">{'📊'}</span>
            <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>O que é o Gráfico Radar?</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
              É um gráfico com formato de teia que mostra, em um único visual, as notas ideais
              que o estudante definiu e as médias reais da empresa — tudo sobreposto nos mesmos
              eixos. Cada eixo representa uma das 12 competências. Quanto mais próximo do centro,
              menor a nota; quanto mais próximo da borda, maior.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 print:grid-cols-3">
            {[
              { icon: '🔄', title: 'Comparação visual', desc: 'As expectativas do estudante aparecem como uma linha, e as médias da empresa como outra. Onde elas se aproximam, o match é forte. Onde se afastam, há gaps.' },
              { icon: '✅❌', title: 'Pontos fortes e fracos', desc: 'Uma tabela ao lado do gráfico lista, para cada competência, se a empresa atendeu ou ficou abaixo da expectativa — facilitando a decisão do estudante.' },
              { icon: '🏢🏢', title: 'Comparar empresas', desc: 'O estudante pode ver duas empresas lado a lado no mesmo gráfico radar, com as respectivas médias sobrepostas às suas expectativas — ideal para decidir entre oportunidades.' },
            ].map((c) => (
              <div key={c.title} className="rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <span className="mb-3 block text-2xl">{c.icon}</span>
                <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>{c.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
            <span className="mt-0.5 text-lg">{'📐'}</span>
            <div>
              <p className="mb-1 text-xs font-bold" style={{ color: 'var(--green-100)' }}>Como é feito</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                O gráfico é gerado com a biblioteca Chart.js. O backend fornece os dados
                (expectativas do estudante + médias da empresa) via API, e o frontend monta
                o visual dinamicamente na tela.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 9. IA GEMINI ===== */}
      <Slide id="ia" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="10" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            O papel da Inteligência Artificial (IA Gemini)
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Como a IA do Google gera recomendações personalizadas para cada estudante
          </p>

          <div className="mb-6 grid gap-3 sm:grid-cols-4">
            {[
              { icon: '✅', title: 'Match confirmado', desc: 'O sistema identifica que a empresa atende ≥80% das expectativas do estudante' },
              { icon: '📤', title: 'Dados enviados', desc: 'O backend envia as notas, preferências do estudante e as médias da empresa para a API do Gemini' },
              { icon: '🧠', title: 'IA processa', desc: 'O Gemini analisa os números e gera um texto explicativo personalizado justificando o cálculo do match' },
              { icon: '💬', title: 'Texto exibido', desc: 'A recomendação aparece na plataforma para o estudante ler e entender o match' },
            ].map((step, i) => (
              <div key={step.title} className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <span className="mb-2 block text-2xl">{step.icon}</span>
                <h3 className="mb-1 text-xs font-bold" style={{ color: 'var(--purple-200)' }}>
                  <span style={{ color: 'var(--grey-500)' }}>{i + 1}.</span> {step.title}
                </h3>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>
              {'📋'} O que a IA recebe para gerar o texto
            </h3>
            <div className="grid gap-2 text-sm md:grid-cols-2" style={{ color: 'var(--grey-300)' }}>
              <div className="flex gap-2">
                <span style={{ color: 'var(--purple-200)' }}>{'•'}</span>
                <span>Nome e perfil do estudante + preferências ideais em cada competência</span>
              </div>
              <div className="flex gap-2">
                <span style={{ color: 'var(--purple-200)' }}>{'•'}</span>
                <span>Médias reais da empresa em todas as 12 competências</span>
              </div>
              <div className="flex gap-2">
                <span style={{ color: 'var(--purple-200)' }}>{'•'}</span>
                <span>Setor de interesse e modelo de trabalho desejado</span>
              </div>
              <div className="flex gap-2">
                <span style={{ color: 'var(--purple-200)' }}>{'•'}</span>
                <span>Resultado do match (quais competências foram OK)</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-lg">{'🔒'}</span>
              <div>
                <p className="mb-1 text-xs font-bold" style={{ color: 'var(--green-100)' }}>Integração segura</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                  A comunicação com a API do Gemini é feita exclusivamente pelo backend em Java, utilizando
                  uma chave de API armazenada de forma segura nas variáveis de ambiente — sem expor dados
                  sensíveis ou chaves no frontend. O texto gerado é armazenado no banco de dados para
                  consultas futuras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 10. ARQUITETURA — FRONTEND ===== */}
      <Slide id="frontend" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="11" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Arquitetura — Frontend
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            A camada de interface, que roda no navegador do usuário
          </p>

          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <ul className="space-y-4">
              {[
                'Construído com React e TypeScript — as tecnologias padrão da indústria para interfaces web rápidas e confiáveis.',
                'O visual foi feito com Tailwind CSS, que permite um design consistente e responsivo (funciona bem no celular, tablet e computador).',
                'A comunicação com o servidor é feita via chamadas HTTP organizadas, usando uma biblioteca chamada Axios.',
                'Para navegação entre páginas, usamos o React Router, que permite trocar de tela sem recarregar a página.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--grey-200)' }}>
                  <span style={{ color: 'var(--purple-200)' }}>{'▸'}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Slide>

      {/* ===== 11. ARQUITETURA — BACKEND ===== */}
      <Slide id="backend" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="12" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Arquitetura — Backend
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            O servidor que processa dados, regras de negócio e integrações
          </p>

          <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <ul className="space-y-4">
              {[
                'Desenvolvido em Java com o framework Spring — uma das tecnologias mais consolidadas e seguras para sistemas corporativos.',
                'Os dados ficam armazenados em um banco MySQL, que organiza todas as informações (usuários, empresas, avaliações, etc.) de forma estruturada.',
                'A autenticação é feita com tokens JWT — cada usuário recebe um "token" ao fazer login, que é validado a cada requisição.',
                'A integração com a IA Gemini é feita pelo backend, que chama a API externa do Google de forma segura.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--grey-200)' }}>
                  <span style={{ color: 'var(--purple-200)' }}>{'▸'}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
            <span className="mt-0.5 text-lg">{'📖'}</span>
            <div>
              <p className="mb-1 text-xs font-bold" style={{ color: 'var(--green-100)' }}>Documentação interativa (Swagger)</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                O backend possui documentação automática de todas as rotas da API via Swagger/OpenAPI,
                acessível em <code style={{ color: 'var(--purple-200)' }}>/swagger-ui/index.html</code>.
                Durante o desenvolvimento, foi essencial: a cada funcionalidade implementada pelo grupo de
                backend, o pessoal do frontend podia testar os endpoints e entender como consumi-los —
                agilizando a integração entre as equipes.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 12. PERMISSÕES ===== */}
      <Slide id="permissoes" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="13" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Permissões do Sistema
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Cada tipo de usuário tem acesso a funcionalidades específicas
          </p>

          <div className="grid gap-4 md:grid-cols-3 print:grid-cols-3">
            {[
              { role: '🎓', title: 'Estudante', can: 'Avaliar empresas, comentar, favoritar, ver matches e recomendações da IA', cant: 'Responder como empresa, gerenciar setores ou acessar dados de outros estudantes' },
              { role: '🏢', title: 'Empresa', can: 'Criar e editar perfil público, gerenciar setores de atuação, responder comentários recebidos, ver suas avaliações', cant: 'Avaliar outras empresas, acessar dados pessoais de estudantes' },
              { role: '⚙️', title: 'Administrador', can: 'Gerenciar setores, moderar conteúdo, acesso total ao painel administrativo', cant: '' },
            ].map((p) => (
              <div key={p.title} className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <span className="mb-3 block text-2xl">{p.role}</span>
                <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>{p.title}</h3>
                <p className="mb-2 text-[11px]" style={{ color: 'var(--green-100)' }}>Pode: <span style={{ color: 'var(--grey-300)' }}>{p.can}</span></p>
                {p.cant && <p className="text-[11px]" style={{ color: 'var(--red-100)' }}>Não pode: <span style={{ color: 'var(--grey-300)' }}>{p.cant}</span></p>}
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 13. COMENTÁRIOS ===== */}
      <Slide id="comentarios" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="14" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Comentários — comunicação entre estudantes e empresas
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Como funciona o sistema de comentários bidirecionais da plataforma
          </p>

          <div className="mb-6 grid gap-4 md:grid-cols-2 print:grid-cols-2">
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-3 block text-2xl">{'💬'}</span>
              <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Comentário do estudante</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                Após avaliar uma empresa, o estudante pode publicar um comentário público sobre sua
                experiência. Ele pode optar pelo anonimato — neste caso, nome, foto e usuário ficam
                ocultos para os demais visitantes da plataforma, aparecendo apenas no histórico pessoal
                do próprio estudante.
              </p>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-3 block text-2xl">{'🏢'}</span>
              <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Resposta da empresa</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                A empresa avaliada pode responder publicamente ao comentário do estudante. Diferente
                do estudante, a empresa é sempre identificada na resposta — não há anonimato para
                empresas. Cada empresa só pode responder aos comentários recebidos em suas próprias
                avaliações.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
            <span className="mt-0.5 text-lg">{'⚙️'}</span>
            <div>
              <p className="mb-1 text-xs font-bold" style={{ color: 'var(--green-100)' }}>Moderação</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                Comentários e respostas seguem o modelo CRUD (criar, ler, atualizar, deletar)
                com validação de propriedade — cada usuário só altera o que é seu.
                O estudante gerencia seu comentário, a empresa gerencia sua resposta.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 14. INFRAESTRUTURA ===== */}
      <Slide id="infra" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="15" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Infraestrutura
          </h2>

          <div className="mb-6 flex items-start gap-3 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <span className="mt-0.5 text-2xl">{'🐳'}</span>
            <div>
              <h3 className="mb-1 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Docker</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                Toda a aplicação roda dentro de containers Docker — pacotes que contêm tudo que o sistema
                precisa para funcionar, garantindo que rode igual em qualquer ambiente.
              </p>
            </div>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-3 print:grid-cols-3">
            {[
              { icon: '🗄️', title: 'MySQL', desc: 'Banco de dados que armazena todas as informações do sistema — usuários, empresas, avaliações e comentários.' },
              { icon: '☕', title: 'Backend', desc: 'Servidor com a lógica do sistema, regras de negócio, autenticação JWT e integração com a IA Gemini.' },
              { icon: '🌐', title: 'Frontend', desc: 'Container com React + Nginx, responsável por servir a página e gerenciar as requisições dos usuários.' },
            ].map((c) => (
              <div key={c.title} className="rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <span className="mb-3 block text-2xl">{c.icon}</span>
                <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>{c.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <span className="mt-0.5 text-2xl">{'🔄'}</span>
            <div>
              <h3 className="mb-1 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Integração Contínua (CI/CD)</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                Usamos GitHub Actions para automatizar o processo: a cada atualização no código, ele faz o
                build das imagens Docker e as publica no Docker Hub (startdoor/startdoor-backend e
                startdoor/startdoor-frontend). O docker-compose.yml da implantação sempre aponta para a
                versão mais recente (latest), mantendo o sistema sempre atualizado.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1000)', border: '1px solid var(--grey-700)' }}>
            <span className="mt-0.5 text-lg">{'🌱'}</span>
            <div>
              <p className="mb-1 text-xs font-bold" style={{ color: 'var(--green-100)' }}>Primeira execução</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>
                Na primeira vez que o sistema sobe, ele cria automaticamente um administrador padrão
                (admin@startdoor.com) e 9 setores de atuação (TI, RH, Marketing, Engenharia etc.) —
                tudo pronto para começar a usar.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 16. ENCERRAMENTO ===== */}
      <Slide id="cta" bg="var(--grey-1300)">
        <div className="mx-auto max-w-3xl text-center">
          <SNum n="16" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Obrigado!
          </h2>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
            Este guia foi preparado para ajudar vocês a apresentarem o Startdoor com confiança.
            Esperamos que tenha sido útil!
          </p>
          <div className="h-4" />
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

function StepCard({ number, icon, title, desc }: { number: string; icon: string; title: string; desc: string }) {
  return (
    <div
      className="flex gap-4 rounded-xl p-5"
      style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg"
        style={{ backgroundColor: 'var(--purple-600)' }}
      >
        {icon}
      </span>
      <div>
        <h3 className="mb-1 font-semibold" style={{ color: 'var(--grey-100)' }}>
          <span style={{ color: 'var(--purple-200)' }}>{number}.</span> {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>{desc}</p>
      </div>
    </div>
  );
}
