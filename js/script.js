// Reveal animation observer
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
  observer.observe(el);
});

// Mobile navigation menu
const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// Cursor glow effect
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// Modal logic & concepts dictionary
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const modalText = document.querySelector('#modal-text');

const concepts = {
  linguagem: [
    'Linguagem',
    'Na PNL, a linguagem é observada como uma pista da maneira como o indivíduo representa suas experiências. O metamodelo procura tornar mensagens mais específicas por meio de perguntas.'
  ],
  pensamento: [
    'Pensamento',
    'A abordagem propõe que experiências são filtradas e organizadas internamente. A interpretação atribuída a uma situação influencia as possibilidades de resposta percebidas pelo indivíduo.'
  ],
  comportamento: [
    'Comportamento',
    'A PNL procura identificar padrões de ação e comunicação e propõe estratégias para ampliar alternativas comportamentais em diferentes contextos.'
  ],
  rapport: [
    'Rapport',
    'Na terminologia da PNL, rapport é o estabelecimento de sintonia e confiança entre interlocutores, considerando elementos como ritmo, postura, linguagem e atenção à resposta do outro.'
  ],
  metamodelo: [
    'Metamodelo de linguagem',
    'Estrutura de perguntas desenvolvida por Bandler e Grinder para investigar omissões, generalizações e distorções presentes na linguagem e tornar enunciados mais específicos.'
  ],
  modelagem: [
    'Modelagem',
    'Processo de observar e decompor estratégias e padrões usados por outra pessoa, buscando compreender como determinado desempenho é organizado.'
  ],
  reenquadramento: [
    'Reenquadramento',
    'Mudança de contexto ou significado atribuído a uma experiência, com o objetivo de produzir novas interpretações e ampliar possíveis respostas.'
  ]
};

function openModal(key) {
  const item = concepts[key];
  if (!item) return;
  modalTitle.textContent = item[0];
  modalText.textContent = item[1];
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-node]').forEach((el) => {
  el.addEventListener('click', () => openModal(el.dataset.node));
});

document.querySelectorAll('[data-tech]').forEach((el) => {
  el.addEventListener('click', () => openModal(el.dataset.tech));
});

document.querySelectorAll('[data-close-modal]').forEach((el) => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Interactive Scenarios
const scenarios = {
  ameaça: [
    'Ameaça',
    'Tensão e nervosismo',
    'Evitar olhar para a turma ou acelerar a fala'
  ],
  oportunidade: [
    'Oportunidade',
    'Maior confiança e foco',
    'Organizar a explicação e buscar contato com a turma'
  ],
  curiosidade: [
    'Curiosidade',
    'Atenção e abertura',
    'Observar a própria reação e ajustar a apresentação conforme ela acontece'
  ]
};

document.querySelectorAll('.choice').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.choice').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const [a, b, c] = scenarios[btn.dataset.scenario];
    document.querySelector('#result-interpretation').textContent = a;
    document.querySelector('#result-state').textContent = b;
    document.querySelector('#result-behavior').textContent = c;
  });
});

// Sensory Representations
const reps = {
  visual: 'Na terminologia da PNL, o sistema visual está relacionado à representação da experiência por imagens, formas, cores e organização espacial.',
  auditivo: 'Na terminologia da PNL, o sistema auditivo está relacionado à representação da experiência por sons, palavras, ritmo e características da fala.',
  cinestesico: 'Na terminologia da PNL, o sistema cinestésico está relacionado à representação por sensações, movimento, contato e experiência corporal.'
};

document.querySelectorAll('.representation').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.representation').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector('#rep-description').textContent = reps[btn.dataset.rep];
  });
});

// Nota final / Evidências e limites

const evidenceTabs = document.querySelectorAll('.evidence-tab');
const evidencePanels = document.querySelectorAll('.evidence-panel');

evidenceTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.evidence;

    evidenceTabs.forEach((button) => {
      button.classList.remove('active');
    });

    evidencePanels.forEach((panel) => {
      panel.classList.remove('active');
    });

    tab.classList.add('active');

    document
      .querySelector(`[data-evidence-panel="${target}"]`)
      .classList.add('active');
  });
});