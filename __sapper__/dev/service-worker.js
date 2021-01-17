(function () {
	'use strict';

	// This file is generated by Sapper — do not edit it!
	const timestamp = 1610890874507;

	const files = [
		"/service-worker-index.html",
		"/background.svg",
		"/favicon.png",
		"/global.css",
		"/logo-192.png",
		"/logo-512.png",
		"/manifest.json"
	];

	const shell = [
		"/client/client.c2574e4a.js",
		"/client/inject_styles.f6fc8b04.js",
		"/client/_rollup-plugin-inject-process-env.d2a692b0.js",
		"/client/index.4416f833.js",
		"/client/Button.bce3b8d8.js",
		"/client/ApolloClientStore.7d95f40c.js",
		"/client/index.be0e0d90.js",
		"/client/graphql.367d681c.js",
		"/client/_layout.e64b592a.js",
		"/client/index.010b4607.js",
		"/client/interval.6347a3cd.js",
		"/client/async.b3997ab3.js",
		"/client/_layout.a9e30d1c.js",
		"/client/index.8073414f.js",
		"/client/tap.22380685.js",
		"/client/index.8d6e1846.js",
		"/client/[slug].ee571c6e.js",
		"/client/index.e194edfc.js",
		"/client/sapper-dev-client.557e78e5.js"
	];

	const ASSETS = `cache${timestamp}`;
	// `shell` is an array of all the files generated by the bundler,
	// `files` is an array of everything in the `static` directory
	const to_cache = shell.concat(files);
	const staticAssets = new Set(to_cache);
	self.addEventListener('install', (event) => {
	    event.waitUntil(caches
	        .open(ASSETS)
	        .then((cache) => cache.addAll(to_cache))
	        .then(() => {
	        self.skipWaiting();
	    }));
	});
	self.addEventListener('activate', (event) => {
	    event.waitUntil(caches.keys().then(async (keys) => {
	        // delete old caches
	        for (const key of keys) {
	            if (key !== ASSETS)
	                await caches.delete(key);
	        }
	        self.clients.claim();
	    }));
	});
	/**
	 * Fetch the asset from the network and store it in the cache.
	 * Fall back to the cache if the user is offline.
	 */
	async function fetchAndCache(request) {
	    const cache = await caches.open(`offline${timestamp}`);
	    try {
	        const response = await fetch(request);
	        cache.put(request, response.clone());
	        return response;
	    }
	    catch (err) {
	        const response = await cache.match(request);
	        if (response)
	            return response;
	        throw err;
	    }
	}
	self.addEventListener('fetch', (event) => {
	    if (event.request.method !== 'GET' || event.request.headers.has('range'))
	        return;
	    const url = new URL(event.request.url);
	    // don't try to handle e.g. data: URIs
	    const isHttp = url.protocol.startsWith('http');
	    const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
	    const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
	    const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;
	    if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
	        event.respondWith((async () => {
	            // always serve static files and bundler-generated assets from cache.
	            // if your application has other URLs with data that will never change,
	            // set this variable to true for them and they will only be fetched once.
	            const cachedAsset = isStaticAsset && (await caches.match(event.request));
	            // for pages, you might want to serve a shell `service-worker-index.html` file,
	            // which Sapper has generated for you. It's not right for every
	            // app, but if it's right for yours then uncomment this section
	            /*
	                    if (!cachedAsset && url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
	                        return caches.match('/service-worker-index.html');
	                    }
	                    */
	            return cachedAsset || fetchAndCache(event.request);
	        })());
	    }
	});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS13b3JrZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2aWNlLXdvcmtlci5qcyIsIi4uLy4uL3NyYy9zZXJ2aWNlLXdvcmtlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gMTYxMDg5MDg3NDUwNztcblxuZXhwb3J0IGNvbnN0IGZpbGVzID0gW1xuXHRcIi9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sXCIsXG5cdFwiL2JhY2tncm91bmQuc3ZnXCIsXG5cdFwiL2Zhdmljb24ucG5nXCIsXG5cdFwiL2dsb2JhbC5jc3NcIixcblx0XCIvbG9nby0xOTIucG5nXCIsXG5cdFwiL2xvZ28tNTEyLnBuZ1wiLFxuXHRcIi9tYW5pZmVzdC5qc29uXCJcbl07XG5leHBvcnQgeyBmaWxlcyBhcyBhc3NldHMgfTsgLy8gbGVnYWN5XG5cbmV4cG9ydCBjb25zdCBzaGVsbCA9IFtcblx0XCIvY2xpZW50L2NsaWVudC5jMjU3NGU0YS5qc1wiLFxuXHRcIi9jbGllbnQvaW5qZWN0X3N0eWxlcy5mNmZjOGIwNC5qc1wiLFxuXHRcIi9jbGllbnQvX3JvbGx1cC1wbHVnaW4taW5qZWN0LXByb2Nlc3MtZW52LmQyYTY5MmIwLmpzXCIsXG5cdFwiL2NsaWVudC9pbmRleC40NDE2ZjgzMy5qc1wiLFxuXHRcIi9jbGllbnQvQnV0dG9uLmJjZTNiOGQ4LmpzXCIsXG5cdFwiL2NsaWVudC9BcG9sbG9DbGllbnRTdG9yZS43ZDk1ZjQwYy5qc1wiLFxuXHRcIi9jbGllbnQvaW5kZXguYmUwZTBkOTAuanNcIixcblx0XCIvY2xpZW50L2dyYXBocWwuMzY3ZDY4MWMuanNcIixcblx0XCIvY2xpZW50L19sYXlvdXQuZTY0YjU5MmEuanNcIixcblx0XCIvY2xpZW50L2luZGV4LjAxMGI0NjA3LmpzXCIsXG5cdFwiL2NsaWVudC9pbnRlcnZhbC42MzQ3YTNjZC5qc1wiLFxuXHRcIi9jbGllbnQvYXN5bmMuYjM5OTdhYjMuanNcIixcblx0XCIvY2xpZW50L19sYXlvdXQuYTllMzBkMWMuanNcIixcblx0XCIvY2xpZW50L2luZGV4LjgwNzM0MTRmLmpzXCIsXG5cdFwiL2NsaWVudC90YXAuMjIzODA2ODUuanNcIixcblx0XCIvY2xpZW50L2luZGV4LjhkNmUxODQ2LmpzXCIsXG5cdFwiL2NsaWVudC9bc2x1Z10uZWU1NzFjNmUuanNcIixcblx0XCIvY2xpZW50L2luZGV4LmUxOTRlZGZjLmpzXCIsXG5cdFwiL2NsaWVudC9zYXBwZXItZGV2LWNsaWVudC41NTdlNzhlNS5qc1wiXG5dO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuXHR7IHBhdHRlcm46IC9eXFwvJC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2xvZ2luXFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC93cml0ZVxcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvYmxvZ1xcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvYmxvZ1xcLyhbXi9dKz8pXFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9jaGF0XFwvPyQvIH1cbl07IixudWxsXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0NBQUE7Q0FDTyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFDdkM7Q0FDTyxNQUFNLEtBQUssR0FBRztDQUNyQixDQUFDLDRCQUE0QjtDQUM3QixDQUFDLGlCQUFpQjtDQUNsQixDQUFDLGNBQWM7Q0FDZixDQUFDLGFBQWE7Q0FDZCxDQUFDLGVBQWU7Q0FDaEIsQ0FBQyxlQUFlO0NBQ2hCLENBQUMsZ0JBQWdCO0NBQ2pCLENBQUMsQ0FBQztBQUVGO0NBQ08sTUFBTSxLQUFLLEdBQUc7Q0FDckIsQ0FBQyw0QkFBNEI7Q0FDN0IsQ0FBQyxtQ0FBbUM7Q0FDcEMsQ0FBQyx1REFBdUQ7Q0FDeEQsQ0FBQywyQkFBMkI7Q0FDNUIsQ0FBQyw0QkFB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
