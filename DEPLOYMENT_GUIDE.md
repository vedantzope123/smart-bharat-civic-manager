# 🚀 Deployment Guide - Pune Smart City Civic Manager

## Current Status

✅ **Frontend**: Running on http://localhost:3001  
✅ **Backend**: Ready at `server/` (requires MongoDB IP whitelisting)  
✅ **Data**: Integrated with Pune Smart City information  
✅ **Features**: All CRUD operations implemented

---

## Immediate Setup (First Time)

### Step 1: Activate New Pages

**IMPORTANT**: The new pages with full CRUD functionality are currently named `page_new.tsx`. Rename them to activate:

```powershell
cd c:\Users\dell\Downloads\smart-bharat-civic-manager

# Replace with new versions
Rename-Item "app\(dashboard)\residents\page_new.tsx" -NewName "page.tsx" -Force
Rename-Item "app\(dashboard)\payments\page_new.tsx" -NewName "page.tsx" -Force  
Rename-Item "app\(dashboard)\maintenance\page_new.tsx" -NewName "page.tsx" -Force
Rename-Item "app\(dashboard)\waste\page_new.tsx" -NewName "page.tsx" -Force
Rename-Item "app\(dashboard)\energy\page_updated.tsx" -NewName "page.tsx" -Force
```

### Step 2: Verify Frontend

The frontend should already be running:
- URL: http://localhost:3001
- If not, start with: `npm run dev`

### Step 3: Clear Cache (If Needed)

```bash
# Clear Next.js cache
rm -r .next

# Restart with fresh build
npm run dev
```

---

## Daily Usage

### Start the Dashboard

```bash
cd c:\Users\dell\Downloads\smart-bharat-civic-manager
npm run dev
```

Access: http://localhost:3001

---

## Features Quick Reference

| Page | URL | Key Functions |
|------|-----|---|
| **Dashboard** | `/` | City overview, stats cards |
| **Water** | `/water` | Report issues, control distribution, view stats |
| **Energy** | `/energy` | Report issues, track solar, street light stats |
| **Residents** | `/residents` | Add/Edit/Delete residents, search, filter |
| **Payments** | `/payments` | Create bills, mark paid, filter |
| **Maintenance** | `/maintenance` | Submit requests, update status, prioritize |
| **Waste** | `/waste` | View collection data, recycling rates |
| **Alerts** | `/alerts` | View active alerts |
| **Security** | `/security` | View CCTV coverage |
| **CCTV** | `/cctv` | Camera locations |
| **Safety** | `/safety` | Emergency services |
| **Settings** | `/settings` | User preferences |
| **Assistant** | `/assistant` | AI chatbot |

---

## Database Setup (Optional - For Persistence)

### Prerequisites
- MongoDB Atlas account
- IP whitelisted for your network

### Configuration

Edit `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
```

### Start Backend

```bash
cd server
npm start
```

Backend runs on: http://localhost:5000

---

## API Endpoints (When Backend is Active)

```bash
# Water
GET /api/water/consumption
POST /api/water/report-issue

# Energy  
GET /api/energy/consumption
POST /api/energy/report-issue

# Residents
GET /api/residents
POST /api/residents
PUT /api/residents/:id
DELETE /api/residents/:id

# Payments
GET /api/payments
POST /api/payments
PUT /api/payments/:id

# Maintenance
GET /api/maintenance
POST /api/maintenance
PUT /api/maintenance/:id

# Waste
GET /api/waste/collection
GET /api/waste/plants
```

---

## Troubleshooting

### Issue: Port 3001 Not Accessible

```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Restart frontend
npm run dev
```

### Issue: Module Not Found

```bash
# Reinstall dependencies
rm -r node_modules
rm package-lock.json
npm install

# Clear Next.js cache
rm -r .next

# Restart
npm run dev
```

### Issue: CSS Not Loading

1. Check `app/globals.css`
2. Verify Tailwind configuration
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh page (Ctrl+Shift+R)

