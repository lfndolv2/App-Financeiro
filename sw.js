const CACHE='financeiro-v2';
const ASSETS=['./','./index.html','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
// network-first no HTML (pega atualizações), cache-first no resto
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isHTML=e.request.mode==='navigate'||e.request.destination==='document';
  if(isHTML){
    e.respondWith(
      fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;})
        .catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
    );
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
      const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;})));
  }
});
