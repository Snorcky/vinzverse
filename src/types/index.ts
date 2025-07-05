export interface User {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
}

export interface MenuSection {
  id: string;
  title: string;
  slug: string;
  content: string;
  order_index: number;
  is_active: boolean;
  background_color: 'white' | 'black';
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  title: string;
  bio: string;
  profile_image_url?: string;
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  created_at: string;
  updated_at: string;
}