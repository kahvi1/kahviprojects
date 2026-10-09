/**
 * All text on the page lives here. Edit this file to update projects,
 * services or contact details; the components only handle layout.
 */
import {
  BrainCircuit,
  Briefcase,
  GitMerge,
  GraduationCap,
  Rocket,
  SearchCode,
  Sparkles,
  Trophy,
} from 'lucide-react'

import type {
  EngagementModel,
  FeaturedProject,
  Highlight,
  Metric,
  ProcessStep,
  Project,
  Service,
  SkillGroup,
} from '../types'

export const profile = {
  name: 'Kahvi',
  fullName: 'Muhammad Kahvi Khakam Syah',
  role: 'Data Platform Engineer & ML Researcher',
  location: 'Based in Indonesia',
  availability: 'Available for consulting',
  email: 'kahvikhakam@gmail.com',
  github: 'https://github.com/kahvi1',
  linkedin: 'https://www.linkedin.com/in/muhammadkahvi-khakam-syah-22a373282',
  headline: {
    lead: 'Turning messy data into',
    highlight: 'reliable systems.',
  },
  intro:
    'I build entity-resolution pipelines for national data, hybrid search engines, and study when tabular foundation models like TabPFN beat tuned baselines. I help teams do the same for their data, ML and product work.',
}

export const stats: Metric[] = [
  { value: '1', label: 'Peer-reviewed paper on TabPFN' },
  { value: 'Top 25', label: 'Kattis ranking, Central Java' },
  { value: 'CTO', label: 'Ex co-founder of kolala' },
]

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'national-data-platform',
    title: 'National Data Platform: Entity Resolution',
    status: 'current',
    period: 'Sep 2026 – present',
    role: 'Data Platform Engineering',
    org: 'Ministry of National Development Planning (Bappenas), Center for Development Planning Data and Information',
    summary:
      'National datasets arrive from many producers, and the same real-world entity, such as a village, often appears several times with different spellings and codes. I am building the deduplication layer that resolves these records into one row per entity before the data reaches the national data catalogue.',
    highlights: [
      'Orchestrated end to end with Apache Airflow, from raw producer data to published, deduplicated tables.',
      'Cleaning and standardisation with OpenRefine and an LLM: names, abbreviations, region codes and formats.',
      'Probabilistic record linkage with Splink: blocking by region, fuzzy field comparisons and EM-trained match weights.',
      'Confident matches merge automatically; borderline pairs are routed to human review.',
      'Deduplicated tables are documented and searchable in DataHub, the platform data catalogue.',
      'A no-code, drag-and-drop desktop client (in progress) so staff can deduplicate files themselves.',
    ],
    stack: ['Apache Airflow', 'Python', 'LLM', 'OpenRefine', 'Splink', 'DataHub', 'Electron', 'React'],
    flow: {
      caption: 'Orchestrated by Apache Airflow',
      steps: [
        { label: 'Ingest', detail: 'Raw producer data' },
        { label: 'Clean', detail: 'OpenRefine + LLM' },
        { label: 'Match', detail: 'Splink record linkage' },
        { label: 'Review', detail: 'Borderline pairs' },
        { label: 'Publish', detail: 'DataHub catalogue' },
      ],
    },
    links: [{ label: 'Desktop client (WIP)', href: 'https://github.com/kahvi1/dedup', kind: 'code' }],
  },
  {
    id: 'tabpfn-research',
    title: 'TabPFN Research: Foundation Models for Small Tabular Data',
    status: 'research',
    period: '2025 – 2026',
    role: 'Co-author',
    org: 'Department of Computer Science, Universitas Negeri Semarang',
    summary:
      'Labelled data in student mental-health research is scarce, and classic models need plenty of data and hyperparameter tuning to generalise. We evaluated TabPFN, a transformer-based tabular foundation model that predicts without any tuning, to find out when it actually beats well-tuned baselines.',
    highlights: [
      'Benchmarked TabPFN against HPO-tuned Random Forest, XGBoost, SVM and Naive Bayes.',
      'Three student mental-health datasets of very different sizes: 101, 7,022 and 27,901 rows.',
      'Found a clear crossover by data size: TabPFN wins on the small, imbalanced dataset, while tuned tree ensembles take over as data grows.',
    ],
    stack: ['Python', 'TabPFN', 'XGBoost', 'scikit-learn'],
    metrics: [
      { value: '85.7%', label: 'TabPFN accuracy on the 101-row dataset' },
      { value: '81.0%', label: 'Best HPO-tuned baseline, same data' },
      { value: '3', label: 'Datasets, from 101 to 27,901 rows' },
    ],
    publication: {
      title: 'Performance Evaluation of TabPFN for Student Depression Prediction Across Varying Sample Sizes',
      venue: 'Jurnal Ilmu Komputer dan Informasi (JIKI), Universitas Indonesia',
      details: 'Sinta 2 accredited · pp. 169–177',
      status: 'In press, 2026',
    },
    links: [],
  },
  {
    id: 'kolala-matching',
    title: 'kolala Matching Engine',
    status: 'past',
    period: 'May – Nov 2025',
    role: 'Co-founder & CTO',
    org: 'kolala, a creator–brand marketplace funded by the Indonesian P2MW student-entrepreneur grant',
    summary:
      'kolala connected Indonesian brands and small businesses with local content creators. As the only engineer on a five-person founding team, I owned the architecture and built the matching engine at the heart of the product: it turns a free-text brand brief into a ranked shortlist of creators.',
    highlights: [
      'Two-stage retrieve-and-rank: hybrid dense + BM25 retrieval fused with Reciprocal Rank Fusion, then a structured rerank.',
      'The rerank blends semantic fit, engagement, audience fit, budget, brand safety and recency with normalised weights.',
      'Multilingual sentence embeddings over captions, image descriptions and comments, aggregated per creator by engagement and recency.',
      'Indonesian briefs become a retrieval query plus hard filters (budget, region, language, category) applied before scoring.',
      'Offline evaluation with recall@10, MRR@10 and nDCG@10, with ablations so every stage earns its place.',
      'Also shipped the Go + PostgreSQL backend, a Next.js 15 web app and a Flutter mobile prototype.',
    ],
    stack: ['Python', 'FastAPI', 'sentence-transformers', 'BM25', 'Qdrant', 'Go', 'PostgreSQL', 'Next.js'],
    metrics: [
      { value: '40 → 10', label: 'Retrieve, then rerank to a shortlist' },
      { value: '6', label: 'Signals in the structured rerank' },
      { value: '3', label: 'Ranking metrics in offline evaluation' },
    ],
    links: [
      { label: 'Pre-register site', href: 'https://github.com/kahvi1/kolala-preregister-web', kind: 'code' },
    ],
  },
]

