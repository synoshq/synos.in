// Single source of truth for the model. Used by the home page, the
// methodology page and the structured data.

export const levels = [
  { n: 1, name: 'Experimenting', line: 'Teams try agents. Nothing runs in production.' },
  { n: 2, name: 'Piloting', line: 'A few agents serve real users, in limited scope.' },
  { n: 3, name: 'Operationalizing', line: 'Agents run in production on shared tooling, with clear owners.' },
  { n: 4, name: 'Scaling', line: 'A platform lets many teams ship agents safely.' },
  { n: 5, name: 'Agent-Native', line: 'Agents are core to how the business runs and improves.' },
];

export const dims = [
  {
    id: 'knowledge', name: 'Knowledge & Context', short: 'Knowledge',
    q: 'Can agents reach the company knowledge they need, with the same permissions a person would have?',
    core: 'When an agent needs company knowledge, such as policies, customer history or product data, how does it get it today?',
    rubric: [
      'Prompts pasted with documents; no connection to live systems',
      'Each agent has its own retrieval setup over a few sources',
      'A shared knowledge layer covers key systems with basic access control',
      'Governed, permission-aware context across most systems, kept fresh automatically',
      'A unified enterprise knowledge layer that any agent uses by default, with lineage on every answer',
    ],
  },
  {
    id: 'evaluation', name: 'Quality & Evaluation', short: 'Evaluation',
    q: 'Can you prove an agent works before release, and that it still works a month later?',
    core: 'How do you decide an agent is good enough to go live, and how do you know it is still good a month later?',
    rubric: [
      'Judged by trying it out; no formal tests',
      'Ad hoc test cases per project, checked manually before launch',
      'Standard evaluation suites run before each release',
      'Automated evaluation in the release pipeline plus monitoring in production',
      'Continuous evaluation tied to business outcomes, with domain-trained models where they pay off',
    ],
  },
  {
    id: 'governance', name: 'Governance & Control', short: 'Governance',
    q: 'Can you list every agent, what it is allowed to do, and stop it in seconds?',
    core: 'If your CISO asked for a list of every agent running today and what each one is allowed to do, how long would it take to produce it?',
    rubric: [
      'No inventory; agents found by asking around',
      'A manual list; permissions set per project',
      'A central registry with standard approval and logging',
      'A control plane with policy enforcement, full audit trails and a kill switch',
      'Real-time, policy-driven control across all agents, including third-party ones, with automated compliance reporting',
    ],
  },
  {
    id: 'improvement', name: 'Continuous Improvement', short: 'Improvement',
    q: 'Is an agent better six months after launch, and do its gains carry to other agents?',
    core: 'Think of an agent that has been live for six months. Is it better today than at launch? What made it better?',
    rubric: [
      'Agents stay as built; changes only when something breaks',
      'Feedback collected but reviewed occasionally by hand',
      'A regular cycle turns feedback into prompt, data or workflow fixes',
      'Outcome signals feed systematic tuning of models and workflows',
      'Agents improve continuously from production signals, with gains shared across the agent estate',
    ],
  },
  {
    id: 'sovereignty', name: 'Sovereignty & Residency', short: 'Sovereignty',
    q: 'Do you control where your models run and where your data goes?',
    core: 'Where do your agents’ models run, and where does the data they see go? How much choice do you have about that?',
    rubric: [
      'Whatever the chosen public API provides; residency not assessed',
      'Residency checked case by case; some projects blocked',
      'Approved deployment patterns per data class, including at least one private option',
      'Models portable across cloud, private and on-premises, with data kept in required regions',
      'Full control of models, data and runtime wherever required, with no single-provider dependency',
    ],
  },
  {
    id: 'value', name: 'Value & Portfolio', short: 'Value',
    q: 'Can you show the board what each agent costs and what it returns?',
    core: 'How do you decide which agent use cases to fund, and how do you show the board what they returned?',
    rubric: [
      'Use cases chosen by enthusiasm; value not measured',
      'Business cases written per project; results anecdotal',
      'A managed portfolio with baseline and post-launch metrics',
      'Value and running cost tracked per agent; funding moves to what works',
      'Agent value reported alongside other business performance and used in planning',
    ],
  },
  {
    id: 'people', name: 'People & Operating Model', short: 'People',
    q: 'Who owns an agent once it is live, and is that working?',
    core: 'Who owns an agent once it is live: the AI team, the business unit, or IT? How is that working?',
    rubric: [
      'Enthusiasts in scattered teams; no clear ownership',
      'A central team builds everything; business units wait in line',
      'Defined roles and a standard path from idea to production',
      'A platform team enables business units to build and run their own agents',
      'Work is redesigned around people and agents together, with ownership built into every function',
    ],
  },
];

export const scoringRules = [
  ['Evidence over intent.', 'We score what runs in production today, not what is planned. “We are rolling that out next quarter” scores at the current level.'],
  ['Lowest common level.', 'If one flagship agent is at level 4 but most are at level 2, the dimension scores level 2.'],
  ['Between two levels, the lower one counts.', 'This keeps the benchmark conservative and comparable across companies.'],
  ['Equal weight.', 'All seven dimensions carry the same weight. No dimension counts more than another.'],
  ['Calibrated scoring.', 'Two researchers score the same interviews independently at regular intervals and reconcile any differences.'],
] as const;
