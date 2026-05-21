import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  { id: 'cover', label: 'Capa' },
  { id: 'about', label: 'O que é' },
  { id: 'competencias', label: '12 Competências' },
  { id: 'architecture', label: 'Arquitetura' },
  { id: 'data-model', label: 'Dados' },
  { id: 'rules', label: 'Regras de Negócio' },
  { id: 'funcionalidades', label: 'Funcionalidades' },
  { id: 'flow-login', label: 'Login' },
  { id: 'flow-search', label: 'Pesquisa' },
  { id: 'flow-review', label: 'Avaliação' },
  { id: 'flow-match', label: 'Match' },
  { id: 'flow-ia', label: 'IA Gemini' },
  { id: 'flow-email', label: 'Email' },
  { id: 'demo', label: 'Demonstração' },
  { id: 'tech', label: 'Tecnologias' },
  { id: 'conclusion', label: 'Conclusão' },
];

const COMPETENCIAS = [
  { icon: '🏢', name: 'Ambiente', desc: 'Qualidade do ambiente físico e cultural' },
  { icon: '📚', name: 'Aprendizado', desc: 'Oportunidades de aprendizado e desenvolvimento' },
  { icon: '🎁', name: 'Benefícios', desc: 'Vale-alimentação, plano de saúde, etc.' },
  { icon: '🎭', name: 'Cultura', desc: 'Valores, missão e clima organizacional' },
  { icon: '📈', name: 'Efetivação', desc: 'Chances de ser efetivado ao final' },
  { icon: '🎯', name: 'Entrevista', desc: 'Processo seletivo e comunicação' },
  { icon: '💬', name: 'Feedback', desc: 'Retorno sobre desempenho e desenvolvimento' },
  { icon: '🖥️', name: 'Infraestrutura', desc: 'Equipamentos, ferramentas e espaço de trabalho' },
  { icon: '🤝', name: 'Integração', desc: 'Acolhimento e onboarding na empresa' },
  { icon: '💰', name: 'Remuneração', desc: 'Salário e possibilidade de crescimento' },
  { icon: '⏰', name: 'Rotina', desc: 'Carga horária, flexibilidade e equilíbrio' },
  { icon: '👔', name: 'Liderança', desc: 'Qualidade da gestão e suporte do líder' },
];

