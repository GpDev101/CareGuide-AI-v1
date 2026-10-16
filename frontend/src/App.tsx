import { useEffect, useState } from 'react';

type Health = {
  status: string;
  service: string;
  version: string;
  timestamp: string;
};

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/v1/health', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`API returned HTTP ${response.status}`);
        return (await response.json()) as Health;
      })
      .then(setHealth)
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name === 'AbortError') return;
        setError(reason instanceof Error ? reason.message : 'Could not reach the API');
      });

    return () => controller.abort();
  }, []);

  const apiIsUp = health?.status === 'UP';

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="CareGuide AI home">
          <span className="brand-mark">C</span>
          <span>CareGuide <b>AI</b></span>
        </a>
        <span className="topbar-label">DEVELOPER PREVIEW · V1</span>
      </header>

      <section className="hero" id="home">
        <div className="eyebrow"><span className="dot" /> TRUSTED KNOWLEDGE. TRACEABLE ANSWERS.</div>
        <h1>Find answers in your<br /><em>approved knowledge.</em></h1>
        <p className="intro">
          CareGuide AI is an evidence-grounded knowledge assistant for healthcare
          and mental-health operations. Answers will link back to their source material.
        </p>
        <div className="preview-state" role="status" aria-live="polite">
          <span className={`status-indicator ${apiIsUp ? 'up' : error ? 'down' : 'pending'}`} />
          <div>
            <strong>{apiIsUp ? 'API connected' : error ? 'API unavailable' : 'Checking API connection'}</strong>
            <small>
              {apiIsUp
                ? `${health?.service} · ${health?.version}`
                : error ?? 'Connecting to the local Spring Boot service…'}
            </small>
          </div>
        </div>
      </section>

      <section className="cards" aria-label="Product principles">
        <article className="feature-card">
          <span className="card-icon">01</span>
          <h2>Grounded responses</h2>
          <p>Answers will be generated from approved sources, with citations that people can verify.</p>
        </article>
        <article className="feature-card">
          <span className="card-icon">02</span>
          <h2>Access by design</h2>
          <p>Organization and document permissions must be checked by the backend before retrieval.</p>
        </article>
        <article className="feature-card">
          <span className="card-icon">03</span>
          <h2>Measured quality</h2>
          <p>Retrieval quality, citation correctness, latency and cost will be evaluated—not guessed.</p>
        </article>
      </section>

      <footer>
        <span>CareGuide AI · Portfolio project</span>
        <span>Not a diagnostic or treatment system</span>
      </footer>
    </main>
  );
}
