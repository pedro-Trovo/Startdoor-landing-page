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
  { id: 'match', label: 'Sistema de Match' },
  { id: 'ia', label: 'IA Gemini' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
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
              desc="Estudantes e empresas criam suas contas com email e senha. A senha é protegida com criptografia e o login usa tokens de segurança (JWT), garantindo que apenas usuários autenticados acessem certas funcionalidades."
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
              desc="Após estagiar em uma empresa, o estudante a avalia dando notas de 1 a 5 em 12 competências e escrevendo um relato textual. A identidade do avaliador fica anônima para proteger sua privacidade."
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

      {/* ===== 6. SISTEMA DE MATCH ===== */}
      <Slide id="match" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="05" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Sistema de Match — como decidimos se "deu match"?
          </h2>
          <div className="space-y-4">
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              O match é o coração da plataforma. A lógica é simples: o estudante define, no momento do
              cadastro, qual seria a nota ideal dele em cada uma das 12 competências (de 1 a 5). A
              plataforma então calcula a média real de cada competência para a empresa com base em todas
              as avaliações que ela recebeu.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              O sistema então compara as duas pontuações. Se a média da empresa atende ou supera a
              expectativa do estudante em pelo menos 70% dos critérios, o match é confirmado.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              Por exemplo: se o estudante considera "aprendizado" como nota 4 ideal, e a média da
              empresa naquela competência é 4,2 — esse critério está ok. Se isso acontecer em 70% ou
              mais das 12 competências, o match acontece.
            </p>
          </div>
        </div>
      </Slide>

      {/* ===== 7. IA GEMINI ===== */}
      <Slide id="ia" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="06" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            O papel da Inteligência Artificial (IA Gemini)
          </h2>
          <div className="space-y-4">
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              Quando o match é confirmado, a plataforma envia os dados para a API do Google Gemini —
              uma inteligência artificial generativa, similar ao ChatGPT, mas focada em entender e
              gerar textos.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              A IA recebe as seguintes informações: o nome da empresa, as notas que o estudante definiu
              como ideais, as médias reais da empresa em cada competência e o resultado do match. Com
              base nisso, ela gera um texto curto e personalizado explicando por que a empresa é
              compatível com aquele perfil.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              Na prática, é como se a IA "interpretasse os números" e escrevesse um parágrafo
              explicativo, dando mais contexto e clareza para o estudante. Isso transforma dados frios
              em uma recomendação compreensível.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              A integração é feita de forma segura: o backend do Startdoor (em Java) faz uma chamada
              para a API do Gemini, recebe o texto gerado e o armazena para exibição futura — sem
              expor chaves ou dados sensíveis.
            </p>
          </div>
        </div>
      </Slide>

      {/* ===== 8. ARQUITETURA — FRONTEND ===== */}
      <Slide id="frontend" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="07" />
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

      {/* ===== 9. ARQUITETURA — BACKEND ===== */}
      <Slide id="backend" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="08" />
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

      {/* ===== 10. INFRAESTRUTURA ===== */}
      <Slide id="infra" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="09" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Infraestrutura e deploy
          </h2>
          <div className="space-y-4">
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              Toda a aplicação roda dentro de containers Docker — que são como "pacotes" que contêm
              tudo que o sistema precisa para funcionar, garantindo que rode igual em qualquer ambiente.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              São 3 containers principais: um para o banco MySQL, um para o backend Java e um para o
              Nginx (servidor web que gerencia as requisições e serve os arquivos do frontend).
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              Usamos GitHub Actions para automatizar testes e deploys: a cada alteração no código, o
              sistema roda verificações automaticamente e, se tudo estiver certo, publica uma nova
              versão.
            </p>
          </div>
        </div>
      </Slide>

      {/* ===== 11. CTA / DÚVIDAS ===== */}
      <Slide id="cta" bg="var(--grey-1300)">
        <div className="mx-auto max-w-3xl text-center">
          <SNum n="10" />
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
