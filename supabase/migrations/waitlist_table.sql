-- Create waitlist entries table
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  unique_edge TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_entries_email_idx ON waitlist_entries (email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS waitlist_entries_status_idx ON waitlist_entries (status);

-- Add RLS (Row Level Security) policies
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to see all entries
CREATE POLICY "Admins can see all waitlist entries" 
ON waitlist_entries FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create policy for admins to insert entries
CREATE POLICY "Admins can insert waitlist entries" 
ON waitlist_entries FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create policy for admins to update entries
CREATE POLICY "Admins can update waitlist entries" 
ON waitlist_entries FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER update_waitlist_entries_updated_at
BEFORE UPDATE ON waitlist_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

