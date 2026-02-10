-- ============================================
-- SUPABASE DATABASE SETUP FOR SULTONOVOS
-- ============================================

-- Table 1: User Settings (Cloud Sync)
-- Stores user preferences like wallpaper and theme
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  wallpaper TEXT DEFAULT '/backgrounds/background_image_1.png',
  theme TEXT DEFAULT 'dark',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read/write their own settings
CREATE POLICY "Users can manage their own settings"
  ON user_settings
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================

-- Table 2: Snake Game Leaderboard
-- Stores global high scores
CREATE TABLE snake_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE snake_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read scores
CREATE POLICY "Anyone can view leaderboard"
  ON snake_scores
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert scores
CREATE POLICY "Anyone can submit scores"
  ON snake_scores
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_snake_scores_score ON snake_scores(score DESC);

-- ============================================
-- REALTIME SETUP
-- ============================================

-- Enable realtime for user_settings table
ALTER PUBLICATION supabase_realtime ADD TABLE user_settings;

-- ============================================
-- INSTRUCTIONS
-- ============================================

/*
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: sedtiraxblfkrxswlege
3. Navigate to SQL Editor
4. Copy and paste this entire file
5. Click "Run" to execute all commands
6. Verify tables are created in the Table Editor

IMPORTANT NOTES:
- Do NOT use the Service Role Secret key in your frontend code
- Only use the Anon Key (already configured in .env.local)
- Row Level Security (RLS) is enabled for data protection
- Realtime is enabled for instant wallpaper sync across devices
*/
