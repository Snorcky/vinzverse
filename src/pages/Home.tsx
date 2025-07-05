import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import SkillsSection from '../components/sections/SkillsSection';
import HobbiesSection from '../components/sections/HobbiesSection';
import ContactSection from '../components/sections/ContactSection';
import { supabase } from '../lib/supabase';
import { MenuSection } from '../types';

const Home: React.FC = () => {
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_sections')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
      // Fallback to default sections
      setSections([
        { id: '1', title: 'Mes expériences', slug: 'mes-experiences', content: '', order_index: 1, is_active: true, background_color: 'white', created_at: '', updated_at: '' },
        { id: '2', title: 'Mes formations', slug: 'mes-formations', content: '', order_index: 2, is_active: true, background_color: 'black', created_at: '', updated_at: '' },
        { id: '3', title: 'Mes compétences', slug: 'mes-competences', content: '', order_index: 3, is_active: true, background_color: 'white', created_at: '', updated_at: '' },
        { id: '4', title: 'Mes hobbies', slug: 'mes-hobbies', content: '', order_index: 4, is_active: true, background_color: 'black', created_at: '', updated_at: '' },
        { id: '5', title: 'Contact', slug: 'contact', content: '', order_index: 5, is_active: true, background_color: 'white', created_at: '', updated_at: '' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (section: MenuSection) => {
    switch (section.slug) {
      case 'mes-experiences':
        return <ExperienceSection key={section.id} />;
      case 'mes-formations':
        return <EducationSection key={section.id} />;
      case 'mes-competences':
        return <SkillsSection key={section.id} />;
      case 'mes-hobbies':
        return <HobbiesSection key={section.id} />;
      case 'contact':
        return <ContactSection key={section.id} />;
      default:
        return (
          <section
            key={section.id}
            id={section.slug}
            className={`py-20 ${section.background_color === 'black' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
              </div>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          </section>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header sections={sections} />
      <HeroSection />
      {sections.map(renderSection)}
      <Footer />
    </div>
  );
};

export default Home;