export const otherProjects: Project[] = [
  {
    id: 'flashsale',
    title: 'flashsale',
    status: 'current',
    period: 'Sep 2026 – present',
    description:
      'A hand-written Go backend exploring flash-sale reservations under massive concurrent load: first reproduce overselling with a naive design, then fix it.',
    stack: ['Go', 'MySQL', 'golang-migrate'],
    links: [{ label: 'Code', href: 'https://github.com/kahvi1/flashsale', kind: 'code' }],
  },
  {
    id: 'gpu-bootstrap',
    title: 'GPU dev-box bootstrap',
    status: 'current',
    period: 'Oct 2026',
    description:
      'A re-runnable script that turns a fresh Ubuntu 24.04 GPU machine into a ready workspace: Neovim, clangd configured for CUDA, Claude Code and PyTorch.',
    stack: ['Bash', 'Lua', 'CUDA'],
    links: [{ label: 'Code', href: 'https://github.com/kahvi1/dotfiles', kind: 'code' }],
  },
  {
    id: 'raky',
    title: 'Raky: landing page & blog',
    status: 'past',
    period: '2026 · Freelance',
    description:
      'Client work for a video-editing service for creators: a responsive landing page plus a Medium-style blog with writing and reading views.',
    stack: ['React 19', 'Vite', 'Tailwind CSS v4'],
    links: [
      { label: 'Live', href: 'https://raky-frontend.vercel.app', kind: 'live' },
      { label: 'Code', href: 'https://github.com/kahvi1/raky-frontend', kind: 'code' },
    ],
  },
  {
    id: 'resic',
    title: 'RESIC: Semarang Smart City',
    status: 'past',
    period: 'Mar 2026',
    description:
      'A clickable mobile prototype for a recycling service: sell waste by the kilo, track pickups and withdraw earnings to e-wallets.',
    stack: ['React', 'Tailwind CSS'],
    links: [
      { label: 'Live', href: 'https://resic.vercel.app', kind: 'live' },
      { label: 'Code', href: 'https://github.com/kahvi1/resic', kind: 'code' },
    ],
  },
  {
    id: 'kolala-preregister',
    title: 'kolala pre-register site',
    status: 'past',
    period: 'Sep 2025',
    description: 'The pre-registration landing page for kolala, the creator–brand marketplace.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS v4'],
    links: [{ label: 'Code', href: 'https://github.com/kahvi1/kolala-preregister-web', kind: 'code' }],
  },
  {
    id: 'face-collage',
    title: 'Face-detection collage maker',
    status: 'past',
    period: 'Jun 2025 · Team capstone',
    description:
      'Detects the main face in each uploaded photo, crops it and tiles the faces into a downloadable collage. Built for an image-processing course.',
    stack: ['Python', 'Streamlit', 'OpenCV'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/kahvi1/image-college-maker-w-face-detection',
        kind: 'code',
      },
    ],
  },
]

