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
  { id: 'match-1', label: 'Match — Fórmula' },
  { id: 'match-2', label: 'Match — Exemplo' },
  { id: 'ia', label: 'IA Gemini' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'permissoes', label: 'Permissões' },
  { id: 'infra', label: 'Infraestrutura' },
  { id: 'cta', label: 'Dúvidas' },
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
              Imagine um "Glassdoor para estágios": os estudantes dão notas de 1 a 5 em 12 competências
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
            O fluxo principal é simples e intuitivo — etapas 1 e 2
          </p>

          <div className="space-y-4">
            <StepCard
              number="1"
              icon="👤"
              title="Cadastro"
              desc="Estudantes e empresas criam suas contas com email e senha. A senha é protegida com criptografia. Após o login, o servidor gera um token JWT único, que deve ser enviado no cabeçalho (header) de toda requisição seguinte. Esse token informa ao servidor quem é o usuário e quais permissões ele tem, eliminando a necessidade de enviar a senha novamente."
            />
            <StepCard
              number="2"
              icon="🔍"
              title="Pesquisa"
              desc="O estudante pode buscar empresas filtrando por nome, setor (saúde, tecnologia, indústria...) e faixa de nota. Os resultados aparecem paginados, de forma organizada."
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
            <StepCard
              number="3"
              icon="⭐"
              title="Avaliação"
              desc="Após estagiar em uma empresa, o estudante a avalia dando notas de 1 a 5 em 12 competências e escrevendo um relato textual. O estudante pode optar por fazer a avaliação de forma anônima — neste caso, seu nome, foto e usuário não ficam visíveis para outras pessoas, aparecendo apenas para ele mesmo em seu histórico pessoal."
            />
            <StepCard
              number="4"
              icon="📊"
              title="Match"
              desc="Antes de avaliar, o estudante define quais notas considera ideais em cada competência. O sistema compara essas expectativas com as médias reais da empresa. Se a compatibilidade for de 70% ou mais, é considerado um match."
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

      {/* ===== 6. MATCH — FÓRMULA ===== */}
      <Slide id="match-1" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="05" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Sistema de Match — como decidimos se "deu match"?
          </h2>

          <div className="mb-6 rounded-xl p-6 text-center" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="mb-3 text-sm font-medium" style={{ color: 'var(--grey-300)' }}>
              A lógica do match em uma frase:
            </p>
            <p className="text-base font-semibold leading-relaxed md:text-lg" style={{ color: 'var(--purple-100)' }}>
              O estudante define suas expectativas → o sistema compara com as médias reais da empresa →
              se <span style={{ color: 'var(--green-100)' }}>≥80%</span> das competências atendem ou superam a expectativa, é match!
            </p>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <span className="mb-2 block text-lg">{'📐'}</span>
            <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Como funciona</h3>
            <ul className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
              <li>{'•'} Estudante define nota ideal (1 a 5) para cada competência</li>
              <li>{'•'} Plataforma calcula a média real da empresa em cada uma</li>
              <li>{'•'} Compara: se a média da empresa ≥ expectativa, a competência está OK</li>
              <li>{'•'} Se ≥80% das competências estão OK, o match é confirmado</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* ===== 7. MATCH — EXEMPLO ===== */}
      <Slide id="match-2" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="06" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Sistema de Match — exemplo
          </h2>

          <div className="mb-6 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <span className="mb-2 block text-lg">{'💡'}</span>
            <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Exemplo prático</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
              Se o estudante considera "aprendizado" como nota 4 ideal e a média da empresa nessa
              competência é 4,2 — esse critério está OK. Repetindo para as 12 competências, se
              10 ou mais (≥80%) estiverem OK, o match acontece.
            </p>
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

      {/* ===== 8. IA GEMINI ===== */}
      <Slide id="ia" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="07" />
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
              { icon: '🧠', title: 'IA processa', desc: 'O Gemini analisa os números e gera um texto explicativo personalizado em linguagem natural' },
              { icon: '💬', title: 'Texto exibido', desc: 'A recomendação aparece na plataforma para o estudante ler e entender o match' },
            ].map((step, i) => (
              <div key={step.title} className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <span className="mb-2 block text-2xl">{step.icon}</span>
                <h3 className="mb-1 text-xs font-bold" style={{ color: 'var(--purple-200)' }}>
                  <span style={{ color: 'var(--grey-500)' }}>{i + 1}.</span> {step.title}
                </h3>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-400)' }}>{step.desc}</p>
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
                <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-400)' }}>
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

      {/* ===== 9. ARQUITETURA — FRONTEND ===== */}
      <Slide id="frontend" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="08" />
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

      {/* ===== 10. ARQUITETURA — BACKEND ===== */}
      <Slide id="backend" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="09" />
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
        </div>
      </Slide>

      {/* ===== 11. PERMISSÕES ===== */}
      <Slide id="permissoes" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="10" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Permissões do Sistema
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Cada tipo de usuário tem acesso a funcionalidades específicas
          </p>

          <div className="grid gap-4 md:grid-cols-3 print:grid-cols-3">
            {[
              { role: '🎓', title: 'Estudante', can: 'Avaliar empresas, comentar, favoritar, ver matches e recomendações da IA', cant: 'Responder como empresa, gerenciar setores ou acessar dados de outros estudantes' },
              { role: '🏢', title: 'Empresa', can: 'Criar e editar perfil público, responder comentários recebidos, ver suas avaliações', cant: 'Avaliar outras empresas, acessar dados pessoais de estudantes' },
              { role: '⚙️', title: 'Administrador', can: 'Gerenciar setores, moderar conteúdo, acesso total ao painel administrativo', cant: '' },
            ].map((p) => (
              <div key={p.title} className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <span className="mb-3 block text-2xl">{p.role}</span>
                <h3 className="mb-3 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>{p.title}</h3>
                <p className="mb-2 text-[11px]" style={{ color: 'var(--green-100)' }}>Pode: <span style={{ color: 'var(--grey-300)' }}>{p.can}</span></p>
                {p.cant && <p className="text-[11px]" style={{ color: 'var(--red-100)' }}>Não pode: <span style={{ color: 'var(--grey-400)' }}>{p.cant}</span></p>}
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 12. INFRAESTRUTURA ===== */}
      <Slide id="infra" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="11" />
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
              { icon: '☕', title: 'Backend Java', desc: 'Servidor com a lógica do sistema, regras de negócio, autenticação JWT e integração com a IA Gemini.' },
              { icon: '🌐', title: 'Nginx', desc: 'Servidor web que distribui o frontend para os usuários e gerencia as requisições recebidas.' },
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
        </div>
      </Slide>

      {/* ===== 13. CTA / DÚVIDAS ===== */}
      <Slide id="cta" bg="var(--grey-1300)">
        <div className="mx-auto max-w-3xl text-center">
          <SNum n="12" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Dúvidas?
          </h2>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
            Este guia cobre os pontos principais, mas se surgir alguma pergunta técnica mais específica
            durante a apresentação, pode contar com a gente para aprofundar.
          </p>
          <div className="mx-auto flex max-w-xs flex-col gap-3">
            <button
              onClick={() => navigate('/presentation')}
              className="rounded-xl px-6 py-3 text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--purple-500)', color: 'var(--grey-100)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-400)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
            >
              Ver Apresentação Completa {'→'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="rounded-xl px-5 py-3 text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)', color: 'var(--grey-200)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple-300)'; e.currentTarget.style.color = 'var(--purple-100)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--grey-800)'; e.currentTarget.style.color = 'var(--grey-200)'; }}
            >
              {'←'} Voltar ao Início
            </button>
          </div>
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
