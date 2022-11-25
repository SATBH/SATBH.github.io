const cacheName = "cache1"; 

self.addEventListener("install", event => {
//	self.skipWaiting();
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
//				"/",
//				"/assets/android-chrome-36x36.png", 
//				"/assets/android-chrome-48x48.png", 
//				"/assets/android-chrome-72x72.png",
//				"/assets/android-chrome-96x96.png", 
//				"/assets/android-chrome-144x144.png", 
//				"/assets/android-chrome-192x192.png", 
//				"/assets/android-chrome-256x256.png", 
//				"/assets/android-chrome-384x384.png", 
//				"/assets/android-chrome-512x512.png", 
//				"/assets/apple-touch-icon.png", 
//				"/assets/apple-touch-icon-57x57.png", 
//				"/assets/apple-touch-icon-60x60.png", 
//				"/assets/apple-touch-icon-72x72.png", 
//				"/assets/apple-touch-icon-76x76.png", 
//				"/assets/apple-touch-icon-114x114.png", 
//				"/assets/apple-touch-icon-120x120.png", 
//				"/assets/apple-touch-icon-144x144.png", 
//				"/assets/apple-touch-icon-152x152.png", 
//				"/assets/apple-touch-icon-180x180.png", 
//				"/favicon.ico", 
//				"/assets/favicon-16x16.png", 
//				"/assets/favicon-32x32.png", 
//				"/index.html", 
//				"/assets/logo.png", 
//				"/main.js", 
//				"/manifest.json", 
//				"/assets/maskable_icon.png", 
//				"/assets/mstile-70x70.png", 
//				"/assets/mstile-144x144.png", 
//				"/assets/mstile-150x150.png", 
//				"/assets/mstile-310x150.png", 
//				"/assets/mstile-310x310.png", 
//				"/assets/safari-pinned-tab.svg", 
//				"/assets/share.jpg", 
//				"/assets/style.css", 
			]);
		})
	);
});

self.addEventListener("activate", event => {
	
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});
