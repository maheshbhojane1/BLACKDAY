import { useEffect, useState } from 'react';
import { fetchEvidence } from '../api';

const FILTERS = ['all', 'photo', 'video', 'testimony'];

export default function EvidenceWall({ refreshKey }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchEvidence()
      .then((data) => {
        if (active) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Could not load the archive.');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [refreshKey]);

  const filtered = items.filter((i) => filter === 'all' || i.type === filter);

  return (
    <section id="wall">
      <div className="wrap">
        <div className="wall-head">
          <div>
            <div className="eyebrow">The archive</div>
            <h2>Evidence Wall</h2>
          </div>
          <div className="filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="empty">Loading archive…</div>}
        {!loading && error && <div className="empty">{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="empty">Nothing here yet. Be the first to submit.</div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid">
            {filtered.map((item, idx) => (
              <div className="card" key={idx}>
                <div className="thumb">{item.fileName || 'No file attached to this demo entry'}</div>
                <div className="body">
                  <div className="tag">{item.tag}</div>
                  <div className="desc">{item.desc || 'No description provided.'}</div>
                  <div className="meta">
                    {item.location || 'Location unknown'} · {item.date || '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
