import { useState } from 'react';
import { submitEvidence } from '../api';

const TAG_MAP = { photo: 'Photo', video: 'Video', testimony: 'Testimony' };

const INITIAL = {
  name: '',
  type: 'photo',
  location: '',
  date: '2026-07-20',
  desc: '',
  consent: false,
};

export default function UploadForm({ onSubmitted }) {
  const [form, setForm] = useState(INITIAL);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.consent) return;
    setSubmitting(true);
    setMsg('');
    try {
      await submitEvidence({
        type: form.type,
        tag: TAG_MAP[form.type],
        desc: form.desc,
        location: form.location,
        date: form.date,
        fileName: file ? file.name : null,
      });
      setMsg('Saved to the archive.');
      setForm(INITIAL);
      setFile(null);
      onSubmitted?.();
    } catch (err) {
      setMsg(err.message || 'Something went wrong — try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="submit">
      <div className="wrap">
        <div className="upload-panel">
          <div className="eyebrow">Add to the record</div>
          <h2>Submit what you saw</h2>
          <p className="sub">
            If you were at Jantar Mantar, Parliament Street, or any protest site on or after 20
            July, you can add your footage, photos, or written testimony here. Every submission is
            reviewed before it goes public — this keeps the archive credible and protects people
            from false or doctored content.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Your name (optional)</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Leave blank to stay anonymous"
              />
            </div>
            <div className="field">
              <label htmlFor="type">Type of submission</label>
              <select id="type" value={form.type} onChange={(e) => update('type', e.target.value)}>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="testimony">Written testimony</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="e.g. Jantar Mantar, New Delhi"
              />
            </div>
            <div className="field">
              <label htmlFor="date">Date recorded</label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
              />
            </div>
            <div className="field full">
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                value={form.desc}
                onChange={(e) => update('desc', e.target.value)}
                placeholder="What does this show? Who's in it, what happened, anything viewers should know."
              />
            </div>
            <div className="field full">
              <label htmlFor="file">File (photo or video)</label>
              <input
                id="file"
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0] || null)}
              />
            </div>
            <div className="field full">
              <label className="consent">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  required
                />
                I confirm this is authentic, unedited, and mine to share — and I understand it
                will be reviewed before publishing.
              </label>
            </div>
            <div className="submit-row">
              <button type="submit" className="btn primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit to Archive'}
              </button>
              <span id="formMsg">{msg}</span>
            </div>
          </form>

          <p className="form-note">
            Note: submissions on this page are saved to your own browser only, as a working demo.
            Connect <code>src/api.js</code> to your backend to make this a real, public archive
            that accepts uploads from anyone.
          </p>
        </div>
      </div>
    </section>
  );
}
