const team = [
  { name: 'Afonso Scrivani', role: 'Documentador', github: 'ScrivaniAfonso', image: '/Images/Profiles/AFSC.png' },
  { name: 'Gustavo Balbino', role: 'Backend', github: 'Balbinao', image: '/Images/Profiles/GBALB.png' },
  { name: 'Gustavo Soares', role: 'Frontend', github: 'gustavojoze', image: '/Images/Profiles/GJSS.jpg' },
  { name: 'Lucas Okokama', role: 'Frontend', github: 'LucasOkokama', image: '/Images/Profiles/LKO.jpg' },
  { name: 'Pedro Trovo', role: 'Backend', github: 'pedro-Trovo', image: '/Images/Profiles/PEDT.png' },
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
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto mb-4 h-16 w-16 rounded-full object-cover ring-2 ring-purple-600"
              />
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
