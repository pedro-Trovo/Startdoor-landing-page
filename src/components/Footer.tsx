export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--grey-1100)', borderTop: '1px solid var(--grey-800)' }}>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="/startdoor_icone.svg" alt="Startdoor" className="h-8 w-8" />
              <span className="text-lg font-bold" style={{ color: 'var(--grey-100)' }}>
                Startdoor
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-400)' }}>
              Plataforma web colaborativa dedicada à avaliação e ao compartilhamento de experiências de estágio.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--grey-300)' }}>
              Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'GitHub', href: 'https://github.com/Balbinao/Startdoor' },
                { label: 'Figma', href: 'https://www.figma.com/proto/uMYDnHDMyCmws5SYpOI9VS/AvaliarEstagios_Prototipo' },
                { label: 'Apresentação do Projeto', href: '/presentation' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--grey-400)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-200)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--grey-400)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--grey-300)' }}>
              Instituição
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-400)' }}>
              FATEC Ipiranga<br />
              Curso: Análise e Desenvolvimento de Sistemas<br />
              {' '}TCC — 2025/2026
            </p>
          </div>
        </div>

        <div
          className="mt-8 border-t pt-8 text-center text-xs"
          style={{ borderColor: 'var(--grey-800)', color: 'var(--grey-500)' }}
        >
          MIT License &copy; {new Date().getFullYear()} Startdoor Contributors
        </div>
      </div>
    </footer>
  );
}
