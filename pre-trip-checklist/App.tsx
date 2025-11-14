
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import TextInput from './components/TextInput';
import DateTimeInput from './components/DateTimeInput';
import ChecklistSection from './components/ChecklistSection';
import EditableSelectInput from './components/EditableSelectInput';
import TextAreaInput from './components/TextAreaInput';
import LoginScreen from './components/LoginScreen'; // Import the new LoginScreen component

// URLs for Google Sheets provided by the user
const UNIDADES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTROf3uSKgOTiGU66iyY0_EhZFziw_QqrXTURSdTqsAV2dW1nHe70xSEPmHRYt3Vz0wlgFmZ7ldwNWj/pub?gid=1803304221&single=true&output=csv';
const CHOFERES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTROf3uSKgOTiGU66iyY0_EhZFziw_QqrXTURSdTqsAV2dW1nHe70xSEPmHRYt3Vz0wlgFmZ7ldwNWj/pub?gid=1632634501&single=true&output=csv';
const CHECKLIST_CONFIG_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTROf3uSKgOTiGU66iyY0_EhZFziw_QqrXTURSdTqsAV2dW1nHe70xSEPmHRYt3Vz0wlgFmZ7ldwNWj/pub?gid=1758709149&single=true&output=csv';

type ChecklistConfig = {
  [key: string]: {
    title: string;
    items: { id: string; label: string; type: string }[];
  };
};

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check session storage to keep user logged in during the session
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [authorizedPins, setAuthorizedPins] = useState<string[]>([]);

  const [units, setUnits] = useState<{value: string, label: string}[]>([]);
  const [unitsLoading, setUnitsLoading] = useState(true);
  const [unitsError, setUnitsError] = useState<string | null>(null);

  const [drivers, setDrivers] = useState<{value: string, label: string}[]>([]);
  const [driversLoading, setDriversLoading] = useState(true);
  const [driversError, setDriversError] = useState<string | null>(null);

  const [checklistConfig, setChecklistConfig] = useState<ChecklistConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);
  
  // FIX: Initialize formData with all its properties to prevent type errors on access.
  const [formData, setFormData] = useState({
    unit: '',
    mileage: '',
    driver: '',
    dateTime: '',
    workshopNotes: '',
    email: '',
  });
  const [checklistData, setChecklistData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchAndParseCsv = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Network response was not ok for ${url}`);
      let text = await response.text();
      // Remove BOM character if present
      if (text.charCodeAt(0) === 0xFEFF) text = text.substring(1);
      return text.split(/\r?\n/).filter(row => row.trim() !== '');
    };

    const fetchUnits = async () => {
      try {
        setUnitsLoading(true);
        setUnitsError(null);
        const rows = await fetchAndParseCsv(UNIDADES_CSV_URL);
        const options = rows.map(row => ({ value: row.trim(), label: row.trim() }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setUnits(options);
      } catch (error) {
        console.error('Error fetching units:', error);
        setUnitsError('No se pudieron cargar las unidades.');
      } finally {
        setUnitsLoading(false);
      }
    };

    const fetchDriversAndPins = async () => {
        try {
            setDriversLoading(true);
            setDriversError(null);
            const rows = await fetchAndParseCsv(CHOFERES_CSV_URL);
            
            // Assuming first row is header, skip it
            const dataRows = rows.slice(1);

            const driverOptions = dataRows.map(row => {
                const name = row.split(',')[0]?.trim();
                return { value: name, label: name };
            }).filter(d => d.value).sort((a, b) => a.label.localeCompare(b.label));
            
            const pins = dataRows.map(row => row.split(',')[1]?.trim()).filter(Boolean);

            setDrivers(driverOptions);
            setAuthorizedPins(pins as string[]);

        } catch (error) {
            console.error('Error fetching drivers and pins:', error);
            setDriversError('No se pudieron cargar los choferes.');
        } finally {
            setDriversLoading(false);
        }
    };
    
    // Call fetch functions
    fetchUnits();
    fetchDriversAndPins();
    // fetchChecklistConfig(); // This can be loaded after authentication
  }, []);
  
  // Load config only when authenticated
  useEffect(() => {
      if (isAuthenticated) {
          fetchChecklistConfig();
      }
  }, [isAuthenticated]);


  // --- AUTHENTICATION ---
  const handleLogin = (pin: string) => {
    if (authorizedPins.includes(pin)) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // --- FORM HANDLING ---
  // FIX: Implement form handlers to update state.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };
  const handleChecklistChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setChecklistData(prev => ({...prev, [name]: value}));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting Data:', { formData, checklistData });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Checklist enviado con éxito.');
    setIsSubmitting(false);
  };
  
  const fetchChecklistConfig = async () => {
    try {
      setConfigLoading(true);
      setConfigError(null);
      const response = await fetch(CHECKLIST_CONFIG_CSV_URL);
      if(!response.ok) throw new Error('Network response was not ok for config');
      
      let text = await response.text();
      if (text.charCodeAt(0) === 0xFEFF) text = text.substring(1);

      const rows = text.split(/\r?\n/).slice(1);
      const newConfig: ChecklistConfig = {};

      rows.forEach(row => {
        const [sectionId, sectionTitle, itemId, itemLabel, itemType] = row.split(',').map(s => s.trim());
        if (sectionId && sectionTitle && itemId && itemLabel) {
          if (!newConfig[sectionId]) {
            newConfig[sectionId] = { title: sectionTitle, items: [] };
          }
          let finalItemType = itemType || 'default';
          if (sectionId === 'unitCondition') {
            finalItemType = 'condition';
          }
          newConfig[sectionId].items.push({ id: itemId, label: itemLabel, type: finalItemType });
        }
      });
      
      setChecklistConfig(newConfig);
    } catch (error) {
      console.error('Error fetching checklist config:', error);
      setConfigError('No se pudo cargar la configuración del checklist.');
    } finally {
      setConfigLoading(false);
    }
  };


  // --- RENDERING LOGIC ---
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} isLoading={driversLoading} error={driversError} />;
  }
  
  const renderChecklistSections = () => {
    if (configLoading) {
      return <Card title="Cargando Configuración..."><p className="text-center text-gray-500">Por favor, espere.</p></Card>;
    }
    if (configError) {
      return <Card title="Error de Configuración"><p className="text-center text-red-500">{configError}</p></Card>;
    }
    if (checklistConfig) {
      return Object.keys(checklistConfig).map(sectionKey => {
        const section = checklistConfig[sectionKey];
        return (
          <ChecklistSection 
            key={sectionKey}
            title={section.title}
            items={section.items}
            checklistData={checklistData}
            onChecklistChange={handleChecklistChange}
          />
        );
      });
    }
    return null;
  };

  return (
    <div className="bg-sky-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 p-6 bg-[#1e3a8a] text-white rounded-xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold">Distribuidora Jota Be</h1>
          <p className="text-lg mt-1 text-blue-200">Check list pre viaje</p>
        </header>

        <form onSubmit={handleSubmit}>
          <Card title="Datos del Vehículo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditableSelectInput
                label="Unidad"
                id="unit"
                value={formData.unit}
                onChange={handleInputChange}
                options={units}
                placeholder={
                    unitsLoading ? "Cargando unidades..." : 
                    unitsError ? unitsError : "Seleccione o escriba una unidad..."
                }
                required
                disabled={unitsLoading || !!unitsError}
              />
              <TextInput
                label="Kilometraje Actual"
                id="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="Ej: 152340"
                type="number"
                required
              />
            </div>
          </Card>

          <Card title="Datos del Conductor">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditableSelectInput
                label="Conductor"
                id="driver"
                value={formData.driver}
                onChange={handleInputChange}
                options={drivers}
                placeholder={
                    driversLoading ? "Cargando choferes..." :
                    driversError ? driversError : "Seleccione o escriba un conductor..."
                }
                required
                disabled={driversLoading || !!driversError}
              />
              <DateTimeInput
                label="Fecha y Hora"
                id="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </Card>

          {renderChecklistSections()}
          
          <Card title="Novedades para el taller">
            <TextAreaInput
              label="Describa cualquier novedad o problema para el taller"
              id="workshopNotes"
              value={formData.workshopNotes}
              onChange={handleInputChange}
              placeholder="Ej: La puerta del conductor hace ruido al cerrar..."
            />
          </Card>
          
          <Card title="Correo Electrónico">
            <TextInput
              label="Dirección de Correo Electrónico"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="su-correo@ejemplo.com"
              type="email"
            />
          </Card>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Checklist'}
            </button>
          </div>
        </form>
        
        <footer className="mt-10 text-center p-4 bg-[#1e3a8a] text-white rounded-lg shadow-md">
          <p className="font-semibold">Desarrollado por Giovanni Servicios IA</p>
          <p className="text-sm text-blue-200 mt-1">C.E.O.: Juan Ignacio Cedrolla</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
