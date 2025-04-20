export interface NavigationItem {
  id: string;
  name: string;
  url: string;
  order_number: number;
  is_visible: boolean;
}

export interface Section {
  id: string;
  name: string;
  title: string;
  subtitle: string | null;
  order_number: number;
  is_visible: boolean;
  contentBlocks?: ContentBlock[];
}

export interface ContentBlock {
  id: string;
  section_id: string;
  title: string | null;
  content: string;
  media_url: string | null;
  start_date: string | null;
  end_date: string | null;
  order_number: number;
  is_visible: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface Profile {
  id: string;
  email: string;
}