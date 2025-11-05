import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LoginForm from '@/components/LoginForm';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import VehiclesTab from '@/components/VehiclesTab';
import ClientsTab from '@/components/ClientsTab';
import EmptyState from '@/components/EmptyState';
import { Vehicle, Client } from '@/types/crm';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'manager'>('manager');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      brand: 'Toyota',
      model: 'Camry',
      name: 'Toyota Camry 2023',
      category: 'Легковой',
      year: 2023,
      engineNumber: 'ABC123456',
      chassis: 'CHAS789012',
      bodyNumber: 'BODY345678',
      color: 'Черный',
      power: '249 (184)',
      displacement: '2487',
      engineType: 'Бензиновый',
      ecoClass: 'Евро-5',
      maxWeight: '2100'
    }
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      lastName: 'Иванов',
      firstName: 'Иван',
      middleName: 'Иванович',
      birthDate: '1985-05-15',
      passportSeries: '4512',
      passportNumber: '123456',
      licenseSeries: '77АА',
      licenseNumber: '123456',
      licenseDate: '2005-06-20',
      phone: '+79161234567'
    }
  ]);

  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({});
  const [newClient, setNewClient] = useState<Partial<Client>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleAddVehicle = () => {
    if (newVehicle.brand && newVehicle.model) {
      setVehicles([...vehicles, { ...newVehicle, id: Date.now().toString() } as Vehicle]);
      setNewVehicle({});
    }
  };

  const handleAddClient = () => {
    if (newClient.lastName && newClient.firstName) {
      setClients([...clients, { ...newClient, id: Date.now().toString() } as Client]);
      setNewClient({});
    }
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} onRoleChange={setUserRole} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar
          userRole={userRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={() => setIsLoggedIn(false)}
        />

        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <Dashboard vehiclesCount={vehicles.length} clientsCount={clients.length} />
          )}

          {activeTab === 'vehicles' && (
            <VehiclesTab
              vehicles={vehicles}
              newVehicle={newVehicle}
              userRole={userRole}
              onVehicleChange={setNewVehicle}
              onAddVehicle={handleAddVehicle}
              onDeleteVehicle={handleDeleteVehicle}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsTab
              clients={clients}
              newClient={newClient}
              userRole={userRole}
              onClientChange={setNewClient}
              onAddClient={handleAddClient}
              onDeleteClient={handleDeleteClient}
            />
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Договора</h2>
                <p className="text-muted-foreground">Управление договорами</p>
              </div>
              <EmptyState
                icon="FileText"
                title="Раздел в разработке"
                description="Функционал работы с договорами будет доступен в следующих версиях системы"
              />
            </div>
          )}

          {activeTab === 'users' && userRole === 'admin' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Пользователи</h2>
                  <p className="text-muted-foreground">Управление доступом к системе</p>
                </div>
                <Button className="gap-2">
                  <Icon name="Plus" size={18} />
                  Добавить пользователя
                </Button>
              </div>
              <EmptyState
                icon="Users"
                title="Раздел в разработке"
                description="Управление пользователями будет доступно в следующих версиях системы"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;