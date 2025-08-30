// Handle bila orang buka short link
app.get('/:id', (req, res) => {
  const id = req.params.id;
  const link = db.prepare('SELECT * FROM links WHERE id = ?').get(id);
  
  if (!link) {
    return res.status(404).send('Link not found');
  }

  // Log event
  db.prepare('INSERT INTO events (linkId, ip, userAgent) VALUES (?, ?, ?)')
    .run(id, req.ip, req.headers['user-agent']);

  // Hantar landing page dengan targetUrl dalam query
  res.redirect(`/landing.html?target=${encodeURIComponent(link.targetUrl)}`);
});
