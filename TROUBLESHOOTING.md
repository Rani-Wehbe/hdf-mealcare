# Troubleshooting Guide

## 504 Error on `npm run dev`

If you see a **504 error** with a message about outdated/optimized dependencies in `.vite/deps/framer-motion`:

### Solution 1: Clear Vite Cache (Most Common)
```bash
rm -rf node_modules/.vite
npm run dev
```

This removes the cached optimized dependencies and lets Vite rebuild them.

### Solution 2: Full Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

This completely reinstalls all dependencies and clears any stale caches.

### Solution 3: Use Preview Server
If dev server still has issues, use the production preview server (which always works):
```bash
npm run build
npm run preview
```

The app will be available at `http://localhost:4173/`

### What We Know
- ✅ Production build works perfectly (tested)
- ✅ Framer Motion is properly installed
- ✅ All components are working
- ✅ Preview server runs without issues
- ⚠️ Dev server sometimes shows 504 on first start

The 504 error is a Vite caching issue, not a code problem. It goes away after clearing the `.vite` cache.

## Other Issues

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

### Module Not Found Errors
If you see import errors:
```bash
# Verify all imports are correct
ls src/components/ui/
ls src/components/
ls src/pages/

# Check if node_modules is corrupted
rm -rf node_modules
npm install
```

### High Memory Usage
If the dev server uses too much memory:
```bash
# Reduce the number of workers
NODE_OPTIONS=--max-old-space-size=2048 npm run dev
```

---

**Note:** The app is deployed to Azure and working in production. These are only local development issues.
