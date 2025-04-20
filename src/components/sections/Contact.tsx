import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubmitContactMessage } from '../../hooks/useData';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Send, Check, AlertCircle } from 'lucide-react';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});
  const { submitMessage, loading, error, success } = useSubmitContactMessage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormValues> = {};
    let isValid = true;

    if (!formValues.name.trim()) {
      errors.name = 'Le nom est requis';
      isValid = false;
    }

    if (!formValues.email.trim()) {
      errors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Format d\'email invalide';
      isValid = false;
    }

    if (!formValues.message.trim()) {
      errors.message = 'Le message est requis';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await submitMessage(formValues);
      
      if (success) {
        setFormValues({
          name: '',
          email: '',
          message: ''
        });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-4">
            Contact
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Envoyez-moi un message et je vous répondrai dès que possible.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg text-center"
            >
              <Check className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Message Envoyé!</h3>
              <p>Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
              <Button 
                variant="primary"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Envoyer un autre message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>{error}</div>
                </div>
              )}
              
              <motion.div variants={itemVariants}>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Nom"
                  placeholder="Votre nom"
                  value={formValues.name}
                  onChange={handleChange}
                  error={formErrors.name}
                  fullWidth
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="votre@email.com"
                  value={formValues.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  fullWidth
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="Votre message..."
                  rows={6}
                  value={formValues.message}
                  onChange={handleChange}
                  error={formErrors.message}
                  fullWidth
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex justify-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  className="min-w-[200px]"
                >
                  {!loading && <Send className="h-4 w-4 mr-2" />}
                  Envoyer le message
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};