export default function Presentation() {
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
      {/* Navigation */}
      <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex">
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
        className="fixed left-3 top-3 z-50 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
        style={{ backgroundColor: 'var(--grey-900)', color: 'var(--grey-300)' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--grey-900)')}
      >
        {'←'} Início
      </button>

      <div className="fixed top-0 left-0 right-0 z-40 h-0.5" style={{ backgroundColor: 'var(--grey-800)' }}>
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

      {/* ===== 2. O QUE É ===== */}
      <Slide id="about" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="01" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            O que é o Startdoor?
          </h2>

          <div className="mb-6 rounded-xl p-6" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-200)' }}>
              É uma <strong>plataforma web colaborativa</strong> onde estudantes registram avaliações
              detalhadas (notas 1-5 em 12 competências + relato textual) sobre as empresas onde
              estagiam, permitindo que outros alunos consultem essas informações antes de se candidatar.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-2 block text-lg">{'🎯'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Para quem?</h3>
              <ul className="space-y-1 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} <strong>Estudantes</strong> — buscam estágio alinhado ao perfil</li>
                <li>{'•'} <strong>Empresas</strong> — acompanham reputação e feedback</li>
              </ul>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <span className="mb-2 block text-lg">{'⚙️'}</span>
              <h3 className="mb-2 text-sm font-bold" style={{ color: 'var(--purple-200)' }}>Como faz?</h3>
              <ul className="space-y-1 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Coleta notas quantitativas (1-5) + relatos textuais</li>
                <li>{'•'} Calcula automaticamente as médias de cada empresa</li>
                <li>{'•'} Compara suas expectativas com as médias reais e calcula o match</li>
                <li>{'•'} IA (Gemini) gera um texto explicando o resultado do match</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 3. AS 12 COMPETÊNCIAS ===== */}
      <Slide id="competencias" bg="var(--grey-1300)">
        <div className="mx-auto max-w-5xl">
          <SNum n="02" />
          <h2 className="mb-2 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            As 12 Competências Avaliadas
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Cada avaliação atribui nota de <strong>1 (péssimo)</strong> a <strong>5 (excelente)</strong> em cada competência
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {COMPETENCIAS.map(c => (
              <div
                key={c.name}
                className="group rounded-lg p-4 text-center transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}
                title={c.desc}
              >
                <span className="mb-1 block text-2xl">{c.icon}</span>
                <p className="text-sm font-semibold" style={{ color: 'var(--grey-100)' }}>{c.name}</p>
                <p className="mt-1 text-[10px] leading-tight" style={{ color: 'var(--grey-400)' }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs" style={{ color: 'var(--grey-400)' }}>
            <span>{'1'} Péssimo</span>
            <span className="h-px w-8" style={{ backgroundColor: 'var(--grey-600)' }} />
            <span>{'2'} Ruim</span>
            <span className="h-px w-8" style={{ backgroundColor: 'var(--grey-600)' }} />
            <span>{'3'} Regular</span>
            <span className="h-px w-8" style={{ backgroundColor: 'var(--grey-600)' }} />
            <span>{'4'} Bom</span>
            <span className="h-px w-8" style={{ backgroundColor: 'var(--grey-600)' }} />
            <span>{'5'} Excelente</span>
          </div>
        </div>
      </Slide>

      {/* ===== 4. ARQUITETURA ===== */}
      <Slide id="architecture" bg="var(--grey-1200)">
        <div className="mx-auto max-w-6xl">
          <SNum n="03" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Arquitetura
          </h2>

          {/* Diagrama visual */}
          <div className="mb-6 flex items-center justify-center gap-2 text-xs md:gap-4">
            {[
              { label: 'React 19\nVite 7', sub: 'Frontend', color: 'var(--purple-300)' },
              { label: 'Axios JWT', sub: 'HTTP', color: 'var(--grey-400)' },
              { label: 'Spring Boot 3\nJava 17', sub: 'Backend API', color: 'var(--blue-100)' },
              { label: 'JPA/Hibernate', sub: 'ORM', color: 'var(--grey-400)' },
              { label: 'MySQL 8', sub: 'Database', color: 'var(--green-100)' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="mb-1 flex items-center justify-center rounded-lg px-4 py-3 text-center text-xs font-bold leading-tight md:px-6 md:py-4"
                  style={{ backgroundColor: `${item.color}18`, border: `1px solid ${item.color}40`, color: item.color }}
                >
                  {item.label}
                </div>
                <span className="text-[10px]" style={{ color: 'var(--grey-500)' }}>{item.sub}</span>
                {i < 4 && <span className="my-1 text-xs" style={{ color: 'var(--grey-600)' }}>{'→'}</span>}
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { n: '1', t: 'Frontend', c: 'var(--purple-300)', items: ['React + TypeScript', 'Vite (build rápido)', 'Tailwind CSS (utility-first)', 'MobX — gerenciamento de estado', 'React Router — navegação', 'Axios — comunicação com API', 'Chart.js — gráficos', 'Docker + Nginx'] },
              { n: '2', t: 'Backend', c: 'var(--blue-100)', items: ['Java 17 + Spring Boot 3', 'Spring Security + JWT', 'BCrypt — senhas criptografadas', 'JPA / Hibernate — banco de dados', 'MVC: Controller → Service → Repository', 'Gemini API — textos explicativos', 'JavaMailSender — emails', 'Docker + JDK 17'] },
              { n: '3', t: 'Infra', c: 'var(--green-100)', items: ['MySQL 8 — banco relacional', 'Docker Compose — 3 containers', 'Nginx — proxy + arquivos estáticos', 'Docker Hub — imagens públicas', 'GitHub Actions — CI/CD', 'Swagger — documentação da API', 'Configuração por variáveis de ambiente'] },
            ].map(layer => (
              <div key={layer.n} className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold" style={{ backgroundColor: `${layer.c}20`, color: layer.c }}>{layer.n}</span>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--grey-100)' }}>{layer.t}</h3>
                </div>
                <ul className="space-y-1">
                  {layer.items.map(d => (
                    <li key={d} className="flex items-start gap-1.5 text-xs" style={{ color: 'var(--grey-300)' }}>
                      <span style={{ color: layer.c }}>{'▸'}</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 5. MODELO DE DADOS ===== */}
      <Slide id="data-model" bg="var(--grey-1300)">
        <div className="mx-auto max-w-6xl">
          <SNum n="04" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Modelo de Dados — 12 Tabelas
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { category: 'Tipos de Usuários', color: 'var(--blue-100)', tables: [
                { name: 'estudante', fields: 'dados do estudante: perfil, preferências e autenticação' },
                { name: 'empresa', fields: 'dados da empresa: perfil, porte e informações institucionais' },
              ]},
              { category: 'Relacionamento', color: 'var(--purple-200)', tables: [
                { name: 'estudante_nota_condi', fields: '12 notas mínimas que o estudante definiu como expectativa' },
                { name: 'estudante_empresa_fav', fields: 'empresas favoritadas por cada estudante' },
                { name: 'empresa_setor', fields: 'associação entre empresas e setores de atuação' },
                { name: 'setor', fields: 'catálogo de setores do mercado' },
                { name: 'experiencia_academica', fields: 'histórico acadêmico do estudante' },
                { name: 'experiencia_profissional', fields: 'histórico profissional do estudante' },
              ]},
              { category: 'Avaliação', color: 'var(--green-100)', tables: [
                { name: 'estudante_avaliacao', fields: 'registro principal: 12 notas (1-5), relato textual, dados da experiência' },
                { name: 'estudante_avaliacao_coment', fields: 'comentários de estudantes sobre cada avaliação' },
                { name: 'empresa_avaliacao_coment', fields: 'comentários de empresas sobre cada avaliação' },
                { name: 'empresa_media', fields: 'médias calculadas automaticamente a partir de todas as avaliações' },
                { name: 'recuperacao_senha', fields: 'tokens de redefinição de senha (válidos por 15 minutos)' },
              ]},
            ].map(group => (
              <div key={group.category} className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: group.color }}>{group.category}</p>
                <div className="space-y-3">
                  {group.tables.map(t => (
                    <div key={t.name} className="rounded-lg p-3" style={{ backgroundColor: 'var(--grey-1000)' }}>
                      <code className="text-xs font-bold" style={{ color: 'var(--purple-100)' }}>{t.name}</code>
                      <p className="mt-1 text-[10px] leading-relaxed" style={{ color: 'var(--grey-400)' }}>{t.fields}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 6. REGRAS DE NEGÓCIO ===== */}
      <Slide id="rules" bg="var(--grey-1200)">
        <div className="mx-auto max-w-5xl">
          <SNum n="05" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Regras de Negócio
          </h2>

          <div className="grid gap-2 sm:grid-cols-2">
              {[
                { code: 'RN001', title: 'Unicidade', desc: 'CPF único por estudante, CNPJ único por empresa — sem duplicatas' },
                { code: 'RN002', title: 'Segurança', desc: 'Senhas armazenadas com criptografia robusta (BCrypt)' },
                { code: 'RN003', title: 'Perfil Completo', desc: 'Estudante precisa preencher perfil antes de avaliar' },
                { code: 'RN004', title: 'Escala 1-5', desc: 'Notas de 1 (péssimo) a 5 (excelente) em cada competência' },
                { code: 'RN005', title: 'Médias Automáticas', desc: 'Ao salvar avaliação, as médias da empresa são recalculadas' },
                { code: 'RN006', title: 'Filtros', desc: 'Pesquisa combinável por nome, setor e faixa de nota' },
                { code: 'RN007', title: 'Ponto Forte/Fraco', desc: 'Se média real ≥ expectativa → ponto forte, senão → fraco' },
                { code: 'RN008', title: 'Moderação', desc: 'Empresa só vê comentários não anônimos' },
                { code: 'RN009', title: 'Ranking', desc: 'Recomendações ordenadas do maior percentual de match' },
                { code: 'RN010', title: 'Afinidade', desc: 'Match se ≥70% (8.4 de 12) competências atendem a expectativa' },
                { code: 'RN011', title: 'IA Gemini', desc: 'IA gera texto explicativo personalizado baseado no match' },
              ].map((r, i) => (
              <div
                key={r.code}
                className="rounded-lg p-4 opacity-0 transition-all duration-500"
                style={{
                  backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)',
                  transform: visible.has('rules') ? 'translateY(0)' : 'translateY(15px)',
                  opacity: visible.has('rules') ? 1 : 0,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold" style={{ color: 'var(--purple-200)' }}>{r.code}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--grey-100)' }}>{r.title}</span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-400)' }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 7. FUNCIONALIDADES ===== */}
      <Slide id="funcionalidades" bg="var(--grey-1200)">
        <div className="mx-auto max-w-5xl">
          <SNum n="06" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Funcionalidades
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--grey-400)' }}>
            Visão geral de tudo que o Startdoor oferece
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
              { icon: '🔐', title: 'Autenticação', desc: 'Login seguro com token JWT e senhas criptografadas' },
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

      {/* ===== 8. FLUXO: LOGIN ===== */}
      <Slide id="flow-login" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="07" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Fluxo: Cadastro e Login
          </h2>
          <p className="mb-6 text-xs" style={{ color: 'var(--grey-400)' }}>
            Como a autenticação funciona do início ao fim
          </p>

          <div className="space-y-3">
            {[
              { step: '1', title: 'Cadastro', detail: 'Estudante ou empresa preenchem seus dados. O backend valida as informações (CPF/CNPJ únicos, email, senha), criptografa a senha e salva no banco.' },
              { step: '2', title: 'Login', detail: 'Usuário informa email e senha. O backend verifica se a senha confere com o hash armazenado. Se OK, gera um token JWT válido por 24 horas contendo a identificação do usuário.' },
              { step: '3', title: 'Token no Frontend', detail: 'O frontend guarda o token recebido e passa a enviá-lo automaticamente em toda requisição à API, no cabeçalho de autorização.' },
              { step: '4', title: 'Validação em cada requisição', detail: 'Um filtro no backend intercepta cada requisição, extrai o token, valida a assinatura e identifica o usuário. Se expirado ou inválido, a requisição é recusada.' },
            ].map((f, i) => (
              <div
                key={f.step}
                className="flex items-start gap-3 rounded-xl p-4 opacity-0 transition-all duration-500"
                style={{
                  backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)',
                  transform: visible.has('flow-login') ? 'translateX(0)' : 'translateX(-15px)',
                  opacity: visible.has('flow-login') ? 1 : 0,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: 'var(--purple-500)', color: 'var(--grey-100)' }}>
                  {f.step}
                </span>
                <div>
                  <h3 className="mb-0.5 text-sm font-semibold" style={{ color: 'var(--purple-200)' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 8. FLUXO: PESQUISA ===== */}
      <Slide id="flow-search" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="08" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Fluxo: Pesquisa de Empresas
          </h2>
          <p className="mb-6 text-xs" style={{ color: 'var(--grey-400)' }}>
            Busca empresas com filtros combináveis
          </p>

          <div className="mb-4 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <div className="mb-3 flex items-center gap-2">
              <code className="rounded px-2 py-1 text-xs font-bold" style={{ backgroundColor: 'var(--purple-600)', color: 'var(--purple-100)' }}>GET</code>
              <code className="text-xs" style={{ color: 'var(--blue-100)' }}>/empresas/pesquisa?nome=&setorId=&notaMin=&notaMax=</code>
            </div>
            <ul className="space-y-2 text-xs" style={{ color: 'var(--grey-300)' }}>
              <li>{'•'} <strong>Filtros disponíveis:</strong> nome fantasia, setor de atuação, faixa de nota (mínima e máxima)</li>
              <li>{'•'} <strong>Paginação:</strong> resultados divididos em páginas para facilitar a navegação</li>
              <li>{'•'} <strong>Ordenação:</strong> empresas com melhor média geral aparecem primeiro</li>
              <li>{'•'} Todos os filtros são opcionais e combináveis entre si</li>
            </ul>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <div className="flex items-center gap-4">
              <div className="flex-1 rounded-lg p-3" style={{ backgroundColor: 'var(--grey-1000)' }}>
                <p className="mb-1 text-[10px] font-semibold" style={{ color: 'var(--grey-400)' }}>Exemplo de entrada</p>
                <code className="text-[10px]" style={{ color: 'var(--grey-400)' }}>
                  {`nome: "Tech", setor: "Tecnologia", nota mínima: 3.5`}
                </code>
              </div>
              <span className="text-xs" style={{ color: 'var(--grey-500)' }}>{'→'}</span>
              <div className="flex-1 rounded-lg p-3" style={{ backgroundColor: 'var(--grey-1000)' }}>
                <p className="mb-1 text-[10px] font-semibold" style={{ color: 'var(--grey-400)' }}>Resultado</p>
                <code className="text-[10px]" style={{ color: 'var(--grey-400)' }}>
                  {`lista de empresas que atendem aos critérios`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* ===== 9. FLUXO: AVALIAÇÃO ===== */}
      <Slide id="flow-review" bg="var(--grey-1300)">
        <div className="mx-auto max-w-4xl">
          <SNum n="09" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Fluxo: Registro de Avaliação
          </h2>
          <p className="mb-6 text-xs" style={{ color: 'var(--grey-400)' }}>
            Validação → INSERT → recálculo automático de médias
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { n: '1', t: '1. Validação (Frontend)', items: ['Formulário verifica se todas as 12 notas foram preenchidas (1 a 5)', 'Relato textual deve ter no mínimo 16 caracteres', 'Faixa salarial é validada (mínimo ≤ máximo)', 'Data de início é obrigatória'] },
              { n: '2', t: '2. Salvamento (Backend)', items: ['API recebe os dados da avaliação e valida novamente', 'Backend insere o registro no banco de dados', 'Todo o processo é feito em uma transação (tudo ou nada)'] },
              { n: '3', t: '3. Recalcular Médias', items: ['Após salvar, o sistema recalcula as médias da empresa', 'Pega a média de TODAS as avaliações daquela empresa', 'Atualiza os 12 scores médios + média geral', 'Se for a 1ª avaliação, cria; senão, atualiza'] },
            ].map(col => (
              <div key={col.n} className="rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <span className="mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'var(--purple-600)', color: 'var(--purple-100)' }}>{col.n}. {col.t}</span>
                <ul className="space-y-1">
                  {col.items.map(item => (
                    <li key={item} className="text-[11px]" style={{ color: 'var(--grey-300)' }}>
                      {'•'} {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 10. FLUXO: MATCH ===== */}
      <Slide id="flow-match" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="10" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Algoritmo de Afinidade (RN010)
          </h2>
          <p className="mb-6 text-xs" style={{ color: 'var(--grey-400)' }}>
            O sistema compara as expectativas do estudante com as médias reais de cada empresa
          </p>

          <div className="mb-4 rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--grey-1000)' }}>
                <p className="mb-2 text-xs font-semibold" style={{ color: 'var(--blue-100)' }}>Estudante (notas condicionais)</p>
                <pre className="text-[10px]" style={{ color: 'var(--grey-400)' }}>
{`ambiente:     4.0
aprendizado:  3.5
beneficios:   2.0
cultura:      4.5
efetivacao:   3.0
... (12 notas de 0 a 5)`}
                </pre>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--grey-1000)' }}>
                <p className="mb-2 text-xs font-semibold" style={{ color: 'var(--green-100)' }}>Empresa (médias reais)</p>
                <pre className="text-[10px]" style={{ color: 'var(--grey-400)' }}>
{`ambiente:     4.5
aprendizado:  3.0
beneficios:   4.0
cultura:      3.5
efetivacao:   4.0
... (12 médias calculadas das avaliações)`}
                </pre>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="mb-2 text-xs font-semibold" style={{ color: 'var(--purple-200)' }}>Algoritmo:</p>
            <pre className="text-[11px] leading-relaxed" style={{ color: 'var(--grey-300)' }}>
{`competencias = [ambiente, aprendizado, beneficios, ..., lideranca]  // 12
atendidas = 0

for comp in competencias:
    if empresa_media[comp] >= estudante.nota_condicional[comp]:
        atendidas++

percentual = (atendidas / 12) * 100
is_match = percentual >= 70

return { is_match, percentual, competencias_atendidas }`}
            </pre>
            <p className="mt-3 text-xs" style={{ color: 'var(--grey-400)' }}>
              Endpoint: <CodeInline>GET /api/matches/recomendacoes</CodeInline> — retorna lista ordenada por <CodeInline>percentualMatch</CodeInline> DESC
            </p>
          </div>
        </div>
      </Slide>

      {/* ===== 11. FLUXO: IA GEMINI ===== */}
      <Slide id="flow-ia" bg="var(--grey-1300)">
        <div className="mx-auto max-w-5xl">
          <SNum n="11" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            IA Gemini: Justificativa do Match (RN011)
          </h2>
          <p className="mb-6 text-xs" style={{ color: 'var(--grey-400)' }}>
            A IA não calcula o match — ela apenas gera um texto explicando o resultado
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--purple-200)' }}>O que a IA recebe</p>
              <ul className="space-y-2 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Perfil do estudante (biografia, área de interesse)</li>
                <li>{'•'} Suas 12 notas condicionais (expectativas)</li>
                <li>{'•'} Dados da empresa (nome, porte, setores)</li>
                <li>{'•'} As 12 médias reais da empresa</li>
              </ul>

              <p className="mt-4 mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--purple-200)' }}>E se der erro?</p>
              <ul className="space-y-1 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Chave da API não configurada → sistema retorna erro 503</li>
                <li>{'•'} Estudante/empresa não encontrados → 404</li>
                <li>{'•'} IA demora muito ou falha → timeout de 30 segundos</li>
              </ul>
            </div>

            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--purple-200)' }}>O que a IA gera</p>
              <ul className="space-y-2 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Texto em português, tom pessoal e direto</li>
                <li>{'•'} Cita as preferências do estudante sem identificá-lo</li>
                <li>{'•'} Destaca 2-3 competências onde a empresa SUPEROU a expectativa</li>
                <li>{'•'} Explica por que a empresa é ou não recomendada</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="mb-1 text-xs font-semibold" style={{ color: 'var(--purple-200)' }}>Exemplo do texto gerado pela IA</p>
            <pre className="text-[10px] leading-relaxed" style={{ color: 'var(--grey-400)' }}>
{`"Como voce mencionou valorizar autonomia e busca o setor de
Tecnologia, a Empresa X e recomendada pois sua nota em
'Aprendizado' (4.5) supera sua expectativa (3.0)."`}
            </pre>
          </div>
        </div>
      </Slide>

      {/* ===== 12. FLUXO: EMAIL ===== */}
      <Slide id="flow-email" bg="var(--grey-1200)">
        <div className="mx-auto max-w-4xl">
          <SNum n="12" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Recuperação de Senha
          </h2>
          <p className="mb-6 text-xs" style={{ color: 'var(--grey-400)' }}>
            Fluxo em 3 etapas para redefinir a senha
          </p>

          <div className="space-y-3">
            {[
              { n: '1', t: 'Solicitar código', detail: 'Usuário informa o email cadastrado. O sistema gera um código de 6 dígitos, salva com validade de 15 minutos e envia o código por email.' },
              { n: '2', t: 'Validar código', detail: 'Usuário informa o código recebido. O sistema verifica se o código é válido e não expirou. Se OK, autoriza a redefinição.' },
              { n: '3', t: 'Redefinir senha', detail: 'Usuário cria uma nova senha. O sistema criptografa a nova senha, atualiza no banco e remove o código de recuperação.' },
            ].map((item, i) => (
              <div
                key={item.n}
                className="flex items-start gap-3 rounded-xl p-4 opacity-0 transition-all duration-500"
                style={{
                  backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)',
                  transform: visible.has('flow-email') ? 'translateX(0)' : 'translateX(-15px)',
                  opacity: visible.has('flow-email') ? 1 : 0,
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: 'var(--purple-500)', color: 'var(--grey-100)' }}>
                  {item.n}
                </span>
                <div>
                  <h3 className="mb-0.5 text-sm font-semibold" style={{ color: 'var(--purple-200)' }}>{item.t}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--grey-300)' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
            <p className="text-[10px]" style={{ color: 'var(--grey-400)' }}>
              Config: <CodeInline>spring.mail.host=smtp.gmail.com port=587 spring.mail.properties.mail.smtp.starttls.enable=true</CodeInline>
            </p>
          </div>
        </div>
      </Slide>

      {/* ===== 13. DEMONSTRAÇÃO ===== */}
      <Slide id="demo" bg="var(--grey-1300)">
        <div className="mx-auto max-w-6xl">
          <SNum n="13" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Demonstração
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Login / Cadastro', desc: 'Cadastro e autenticação de estudantes e empresas com token de acesso.', endpoint: 'POST /auth/login' },
              { title: 'Pesquisa com Filtros', desc: 'Busca empresas por nome, setor e faixa de nota com resultados paginados.', endpoint: 'GET /empresas/pesquisa' },
              { title: 'Formulário de Avaliação', desc: 'Registro de experiência com 12 notas (1 a 5) + relato textual.', endpoint: 'POST /avaliacoes' },
              { title: 'Radar Chart 12 Eixos', desc: 'Gráfico comparando suas expectativas versus as médias reais da empresa.', endpoint: 'GET /empresas/{id}/notas' },
              { title: 'Recomendação com IA', desc: 'IA gera texto explicativo personalizado baseado no resultado do match.', endpoint: 'POST /recomendacoes/ia/gerar' },
              { title: 'Swagger + Docker', desc: 'Documentação interativa da API. Infraestrutura com 3 containers Docker.', endpoint: '/swagger-ui/index.html' },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-xl border-2 border-dashed p-4"
                style={{ borderColor: 'var(--grey-700)', backgroundColor: 'var(--grey-1100)' }}
              >
                <div className="mb-3 flex items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--grey-1000)', minHeight: 130 }}>
                  <div className="text-center">
                    <p className="mb-1 text-2xl">{'📸'}</p>
                    <code className="text-[10px]" style={{ color: 'var(--grey-500)' }}>{item.endpoint}</code>
                  </div>
                </div>
                <h3 className="mb-1 text-sm font-semibold" style={{ color: 'var(--grey-100)' }}>{item.title}</h3>
                <p className="text-[11px]" style={{ color: 'var(--grey-400)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 14. TECNOLOGIAS ===== */}
      <Slide id="tech" bg="var(--grey-1200)">
        <div className="mx-auto max-w-5xl">
          <SNum n="14" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Tecnologias
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'Frontend', c: 'var(--purple-300)', items: ['React 19', 'TypeScript', 'Vite 7', 'Tailwind v4', 'MobX 6', 'React Router v7', 'React Hook Form', 'Zod', 'Axios', 'Chart.js'] },
              { t: 'Backend', c: 'var(--blue-100)', items: ['Java 17', 'Spring Boot 3', 'Spring Security', 'JWT (jjwt)', 'JPA / Hibernate', 'Gemini API', 'JavaMailSender', 'MVC Pattern'] },
              { t: 'DevOps', c: 'var(--green-100)', items: ['MySQL 8', 'Docker', 'Docker Compose', 'Nginx', 'Docker Hub', 'GitHub Actions', 'Swagger', 'Figma'] },
            ].map(cat => (
              <div key={cat.t} className="rounded-xl p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: cat.c }}>{cat.t}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <span key={item} className="rounded-md px-2.5 py-1 text-[10px]" style={{ backgroundColor: 'var(--grey-1000)', color: 'var(--grey-300)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              ['React', '#61DAFB'], ['TypeScript', '#3178C6'], ['Vite', '#646CFF'],
              ['Tailwind', '#06B6D4'], ['MobX', '#FF9955'], ['Java', '#ED8B00'],
              ['Spring', '#6DB33F'], ['MySQL', '#4479A1'], ['Docker', '#2496ED'],
              ['Gemini', '#8E75B2'],
            ].map(([name, color]) => (
              <span key={name} className="rounded-lg px-3 py-1.5 text-[10px] font-medium" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </Slide>

      {/* ===== 15. CONCLUSÃO ===== */}
      <Slide id="conclusion" bg="var(--grey-1300)">
        <div className="mx-auto max-w-3xl text-center">
          <SNum n="15" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Conclusão
          </h2>

          <div className="mx-auto mb-6 grid max-w-lg grid-cols-2 gap-4 text-left">
            <div className="rounded-lg p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--purple-200)' }}>O que foi entregue</p>
              <ul className="space-y-1.5 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Frontend completo com 15 páginas e gráficos comparativos</li>
                <li>{'•'} Backend com 11 regras de negócio e API RESTful</li>
                <li>{'•'} IA Gemini gerando textos explicativos personalizados</li>
                <li>{'•'} Infraestrutura com 3 containers Docker e CI/CD automático</li>
              </ul>
            </div>
            <div className="rounded-lg p-5" style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--purple-200)' }}>Destaques técnicos</p>
              <ul className="space-y-1.5 text-xs" style={{ color: 'var(--grey-300)' }}>
                <li>{'•'} Algoritmo de match comparando 12 competências</li>
                <li>{'•'} IA como complemento explicativo, não como calculadora</li>
                <li>{'•'} Autenticação segura com JWT e BCrypt</li>
                <li>{'•'} Médias recalculadas automaticamente a cada avaliação</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-[10px]" style={{ color: 'var(--grey-400)' }}>
            <span className="rounded-md px-3 py-1" style={{ backgroundColor: 'var(--grey-1000)' }}>{'📱'} Mobile-first</span>
            <span className="rounded-md px-3 py-1" style={{ backgroundColor: 'var(--grey-1000)' }}>{'🔒'} Autenticação segura</span>
            <span className="rounded-md px-3 py-1" style={{ backgroundColor: 'var(--grey-1000)' }}>{'🐳'} Docker Compose</span>
            <span className="rounded-md px-3 py-1" style={{ backgroundColor: 'var(--grey-1000)' }}>{'🤖'} IA Gemini</span>
            <span className="rounded-md px-3 py-1" style={{ backgroundColor: 'var(--grey-1000)' }}>{'📊'} 12 competências</span>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => document.getElementById('cover')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-lg px-5 py-2 text-xs font-medium transition-all"
              style={{ backgroundColor: 'var(--purple-500)', color: 'var(--grey-100)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--purple-400)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--purple-500)')}
            >
              {'↑'} Início
            </button>
            <button
              onClick={() => navigate('/')}
              className="rounded-lg border px-5 py-2 text-xs font-medium transition-all"
              style={{ borderColor: 'var(--grey-600)', color: 'var(--grey-200)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple-300)'; e.currentTarget.style.color = 'var(--purple-100)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--grey-600)'; e.currentTarget.style.color = 'var(--grey-200)'; }}
            >
              {'←'} Início
            </button>
          </div>

          <p className="mt-6 text-[10px]" style={{ color: 'var(--grey-500)' }}>
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

function CodeInline({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="rounded px-1 py-0.5 text-[10px]"
      style={{ backgroundColor: 'var(--purple-600)', color: 'var(--purple-100)' }}
    >
      {children}
    </code>
  );
}
