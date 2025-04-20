import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { LockKeyhole } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    try {
      const { error } = await login(email, password);
      
      if (error) {
        setErrorMessage(error);
      } else {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Connexion Admin</CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                id="email"
                type="email"
                label="Adresse Email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </div>
            
            <div>
              <Input
                id="password"
                type="password"
                label="Mot de passe"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
            
            <Button type="submit" variant="primary" fullWidth>
              Se Connecter
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <a href="/" className="text-blue-600 hover:text-blue-800">
              Retour au site
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};