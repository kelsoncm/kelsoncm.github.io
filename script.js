// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  themeToggle.innerHTML = newTheme === 'light' 
    ? '<i class="fa-solid fa-sun"></i>' 
    : '<i class="fa-solid fa-moon"></i>';
});

// Gantt Chart Data Definition (1996 - 2026 = 30 Years Span)
const START_YEAR = 1996;
const END_YEAR = 2026.5;
const TOTAL_YEARS = END_YEAR - START_YEAR;

const ganttItems = [
  {
    id: "delphi",
    category: "languages",
    name: "Delphi",
    icon: "fa-solid fa-code",
    color: "#E64A19",
    periods: [
      { start: 1996 + 9/12, end: 1999 + 10/12, dateLabel: "Out/1996 - Nov/1999", detail: "Poliedro: Sistemas de GED/DMS, Workflow e Delphi 5" },
      { start: 2002 + 4/12, end: 2009 + 8/12, dateLabel: "Mai/2002 - Set/2009", detail: "FNDE: Sistemas Financeiros SIAFI e Migração Delphi 2005 VCL" }
    ]
  },
  {
    id: "java",
    category: "languages",
    name: "Java",
    icon: "fa-brands fa-java",
    color: "#F57C00",
    periods: [
      { start: 2004 + 1/12, end: 2013 + 1/12, dateLabel: "Fev/2004 - Fev/2013", detail: "FNDE & TSE: Arquiteto Java, Spring 3, Hibernate, EJB3, JSF, Struts 1/2" }
    ]
  },
  {
    id: "python",
    category: "languages",
    name: "Python / Django",
    icon: "fa-brands fa-python",
    color: "#3776AB",
    periods: [
      { start: 2014, end: 2026.5, dateLabel: "Jan/2014 - Presente", detail: "IFRN, LAIS & Pacotes PyPI: Django, FastAPI, Celery, sc4py, sc4net" }
    ]
  },
  {
    id: "php",
    category: "languages",
    name: "PHP / Laravel",
    icon: "fa-brands fa-php",
    color: "#777BB4",
    periods: [
      { start: 2009 + 3/12, end: 2010 + 1/12, dateLabel: "Abr/2009 - Fev/2010", detail: "Optimedia: PHP 5, Red5 e Plataforma de E-learning" },
      { start: 2014, end: 2026.5, dateLabel: "Jan/2014 - Presente", detail: "IFRN & LAIS: Moodle Plugins, Laravel, Lumen REST APIs" }
    ]
  },
  {
    id: "asp",
    category: "languages",
    name: "ASP / VB6",
    icon: "fa-solid fa-window-restore",
    color: "#00838F",
    periods: [
      { start: 1999 + 10/12, end: 2002 + 4/12, dateLabel: "Nov/1999 - Mai/2002", detail: "Zevallos & AgênciaClick: Framework Hipertools VB6, Portais ASP" }
    ]
  },
  {
    id: "clipper",
    category: "languages",
    name: "Clipper",
    icon: "fa-solid fa-terminal",
    color: "#795548",
    periods: [
      { start: 1996 + 1/12, end: 1996 + 9/12, dateLabel: "Fev/1996 - Out/1996", detail: "Poliedro: Sistemas MS-DOS concorrentes em Rede Novell" }
    ]
  },
  {
    id: "moodle",
    category: "platforms",
    name: "Moodle / EaD",
    icon: "fa-solid fa-graduation-cap",
    color: "#F7931E",
    periods: [
      { start: 2009 + 3/12, end: 2010 + 1/12, dateLabel: "2009 - 2010", detail: "Optimedia: Customização de AVA" },
      { start: 2014, end: 2026.5, dateLabel: "2014 - Presente", detail: "IFRN & LAIS: Dev/Admin Moodle 1.1 até 5.x, Plugins SUAP & Sentry" }
    ]
  },
  {
    id: "devops",
    category: "platforms",
    name: "DevOps & Cloud (AWS/K8s)",
    icon: "fa-brands fa-aws",
    color: "#10b981",
    periods: [
      { start: 2015 + 6/12, end: 2026.5, dateLabel: "Jul/2015 - Presente", detail: "NEES/MinC & LAIS: AWS EKS, Docker, Terraform, Helm, GitLab CI/CD, Airflow" }
    ]
  },
  {
    id: "mssql",
    category: "databases",
    name: "MS SQL Server",
    icon: "fa-solid fa-database",
    color: "#E63946",
    periods: [
      { start: 1996 + 9/12, end: 2001 + 4/12, dateLabel: "Out/1996 - Mai/2001", detail: "Poliedro & Zevallos: Desenvolvimento e administração de SGBD MS SQL Server" }
    ]
  },
  {
    id: "oracle",
    category: "databases",
    name: "Oracle DBMS",
    icon: "fa-solid fa-database",
    color: "#F80000",
    periods: [
      { start: 2001 + 4/12, end: 2013 + 1/12, dateLabel: "Mai/2001 - Fev/2013", detail: "AgênciaClick, FNDE & TSE: Oracle 8i/9i/10g, PL/SQL, Tuning, Clusters e Modelagem OO Relacional" }
    ]
  },
  {
    id: "mysql",
    category: "databases",
    name: "MySQL / MariaDB",
    icon: "fa-solid fa-database",
    color: "#00758F",
    periods: [
      { start: 1999 + 10/12, end: 2026.5, dateLabel: "Nov/1999 - Presente", detail: "Zevallos, AgênciaClick, Optimedia & LAIS: Portais Web, Sistemas de E-learning e Moodle" }
    ]
  },
  {
    id: "postgresql",
    category: "databases",
    name: "PostgreSQL",
    icon: "fa-solid fa-database",
    color: "#336791",
    periods: [
      { start: 2004 + 8/12, end: 2026.5, dateLabel: "Set/2004 - Presente", detail: "FNDE, TSE, IFRN (Administrador de SGBD 9.x+ com Alta Disponibilidade e Redundância desde 2014) & LAIS" }
    ]
  },
  {
    id: "elasticsearch",
    category: "databases",
    name: "ElasticSearch",
    icon: "fa-solid fa-magnifying-glass",
    color: "#005571",
    periods: [
      { start: 2015 + 6/12, end: 2026.5, dateLabel: "Jul/2015 - Presente", detail: "LAIS / UFRN: Indexação de dados e buscas complexas em ecossistemas de Saúde Digital (AVASUS, PNTD)" }
    ]
  },
  {
    id: "redis",
    category: "databases",
    name: "Redis",
    icon: "fa-solid fa-memory",
    color: "#DC382D",
    periods: [
      { start: 2015 + 6/12, end: 2026.5, dateLabel: "Jul/2015 - Presente", detail: "LAIS & NEES: Caching de alta performance e Broker de filas Celery em arquiteturas Python/Django" }
    ]
  },
  {
    id: "frontend",
    category: "frontend",
    name: "Frontend (JS / Vue / ExtJS)",
    icon: "fa-brands fa-vuejs",
    color: "#818cf8",
    periods: [
      { start: 2004 + 8/12, end: 2009 + 1/12, dateLabel: "2004 - 2009", detail: "FNDE: ExtJS (Rich Internet Applications)" },
      { start: 2010, end: 2013, dateLabel: "2010 - 2013", detail: "TSE: jQuery & interfaces interativas" },
      { start: 2015, end: 2026.5, dateLabel: "2015 - Presente", detail: "LAIS & IFRN: JavaScript, Vue.js, Tailwind, HTML5/CSS3" }
    ]
  }
];

