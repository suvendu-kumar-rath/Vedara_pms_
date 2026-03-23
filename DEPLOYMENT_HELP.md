# Vercel + Vite SPA Deployment Notes

If you still see MIME type errors after deployment, try these steps:

1. **Ensure vercel.json is present** with the following rewrite rule:

   ```json
   {
     "routes": [
       { "src": "/(.*)", "dest": "/index.html" }
     ]
   }
   ```

2. **Build output directory** must be `dist` (default for Vite).

3. **Build command** should be `npm run build` or `vite build`.

4. **Check for static asset references**: All imports and asset references must be relative or use the Vite alias (`@/`).

5. **If you use custom domains or rewrites in Vercel dashboard,** ensure they do not override the SPA rule above.

6. **If the error persists:**
   - Open the browser Network tab, find the failed JS file, and check the response body. If it is HTML, the route is not being handled as a static asset or SPA route.
   - Try redeploying or clearing Vercel cache.

If you need further help, provide the URL of the failed JS file and its response body.
