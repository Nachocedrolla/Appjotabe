import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (pin: string) => string | null;
  isLoading: boolean;
  error: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, isLoading, error }) => {
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || error) return;

    const role = onLogin(pin);
    if (!role) {
      setLoginError('Código de acceso incorrecto. Intente de nuevo.');
      setPin('');
    }
  };

  return (
    <div className="bg-sky-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <header className="text-center mb-8 p-6 bg-[#1e3a8a] text-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold">Distribuidora Jota Be</h1>
          <p className="text-lg mt-1 text-blue-200">Acceso al Checklist</p>
        </header>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/80">
          <h2 className="text-xl font-semibold text-center text-[#1e3a8a] mb-6">
            Ingresar Código de Acceso
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="pin" className="sr-only">Código PIN</label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (loginError) setLoginError('');
                }}
                placeholder="Ingrese su PIN"
                className="w-full p-3 text-center border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                required
              />
            </div>

            {isLoading && <p className="text-center text-gray-500">Verificando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {loginError && <p className="text-center text-red-500 text-sm mt-2">{loginError}</p>}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading || !!error}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
        
        <footer className="mt-10 text-center text-sm text-gray-500">
            <p>Desarrollado por Giovanni Servicios IA</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginScreen;
