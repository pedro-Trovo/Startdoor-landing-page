import Footer from '@components/Footer';
import Header from '@components/Header';

const SECTIONS = [
  {
    id: 'overview',
    title: 'Afinal, o que é o Startdoor?',
    content: [
      'O Startdoor é uma plataforma web colaborativa onde estudantes que já estagiaram podem avaliar as empresas de forma estruturada — e quem ainda busca um estágio pode usar essas informações para escolher melhor.',
      'Imagine um "Glassdoor para estágios": os estudantes dão notas de 1 a 5 em 12 competências diferentes (como aprendizado, ambiente, benefícios, etc.) e escrevem um relato textual da experiência. Tudo isso fica disponível para a comunidade.',
      'Empresas também podem se cadastrar, criar um perfil público, acompanhar suas avaliações e responder comentários.',
    ],
    icon: '🚀',
  },
  {
    id: 'flow',
    title: 'Como o sistema funciona na prática?',
    content: [
      'O fluxo principal é simples e intuitivo:',
    ],
    steps: [
      { icon: '👤', title: 'Cadastro', desc: 'Estudantes e empresas criam suas contas com email e senha. A senha é protegida com criptografia e o login usa tokens de segurança (JWT), garantindo que apenas usuários autenticados acessem certas funcionalidades.' },
      { icon: '🔍', title: 'Pesquisa', desc: 'O estudante pode buscar empresas filtrando por nome, setor (saúde, tecnologia, indústria...) e faixa de nota. Os resultados aparecem paginados, de forma organizada.' },
      { icon: '⭐', title: 'Avaliação', desc: 'Após estagiar em uma empresa, o estudante a avalia dando notas de 1 a 5 em 12 competências e escrevendo um relato textual. A identidade do avaliador fica anônima para proteger sua privacidade.' },
      { icon: '📊', title: 'Match', desc: 'Antes de avaliar, o estudante define quais notas considera ideais em cada competência. O sistema compara essas expectativas com as médias reais da empresa. Se a compatibilidade for de 70% ou mais, é considerado um "match".' },
      { icon: '🤖', title: 'Recomendação com IA', desc: 'Quando há match, a inteligência artificial Gemini (do Google) entra em ação. Ela gera um texto explicativo personalizado, em linguagem natural, justificando por que aquela empresa é compatível com o perfil do estudante.' },
      { icon: '❤️', title: 'Favoritar', desc: 'O estudante pode salvar empresas como favoritas para consultar depois, montando uma lista de interesse personalizada.' },
    ],
  },
  {
    id: 'match',
    title: 'O sistema de Match — como decidimos se "deu match"?',
    content: [
      'O match é o coração da plataforma. A lógica é simples: o estudante define, no momento do cadastro, qual seria a nota ideal dele em cada uma das 12 competências (de 1 a 5). A plataforma então calcula a média real de cada competência para a empresa com base em todas as avaliações que ela recebeu.',
      'O sistema então compara as duas pontuações. Se a média da empresa atende ou supera a expectativa do estudante em pelo menos 70% dos critérios, o match é confirmado.',
      'Por exemplo: se o estudante considera "aprendizado" como nota 4 ideal, e a média da empresa naquela competência é 4,2 — esse critério está ok. Se isso acontecer em 70% ou mais das 12 competências, o match acontece.',
    ],
    icon: '📈',
  },
  {
    id: 'ia',
    title: 'O papel da Inteligência Artificial (IA Gemini)',
    content: [
      'Quando o match é confirmado, a plataforma envia os dados para a API do Google Gemini — uma inteligência artificial generativa, similar ao ChatGPT, mas focada em entender e gerar textos.',
      'A IA recebe as seguintes informações: o nome da empresa, as notas que o estudante definiu como ideais, as médias reais da empresa em cada competência e o resultado do match. Com base nisso, ela gera um texto curto e personalizado explicando por que a empresa é compatível com aquele perfil.',
      'Na prática, é como se a IA "interpretasse os números" e escrevesse um parágrafo explicativo, dando mais contexto e clareza para o estudante. Isso transforma dados frios em uma recomendação compreensível.',
      'A integração é feita de forma segura: o backend do Startdoor (em Java) faz uma chamada para a API do Gemini, recebe o texto gerado e o armazena para exibição futura — sem expor chaves ou dados sensíveis.',
    ],
    icon: '🤖',
  },
  {
    id: 'architecture',
    title: 'Visão geral da arquitetura',
    content: [
      'O Startdoor foi construído como uma aplicação web moderna, dividida em duas partes principais:',
    ],
    techs: [
      {
        title: 'Frontend (Interface)',
        items: [
          'Construído com React e TypeScript — as tecnologias padrão da indústria para interfaces web rápidas e confiáveis.',
          'O visual foi feito com Tailwind CSS, que permite um design consistente e responsivo (funciona bem no celular, tablet e computador).',
          'A comunicação com o servidor é feita via chamadas HTTP organizadas, usando uma biblioteca chamada Axios.',
          'Para navegação entre páginas, usamos o React Router, que permite trocar de tela sem recarregar a página.',
        ],
      },
      {
        title: 'Backend (Servidor)',
        items: [
          'Desenvolvido em Java com o framework Spring — uma das tecnologias mais consolidadas e seguras para sistemas corporativos.',
          'Os dados ficam armazenados em um banco MySQL, que organiza todas as informações (usuários, empresas, avaliações, etc.) de forma estruturada.',
          'A autenticação é feita com tokens JWT (um padrão de segurança da web) — cada usuário recebe um "token" ao fazer login, que é validado a cada requisição.',
          'A integração com a IA Gemini é feita pelo backend, que chama a API externa do Google de forma segura.',
        ],
      },
    ],
  },
  {
    id: 'infra',
    title: 'Infraestrutura e deploy',
    content: [
      'Toda a aplicação roda dentro de containers Docker — que são como "pacotes" que contêm tudo que o sistema precisa para funcionar, garantindo que rode igual em qualquer ambiente.',
      'São 3 containers principais: um para o banco MySQL, um para o backend Java e um para o Nginx (servidor web que gerencia as requisições e serve os arquivos do frontend).',
      'Usamos GitHub Actions para automatizar testes e deploys: a cada alteração no código, o sistema roda verificações automaticamente e, se tudo estiver certo, publica uma nova versão.',
    ],
    icon: '⚙️',
  },
];

