import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Section, ContentBlock, NavigationItem, ContactMessage } from '../types/data';

export function useNavigationItems() {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('navigation_items')
          .select('*')
          .eq('is_visible', true)
          .order('order_number');

        if (error) throw error;
        setNavItems(data || []);
      } catch (err) {
        console.error('Error fetching navigation items:', err);
        setError('Failed to load navigation items');
      } finally {
        setLoading(false);
      }
    };

    fetchNavItems();
  }, []);

  return { navItems, loading, error };
}

export function useSections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('sections')
          .select('*')
          .eq('is_visible', true)
          .order('order_number');

        if (error) throw error;
        setSections(data || []);
      } catch (err) {
        console.error('Error fetching sections:', err);
        setError('Failed to load sections');
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, loading, error };
}

export function useContentBlocks(sectionId?: string) {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentBlocks = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('content_blocks')
          .select('*')
          .eq('is_visible', true)
          .order('order_number');
        
        if (sectionId) {
          query = query.eq('section_id', sectionId);
        }

        const { data, error } = await query;

        if (error) throw error;
        setContentBlocks(data || []);
      } catch (err) {
        console.error('Error fetching content blocks:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContentBlocks();
  }, [sectionId]);

  return { contentBlocks, loading, error };
}

export function useSectionWithContent(sectionName: string) {
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectionWithContent = async () => {
      try {
        setLoading(true);
        // First get the section
        const { data: sectionData, error: sectionError } = await supabase
          .from('sections')
          .select('*')
          .eq('name', sectionName)
          .eq('is_visible', true)
          .single();

        if (sectionError) throw sectionError;
        
        if (sectionData) {
          // Then get content blocks for this section
          const { data: contentData, error: contentError } = await supabase
            .from('content_blocks')
            .select('*')
            .eq('section_id', sectionData.id)
            .eq('is_visible', true)
            .order('order_number');

          if (contentError) throw contentError;
          
          setSection({ ...sectionData, contentBlocks: contentData || [] });
        } else {
          setSection(null);
        }
      } catch (err) {
        console.error(`Error fetching section ${sectionName}:`, err);
        setError(`Failed to load section ${sectionName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionWithContent();
  }, [sectionName]);

  return { section, loading, error };
}

export function useSubmitContactMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitMessage = async (message: ContactMessage) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const { error } = await supabase
        .from('contact_messages')
        .insert(message);

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting contact message:', err);
      setError('Failed to send message. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { submitMessage, loading, error, success };
}