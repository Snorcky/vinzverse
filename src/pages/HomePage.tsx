import React from 'react';
import { Header } from '../components/navigation/Header';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Education } from '../components/sections/Education';
import { Skills } from '../components/sections/Skills';
import { Hobbies } from '../components/sections/Hobbies';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Hobbies />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};