export default function Explanation() {
  return (
    <div className="flex min-h-screen flex-col">
      <style>{`
        @media print {
          @page { margin: 1cm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          section { page-break-inside: avoid; }
        }
      `}</style>

      <div className="no-print">
        <Header />
      </div>

      <button
        onClick={() => window.print()}
        className="no-print fixed right-3 top-3 z-50 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
        style={{ backgroundColor: 'var(--grey-900)', color: 'var(--grey-300)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--grey-900)')}
      >
        {'🖨️'} Exportar PDF
      </button>

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section
          className="flex min-h-[50vh] items-center justify-center px-6 py-20 text-center"
          style={{ backgroundColor: 'var(--grey-1300)' }}
        >
          <div className="max-w-3xl">
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
        </section>

        {/* Sections */}
        {SECTIONS.map((section, sIndex) => (
          <section
            key={section.id}
            id={section.id}
            className="px-6 py-16 md:py-24"
            style={{ backgroundColor: sIndex % 2 === 0 ? 'var(--grey-1200)' : 'var(--grey-1300)' }}
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-start gap-4">
                {section.icon && (
                  <span className="mt-1 text-3xl">{section.icon}</span>
                )}
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--purple-100)' }}>
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Text paragraphs */}
              {section.content && section.content.map((text, i) => (
                <p
                  key={i}
                  className="mb-4 text-base leading-relaxed last:mb-0"
                  style={{ color: 'var(--grey-200)' }}
                >
                  {text}
                </p>
              ))}

              {/* Steps (flow section) */}
              {section.steps && (
                <div className="mt-8 space-y-6">
                  {section.steps.map((step, i) => (
                    <div
                      key={step.title}
                      className="flex gap-4 rounded-xl p-5"
                      style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl" style={{ backgroundColor: 'var(--purple-600)' }}>
                        {step.icon}
                      </span>
                      <div>
                        <h3 className="mb-1 font-semibold" style={{ color: 'var(--grey-100)' }}>
                          <span style={{ color: 'var(--purple-200)' }}>{i + 1}.</span> {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Techs (architecture section) */}
              {section.techs && (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {section.techs.map((tech) => (
                    <div
                      key={tech.title}
                      className="rounded-xl p-5"
                      style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}
                    >
                      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--purple-200)' }}>
                        {tech.title}
                      </h3>
                      <ul className="space-y-3">
                        {tech.items.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--grey-300)' }}>
                            <span style={{ color: 'var(--purple-200)' }}>{'▸'}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <section
          className="px-6 py-16 text-center"
          style={{ backgroundColor: 'var(--grey-1200)' }}
        >
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--purple-100)' }}>
              Dúvidas?
            </h2>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--grey-300)' }}>
              Este guia cobre os pontos principais, mas se surgir alguma pergunta técnica mais específica durante a apresentação, pode contar com a gente.
            </p>
            <a
              href="/presentation"
              className="inline-block rounded-xl px-6 py-3 text-sm font-medium transition-all"
              style={{ backgroundColor: 'var(--purple-500)', color: 'var(--grey-100)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-400)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
            >
              Ver Apresentação Completa {'→'}
            </a>
          </div>
        </section>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