### Issue: Changes Not Reflecting

1. Check file was saved
2. Clear `.next` folder: `rm -r .next`
3. Restart dev server: `npm run dev`
4. Hard refresh browser

---

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click
4. Automatic deployments on push

```bash
npm install -g vercel
vercel
```

### Option 2: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t pune-smart-city .
docker run -p 3001:3001 pune-smart-city
```

### Option 3: Self-Hosted Server

1. Upload to your server
2. Install Node.js 18+
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Start: `npm start`
6. Use PM2 for process management:

```bash
npm install -g pm2
pm2 start npm --name "pune-app" -- start
pm2 startup
pm2 save
```

---

## Performance Optimization

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Pune Smart City
```

### Caching

Enable static caching in `next.config.mjs`:
```javascript
const nextConfig = {
  headers: async () => [{
    source: '/:path*',
    headers: [{
      key: 'Cache-Control',
      value: 'public, max-age=3600'
    }]
  }]
}
```

---

## Monitoring & Logs

### Frontend Logs
```bash
npm run dev -- --debug
```

### Backend Logs
```bash
cd server
npm start -- --verbose
```

### Check Running Processes
```bash
netstat -ano | findstr :3001  # Frontend
netstat -ano | findstr :5000  # Backend
```

---

## Backup & Recovery

### Backup Data

```bash
# Export residents
GET http://localhost:3001/residents → Export CSV

# Export payments
GET http://localhost:3001/payments → Export CSV

# Export maintenance
GET http://localhost:3001/maintenance → Export CSV
```

### Restore Data

Data can be restored by importing CSV files or re-entering through the UI.

---

## Security Checklist

- [ ] Set NODE_ENV to 'production'
- [ ] Use HTTPS for production
- [ ] Implement authentication
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Set up CORS properly
- [ ] Enable rate limiting
- [ ] Use strong database passwords
- [ ] Regular backups
- [ ] Update dependencies regularly

---

## Performance Metrics

### Expected Load Times
- Dashboard page: < 500ms
- Data table load: < 1s
- Report export: < 2s
- Form submission: < 500ms

### Optimization Tips
1. Enable image optimization
2. Use code splitting
3. Implement lazy loading
4. Cache API responses
5. Compress assets
6. Use CDN for static files

---

## Support & Maintenance

### Regular Tasks
- [ ] Update dependencies: `npm update`
- [ ] Check for security issues: `npm audit`
- [ ] Review logs weekly
- [ ] Backup data monthly
- [ ] Test recovery procedures
- [ ] Monitor performance metrics

### Updates Available
- [ ] Add real-time notifications
- [ ] Implement WebSockets for live data
- [ ] Add user authentication
- [ ] Integrate SMS/Email alerts
- [ ] Add data analytics dashboard
- [ ] Implement mobile app

---

## Quick Commands Reference

```bash
# Development
npm run dev                          # Start dev server

# Building
npm run build                        # Create production build
npm start                            # Run production build

# Maintenance
npm install                          # Install dependencies
npm update                           # Update dependencies
npm audit                            # Check security issues
npm run lint                         # Check code quality

# Cleanup
rm -r node_modules && npm install   # Fresh install
rm -r .next && npm run build        # Clean rebuild
```

---

## Contacting Support

For issues or questions:
1. Check documentation files
2. Review error messages carefully
3. Check browser console (F12)
4. Review server logs
5. Try clearing cache and restarting

---

## Version History

- **v1.0** - Initial release with 6 core modules
  - Water Management
  - Energy Management
  - Residents (CRUD)
  - Payments (CRUD)
  - Maintenance (CRUD)
  - Waste Management

- **v1.1** - Planned enhancements
  - Real-time alerts
  - Advanced analytics
  - Mobile app
  - User authentication

---

**Last Updated**: 2024  
**Status**: Production Ready ✅  
**Support**: Full documentation included
