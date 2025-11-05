import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LoginForm from '@/components/LoginForm';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import VehiclesTab from '@/components/VehiclesTab';
import ClientsTab from '@/components/ClientsTab';
import EmployeesTab from '@/components/EmployeesTab';
import EmptyState from '@/components/EmptyState';
import { Vehicle, Client, Employee } from '@/types/crm';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'manager'>('manager');
  const [userName, setUserName] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('crm-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('crm-theme', theme);
  }, [theme]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({});
  const [newClient, setNewClient] = useState<Partial<Client>>({});
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});

  useEffect(() => {
    if (isLoggedIn) {
      loadVehicles();
      loadClients();
      loadEmployees();
    }
  }, [isLoggedIn]);

  const loadVehicles = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/33390ee1-85e0-4e3a-a705-e76898997167');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  };

  const loadClients = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/38905dcd-16a6-4e12-a777-273ac686d65d');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/0e9c4f82-7ee1-4be0-9001-c56162996ffa');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.querySelector('#login') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    try {
      const response = await fetch('https://functions.poehali.dev/d7de3fd7-3f9a-414d-a3bc-3702fff6a405', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userData = await response.json();
        setUserRole(userData.role);
        setUserName(userData.full_name);
        setUserPosition(userData.role === 'admin' ? 'Администратор' : 'Менеджер');
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleAddVehicle = async () => {
    if (newVehicle.brand && newVehicle.model) {
      try {
        const response = await fetch('https://functions.poehali.dev/33390ee1-85e0-4e3a-a705-e76898997167', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newVehicle)
        });
        if (response.ok) {
          await loadVehicles();
          setNewVehicle({});
        }
      } catch (error) {
        console.error('Error adding vehicle:', error);
      }
    }
  };

  const handleAddClient = async () => {
    if (newClient.lastName && newClient.firstName) {
      try {
        const response = await fetch('https://functions.poehali.dev/38905dcd-16a6-4e12-a777-273ac686d65d', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newClient)
        });
        if (response.ok) {
          await loadClients();
          setNewClient({});
        }
      } catch (error) {
        console.error('Error adding client:', error);
      }
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/33390ee1-85e0-4e3a-a705-e76898997167?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await loadVehicles();
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleUpdateVehicle = async (id: string, updatedVehicle: Vehicle) => {
    try {
      const response = await fetch('https://functions.poehali.dev/33390ee1-85e0-4e3a-a705-e76898997167', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVehicle)
      });
      if (response.ok) {
        await loadVehicles();
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/38905dcd-16a6-4e12-a777-273ac686d65d?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await loadClients();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleUpdateClient = async (id: string, updatedClient: Client) => {
    try {
      const response = await fetch('https://functions.poehali.dev/38905dcd-16a6-4e12-a777-273ac686d65d', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedClient)
      });
      if (response.ok) {
        await loadClients();
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleAddEmployee = async () => {
    if (newEmployee.lastName && newEmployee.firstName) {
      try {
        const response = await fetch('https://functions.poehali.dev/0e9c4f82-7ee1-4be0-9001-c56162996ffa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEmployee)
        });
        if (response.ok) {
          await loadEmployees();
          setNewEmployee({});
        }
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/0e9c4f82-7ee1-4be0-9001-c56162996ffa?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await loadEmployees();
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdateEmployee = async (id: string, updatedEmployee: Employee) => {
    try {
      const response = await fetch('https://functions.poehali.dev/0e9c4f82-7ee1-4be0-9001-c56162996ffa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee)
      });
      if (response.ok) {
        await loadEmployees();
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} theme={theme} onThemeChange={setTheme} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar
          userRole={userRole}
          userName={userName}
          userPosition={userPosition}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={() => setIsLoggedIn(false)}
          theme={theme}
          onThemeChange={setTheme}
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
              onUpdateVehicle={handleUpdateVehicle}
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
              onUpdateClient={handleUpdateClient}
            />
          )}

          {activeTab === 'employees' && (
            <EmployeesTab
              employees={employees}
              newEmployee={newEmployee}
              userRole={userRole}
              onEmployeeChange={setNewEmployee}
              onAddEmployee={handleAddEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              onUpdateEmployee={handleUpdateEmployee}
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