// Render Timeline Header Years
const yearsHeader = document.getElementById('ganttYearsHeader');
const displayYears = [1996, 2000, 2005, 2010, 2015, 2020, 2025, 2026];

displayYears.forEach(yr => {
  const yearTick = document.createElement('div');
  yearTick.className = 'year-tick';
  yearTick.textContent = yr;
  const pct = ((yr - START_YEAR) / TOTAL_YEARS) * 100;
  yearTick.style.flex = yr === 2026 ? "0.5" : "1";
  yearsHeader.appendChild(yearTick);
});

// Render Gantt Rows
const ganttBody = document.getElementById('ganttBody');
const tooltip = document.getElementById('ganttTooltip');
const tooltipTitle = document.getElementById('tooltipTitle');
const tooltipDate = document.getElementById('tooltipDate');
const tooltipDetail = document.getElementById('tooltipDetail');

function renderGantt(filterCategory = 'all') {
  ganttBody.innerHTML = '';

  const filteredItems = filterCategory === 'all' 
    ? ganttItems 
    : ganttItems.filter(item => item.category === filterCategory);

  filteredItems.forEach(item => {
    const row = document.createElement('div');
    row.className = 'gantt-row';

    // Label
    const label = document.createElement('div');
    label.className = 'gantt-label';
    label.innerHTML = `<i class="${item.icon}"></i> ${item.name}`;
    row.appendChild(label);

    // Track
    const track = document.createElement('div');
    track.className = 'gantt-track';

    // Bars
    item.periods.forEach(p => {
      const bar = document.createElement('div');
      bar.className = 'gantt-bar';
      
      const leftPct = Math.max(0, ((p.start - START_YEAR) / TOTAL_YEARS) * 100);
      const widthPct = Math.min(100 - leftPct, ((p.end - p.start) / TOTAL_YEARS) * 100);

      bar.style.left = `${leftPct}%`;
      bar.style.width = `${widthPct}%`;
      bar.style.setProperty('--bar-color', item.color);
      bar.textContent = p.dateLabel;

      // Tooltip Events
      bar.addEventListener('mouseenter', (e) => {
        tooltipTitle.textContent = `${item.name}`;
        tooltipDate.textContent = p.dateLabel;
        tooltipDetail.textContent = p.detail;
        tooltip.classList.add('visible');
      });

      bar.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.pageX + 15}px`;
        tooltip.style.top = `${e.pageY + 15}px`;
      });

      bar.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      track.appendChild(bar);
    });

    row.appendChild(track);
    ganttBody.appendChild(row);
  });
}

// Filter Button Clicks
const filterGroup = document.getElementById('ganttFilterGroup');
filterGroup.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    filterGroup.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const filterVal = e.target.getAttribute('data-filter');
    renderGantt(filterVal);
  }
});

// Initial Gantt Render
renderGantt('all');
