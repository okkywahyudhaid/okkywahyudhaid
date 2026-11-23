// Vercel Serverless Function: jembatan aman antara frontend dan Google Apps Script.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Metode tidak diizinkan.' });
  }

  const gasUrl = process.env.GAS_WEB_APP_URL;
  if (!gasUrl || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(gasUrl)) {
    return res.status(500).json({ ok: false, error: 'GAS_WEB_APP_URL belum diatur atau format URL tidak valid.' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const upstream = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });
    const raw = await upstream.text();
    let data;
    try { data = JSON.parse(raw); }
    catch (_) { throw new Error('Google Apps Script tidak mengembalikan JSON. Periksa deployment doPost.'); }
    return res.status(upstream.ok ? 200 : upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({
      ok: false,
      error: err && err.message ? err.message : 'Tidak dapat menghubungi Google Apps Script.'
    });
  }
};
