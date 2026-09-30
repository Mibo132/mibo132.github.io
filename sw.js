// Clash of Cities: the service worker, only for Web Push notifications (nothing is cached).
// The server sends encrypted pushes as JSON: { title, body, kind, tag, data }.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  let d = {};
  try {
    d = e.data ? e.data.json() : {};
  } catch (err) {
    d = { body: e.data ? e.data.text() : '' };
  }
  e.waitUntil(
    self.registration.showNotification(d.title || 'Clash of Cities', {
      body: d.body || '',
      tag: d.tag || d.kind || undefined,
      renotify: !!d.tag,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      data: { kind: d.kind || null, ...(d.data || {}) },
    }),
  );
});

// A tap on a notification brings the game to the front (or opens it). "Attacked your base" (kind
// battle) opens the replay of that battle.
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const d = e.notification.data || {}, battle = d.kind === 'battle' && d.battleId ? String(d.battleId) : null;
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (!('focus' in c)) continue;
        if (battle) c.postMessage({ type: 'open-battle', id: battle });
        return c.focus();
      }
      return self.clients.openWindow(battle ? `./?battle=${encodeURIComponent(battle)}` : './');
    }),
  );
});
