# 🚀 Supabase Integration Setup Guide

## 📋 Prerequisites

1. **Install Supabase Package**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Environment Variables**
   - File `.env.local` is already created in the root directory
   - Contains your Supabase URL and Anon Key
   - ⚠️ **IMPORTANT**: Do NOT use the Service Role Secret key in frontend code

## 🗄️ Database Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `nbhogzxwqiqgxgdqofkj`
3. Navigate to **SQL Editor**
4. Open the file `supabase-setup.sql` in this project
5. Copy all SQL commands and paste into the SQL Editor
6. Click **Run** to execute
7. Verify tables in **Table Editor**:
   - `user_settings` - Stores wallpaper and theme preferences
   - `snake_scores` - Global leaderboard for Snake game

## ✨ Features Implemented

### 🔐 Feature A: Authentication System
- **Guest Mode**: Enter without saving data (local only)
- **Login Mode**: Sign in with email/password for cloud sync
- **Session Persistence**: Stays logged in after page refresh
- **Auto-sync**: Settings sync across all devices in real-time

**Files Modified:**
- `src/context/AuthContext.jsx` - Global auth state
- `src/components/LoginScreen.jsx` - Login UI with mode toggle
- `src/App.jsx` - Wrapped with AuthProvider

### ☁️ Feature B: Cloud Settings Sync
- **Real-time Wallpaper Sync**: Change wallpaper on phone → desktop updates instantly
- **Database Storage**: User preferences saved to `user_settings` table
- **Realtime Subscription**: Uses Supabase channels for live updates
- **Guest Protection**: Guest users don't sync to cloud

**Files Modified:**
- `src/context/OSContext.jsx` - Wallpaper sync logic
- `src/apps/Settings.jsx` - Already uses `setWallpaper` from context

### 🏆 Feature C: Global Leaderboard
- **Top 10 Scores**: Displays best players worldwide
- **Auto-submit**: Prompts for name if score qualifies
- **Real-time Updates**: Leaderboard refreshes after submission
- **Public Access**: Anyone can view and submit scores

**Files Modified:**
- `src/apps/SnakeGame.jsx` - Leaderboard UI and submission logic

## 🔧 Configuration Files

### Created Files:
1. `src/lib/supabase.js` - Supabase client initialization
2. `src/context/AuthContext.jsx` - Authentication context
3. `.env.local` - Environment variables
4. `supabase-setup.sql` - Database schema

### Modified Files:
1. `src/App.jsx` - Added AuthProvider
2. `src/components/LoginScreen.jsx` - Auth integration
3. `src/context/OSContext.jsx` - Cloud sync
4. `src/apps/SnakeGame.jsx` - Leaderboard

## 🎮 How to Use

### For Users:
1. **Guest Mode**: Type any password → Enter (no cloud sync)
2. **Login Mode**: Switch to "Login" tab → Enter email/password → Sign in
3. **Change Wallpaper**: Settings app → Wallpapers → Select (auto-syncs if logged in)
4. **Play Snake**: Beat high score → Enter name → Submit to global leaderboard

### For Developers:
```javascript
// Access auth state anywhere
import { useAuth } from './context/AuthContext';
const { user, signIn, signOut } = useAuth();

// Access Supabase client
import { supabase } from './lib/supabase';
const { data } = await supabase.from('table').select();
```

## 🔒 Security Notes

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Users can only access their own settings
- ✅ Anon Key is safe for frontend use
- ❌ Never expose Service Role Secret key
- ✅ Guest mode doesn't require authentication

## 🐛 Troubleshooting

**Issue**: "Invalid API key"
- Solution: Check `.env.local` has correct `VITE_SUPABASE_ANON_KEY`

**Issue**: "Table does not exist"
- Solution: Run `supabase-setup.sql` in Supabase SQL Editor

**Issue**: "Permission denied"
- Solution: Verify RLS policies are created correctly

**Issue**: Wallpaper not syncing
- Solution: Ensure realtime is enabled: `ALTER PUBLICATION supabase_realtime ADD TABLE user_settings;`

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Realtime Guide](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Project**: SultonovWeb OS  
**Developer**: Sultonov O'razali  
**Website**: sultonovweb.uz
