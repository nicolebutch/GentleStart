/* Offline support. Bump VERSION whenever app files change so installed copies update. */
var VERSION='gs-v45';
var SHELL=['./','index.html','styles.css','app.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','art/library-light.png','art/library-dark.png','art/stroke-long-ink.png','art/stroke-long-gold.png','art/stroke-short-ink.png','art/stroke-short-gold.png','art/stroke-wave-ink.png','art/stroke-wave-gold.png','art/quill-ink.png','art/quill-gold.png','art/birch-trunk.png','art/vine.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION&&k!=='gs-fonts'}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    // fonts: serve cached copy, refresh in the background
    e.respondWith(caches.open('gs-fonts').then(function(c){return c.match(r).then(function(hit){
      var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(function(){return hit});
      return hit||net;
    })}));
    return;
  }
  if(u.origin!==location.origin)return;
  // app files: network first so updates arrive, cache as the offline fallback
  e.respondWith(fetch(r).then(function(res){
    if(res&&res.ok){var cp=res.clone();caches.open(VERSION).then(function(c){c.put(r,cp)})}
    return res;
  }).catch(function(){return caches.match(r).then(function(hit){return hit||caches.match('index.html')})}));
});
