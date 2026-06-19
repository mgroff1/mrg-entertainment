
<section class="page">
  <div class="shell">
    <header>
      <div class="eyebrow">
        <span class="dot"></span>
        <span>About Mickey</span>
      </div>

      <h1>
        Building <span class="highlight">clean systems</span><br />
        for messy, real‑world problems.
      </h1>

      <p class="subtitle">
        I’m Mickey — a self‑taught developer and independent contractor who lives at the intersection of
        <strong>product thinking</strong>, <strong>clean architecture</strong>, and
        <strong>real‑world constraints</strong>. I like taking chaotic ideas, breaking them down into
        something logical, and then shipping the thing that actually works.
      </p>
    </header>

    <div class="grid">
      <div class="main">
        <article class="card">
          <h2 class="card-title">What I do</h2>
          <p>
            I split my time between <strong>marketing & social media work</strong> for clients and
            <strong>building my own products</strong> — apps, tools, and systems that solve problems I
            actually care about. I’ve worked on everything from <strong>social apps</strong> to
            <strong>physics‑driven games</strong> to <strong>logic‑based circuit puzzles</strong>.
          </p>
          <ul>
            <li>architecture that stays understandable six months later,</li>
            <li>UIs that feel light instead of bloated,</li>
            <li>and products that respect the people using them.</li>
          </ul>
        </article>

        <article class="card">
          <h2 class="card-title">How I work</h2>
          <p>
            I like to start with the <strong>system</strong> — entities, flows, edge cases — and then
            layer on design and polish. I’m happiest when I can:
          </p>
          <ul>
            <li>take a vague idea and turn it into a concrete architecture,</li>
            <li>ship iteratively without trashing code quality,</li>
            <li>and keep things honest: no fake metrics, no dark patterns.</li>
          </ul>
        </article>

        <article class="card">
          <h2 class="card-title">What I’m building toward</h2>
          <p>
            Right now I’m especially interested in systems that deal with
            <strong>trust, reputation, and real‑world behavior</strong> — things like roommate ledgers,
            shared‑living tools, and simulations that make complex ideas feel tangible.
          </p>
        </article>
      </div>

      <aside class="side">
        <div class="side-card">
          <h2 class="side-title">Stack & tools</h2>
          <p>
            I lean toward tools that stay out of the way and let me ship fast without turning the codebase
            into a junk drawer.
          </p>

          <ul class="stack-list">
            <li><span class="bullet"></span>Flutter & Dart</li>
            <li><span class="bullet"></span>Svelte & SvelteKit</li>
            <li><span class="bullet"></span>TypeScript / JS</li>
            <li><span class="bullet"></span>Firebase / Appwrite</li>
            <li><span class="bullet"></span>Cloudflare Pages / Functions</li>
            <li><span class="bullet"></span>GitHub & CI workflows</li>
          </ul>

          <div class="cta-row">
            <a href="/contact" class="btn primary">Start a project ↗</a>
            <a href="/projects" class="btn ghost">View my work</a>
          </div>
        </div>

        <div class="card">
          <h2 class="card-title">Outside the screen</h2>
          <p>
            When I’m not buried in code, I’m usually:
          </p>
          <ul>
            <li>tinkering with PC hardware,</li>
            <li>listening to heavy music,</li>
            <li>or getting lost in physics and astronomy rabbit holes.</li>
          </ul>
        </div>
      </aside>
    </div>

    <footer>
      <span>Based in <strong>Boise, Idaho</strong></span>
      <span>Available for <strong>collabs & contracts</strong></span>
    </footer>
  </div>
</section>

<style>
  :global(body) {
    background: #05060a;
    color: #f9fafb;
    font-family: system-ui, sans-serif;
  }

  .page {
    display: flex;
    justify-content: center;
    padding: 40px 16px;
  }

  .shell {
    width: 100%;
    max-width: 960px;
    background: #0b0d14;
    border-radius: 20px;
    padding: 32px;
    border: 1px solid rgba(255,255,255,0.08);
  }

  header {
    margin-bottom: 32px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.05);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9ca3af;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #6366f1;
  }

  h1 {
    font-size: 2.4rem;
    margin-top: 12px;
    line-height: 1.2;
  }

  .highlight {
    background: linear-gradient(120deg, #a5b4fc, #f9a8d4);
    -webkit-background-clip: text;
    color: transparent;
  }

  .subtitle {
    margin-top: 12px;
    color: #9ca3af;
    max-width: 600px;
    line-height: 1.6;
  }

  .grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr;
    gap: 24px;
  }

  @media (max-width: 800px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  .card, .side-card {
    background: #11131a;
    padding: 20px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 16px;
  }

  .card-title, .side-title {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #9ca3af;
    margin-bottom: 10px;
  }

  ul {
    margin-top: 10px;
    padding-left: 20px;
    color: #d1d5db;
    line-height: 1.6;
  }

  .stack-list {
    list-style: none;
    padding: 0;
    margin-top: 12px;
  }

  .stack-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6366f1;
  }

  .cta-row {
    margin-top: 16px;
    display: flex;
    gap: 10px;
  }

  .btn {
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 0.85rem;
    text-decoration: none;
    display: inline-block;
  }

  .primary {
    background: #4f46e5;
    color: white;
  }

  .ghost {
    border: 1px solid rgba(255,255,255,0.2);
        color: #e5e7eb;
  }

  footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    color: #9ca3af;
    font-size: 0.85rem;
  }

  @media (max-width: 600px) {
    footer {
      flex-direction: column;
      gap: 6px;
    }
  }
</style>