export const services: Service[] = [
  {
    id: 'data-pipelines',
    title: 'Data pipelines & entity resolution',
    icon: GitMerge,
    summary: 'Clean, deduplicate and link records from many sources so the numbers downstream can be trusted.',
    deliverables: [
      'Data-quality audit of your sources',
      'Record linkage and deduplication with Splink',
      'Orchestrated pipelines and a searchable data catalogue',
    ],
  },
  {
    id: 'tabular-ml',
    title: 'Applied ML for tabular data',
    icon: BrainCircuit,
    summary: 'Choose the right model for the data you actually have, including small and imbalanced datasets.',
    deliverables: [
      'Benchmark of TabPFN against tuned baselines on your data',
      'Clear evaluation and model-selection report',
      'Reproducible notebooks or a small prediction service',
    ],
  },
  {
    id: 'search-retrieval',
    title: 'Search, matching & RAG',
    icon: SearchCode,
    summary: 'Hybrid retrieval and reranking that surfaces the right results, with metrics to prove it.',
    deliverables: [
      'Dense + BM25 hybrid retrieval with rank fusion',
      'Structured reranking with your business signals',
      'Offline evaluation: recall, MRR and nDCG',
    ],
  },
  {
    id: 'product-builds',
    title: 'MVPs & full-stack builds',
    icon: Rocket,
    summary: 'From idea to a working product: web app, API and database, built to hand over.',
    deliverables: [
      'React / Next.js front ends with Tailwind CSS',
      'Go or FastAPI backends on PostgreSQL',
      'Landing pages and marketing sites',
    ],
  },
]

export const engagementModels: EngagementModel[] = [
  {
    title: 'Advisory call',
    description:
      'A focused session to review your data, architecture or model choices. You leave with concrete next steps.',
    bestFor: 'A quick second opinion',
  },
  {
    title: 'Fixed-scope project',
    description: 'A clearly defined deliverable, such as a pipeline, a benchmark or an MVP, with agreed scope and timeline.',
    bestFor: 'Well-defined problems',
  },
  {
    title: 'Ongoing retainer',
    description: 'A set number of hours each month as your part-time data or ML engineer.',
    bestFor: 'Teams without in-house data or ML',
  },
]

export const processSteps: ProcessStep[] = [
  { title: 'Discover', description: 'We talk through your goals, data and constraints.' },
  { title: 'Propose', description: 'You get a written scope, approach and timeline.' },
  { title: 'Build', description: 'I work in short iterations and share progress as I go.' },
  { title: 'Hand over', description: 'Documentation and a walkthrough so your team owns the result.' },
]

export const about = {
  paragraphs: [
    "I'm Kahvi (Muhammad Kahvi Khakam Syah), a Computer Science student at Universitas Negeri Semarang working where data engineering meets applied machine learning.",
    "Right now I'm building the entity-resolution layer of a national data platform at Indonesia's Ministry of National Development Planning (Bappenas). Before that I co-founded kolala as CTO and built its creator-matching engine, and I co-authored a peer-reviewed paper on TabPFN for small-data prediction.",
    'I care about systems that are measurable and maintainable: clear evaluation, honest trade-offs and code your team can own after I leave.',
  ],
  highlights: [
    {
      icon: GraduationCap,
      title: 'B.Sc. Computer Science',
      detail: 'Universitas Negeri Semarang · 2023 – 2027 (expected)',
    },
    { icon: Trophy, title: 'Top 25 on Kattis, Central Java', detail: 'Ranked #1 competitive programmer at my university' },
    { icon: Briefcase, title: 'Co-founder & CTO, kolala', detail: 'May – Nov 2025' },
    { icon: Sparkles, title: 'Google HackFest 2024', detail: 'Participant' },
  ] satisfies Highlight[],
  skills: [
    { label: 'Languages', items: ['Python', 'Go', 'TypeScript', 'SQL', 'Rust', 'Dart'] },
    {
      label: 'Data & ML',
      items: ['Apache Airflow', 'Splink', 'OpenRefine', 'DataHub', 'TabPFN', 'XGBoost', 'scikit-learn'],
    },
    {
      label: 'Search & retrieval',
      items: ['sentence-transformers', 'BM25', 'Reciprocal Rank Fusion', 'Qdrant'],
    },
    {
      label: 'Web & backend',
      items: ['React', 'Next.js', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Flutter'],
    },
  ] satisfies SkillGroup[],
}

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
