const team = [
  { name: 'Afonso Scrivani', role: 'Documentador', github: 'ScrivaniAfonso' },
  { name: 'Gustavo Balbino', role: 'Backend', github: 'Balbinao' },
  { name: 'Gustavo Soares', role: 'Frontend', github: 'gustavojoze' },
  { name: 'Lucas Okokama', role: 'Frontend', github: 'LucasOkokama' },
  { name: 'Pedro Trovo', role: 'Backend', github: 'pedro-Trovo' },
];

export default function TeamSection() {
  return (
    <section id="equipe" className="px-6 py-24" style={{ backgroundColor: 'var(--grey-1300)' }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: 'var(--purple-100)' }}>
            Equipe
          </h2>
          <p className="text-lg" style={{ color: 'var(--grey-300)' }}>
            Equipe Startdoor — FATEC Ipiranga
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {team.map(member => (
            <a
              key={member.name}
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl p-6 text-center transition-all hover:-translate-y-1"
              style={{ backgroundColor: 'var(--grey-1100)', border: '1px solid var(--grey-800)' }}
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold transition-colors"
                style={{ backgroundColor: 'var(--purple-600)', color: 'var(--purple-100)' }}
              >
                {member.name.charAt(0)}
              </div>
              <h3 className="mb-1 text-sm font-semibold" style={{ color: 'var(--grey-100)' }}>
                {member.name}
              </h3>
              <p className="text-xs" style={{ color: 'var(--purple-200)' }}>
                {member.role}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
