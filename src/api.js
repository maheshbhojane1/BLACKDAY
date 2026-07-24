// ---------------------------------------------------------------------------
// DATA LAYER
// Every read/write for the Evidence Wall goes through the two functions below.
// Right now they use localStorage so the site works as a demo with no backend.
//
// TO CONNECT A REAL DATABASE:
// 1. Stand up an API (Node/Express, Next.js API routes, Firebase, Supabase...)
//    with two endpoints: GET /evidence and POST /evidence (multipart/form-data
//    if you want the file itself uploaded here, or JSON + a separate
//    presigned-upload-URL flow for large video files).
// 2. Replace the body of fetchEvidence() with a fetch('GET /evidence').
// 3. Replace the body of submitEvidence() with a fetch('POST /evidence').
// 4. Delete SEED_ITEMS and localStorage usage once real data is flowing.
// 5. Add a moderation flag (e.g. status: 'pending' | 'approved') server-side,
//    and only return status === 'approved' items from GET /evidence — so
//    public visitors never see unreviewed submissions.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'blackday_items';

export const SEED_ITEMS = [
  {
    type: 'photo',
    tag: 'Photo',
    desc: 'Placeholder — awaiting your upload from Jantar Mantar.',
    location: 'Jantar Mantar, New Delhi',
    date: '2026-07-20',
    fileName: null,
  },
  {
    type: 'video',
    tag: 'Video',
    desc: 'Placeholder — awaiting footage from Parliament Street.',
    location: 'Parliament Street, New Delhi',
    date: '2026-07-20',
    fileName: null,
  },
  {
    type: 'testimony',
    tag: 'Testimony',
    desc: 'Placeholder — awaiting a written account from someone who was there.',
    location: 'New Delhi',
    date: '2026-07-20',
    fileName: null,
  },
];

export async function fetchEvidence() {
  // --- Real backend version would be: ---
  // const res = await fetch('/api/evidence');
  // if (!res.ok) throw new Error('Failed to load evidence');
  // return res.json();

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return [...stored, ...SEED_ITEMS];
}

export async function submitEvidence(item) {
  // --- Real backend version would be: ---
  // const formData = new FormData();
  // Object.entries(item).forEach(([k, v]) => formData.append(k, v));
  // const res = await fetch('/api/evidence', { method: 'POST', body: formData });
  // if (!res.ok) throw new Error('Failed to submit evidence');
  // return res.json();

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  stored.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return item;
}
