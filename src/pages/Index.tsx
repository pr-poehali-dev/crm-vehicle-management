import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  name: string;
  category: string;
  year: number;
  engineNumber: string;
  chassis: string;
  bodyNumber: string;
  color: string;
  power: string;
  displacement: string;
  engineType: string;
  ecoClass: string;
  maxWeight: string;
}

interface Client {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
  licenseSeries: string;
  licenseNumber: string;
  licenseDate: string;
  phone: string;
}

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

  const statsData = [
    { name: 'Автомобили', value: vehicles.length },
    { name: 'Клиенты', value: clients.length },
    { name: 'Договора', value: 0 }
  ];

  const vehiclesByYear = [
    { year: '2020', count: 2 },
    { year: '2021', count: 5 },
    { year: '2022', count: 8 },
    { year: '2023', count: 12 }
  ];

  const categoryData = [
    { name: 'Легковой', value: 15, color: '#8B5CF6' },
    { name: 'Грузовой', value: 8, color: '#0EA5E9' },
    { name: 'Специальный', value: 4, color: '#F97316' }
  ];

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Icon name="Car" size={40} className="text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl text-center font-bold">CRM Автопарк</CardTitle>
            <CardDescription className="text-center">Войдите для доступа к системе</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Логин</Label>
                <Input id="login" placeholder="Введите логин" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" placeholder="Введите пароль" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Роль</Label>
                <Select onValueChange={(value) => setUserRole(value as 'admin' | 'manager')} defaultValue="manager">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Главный администратор</SelectItem>
                    <SelectItem value="manager">Менеджер</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Войти в систему</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sidebar-primary rounded-lg">
                <Icon name="Car" size={24} className="text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CRM Автопарк</h1>
                <Badge variant="outline" className="mt-1 text-xs border-sidebar-accent text-sidebar-foreground">
                  {userRole === 'admin' ? 'Администратор' : 'Менеджер'}
                </Badge>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon name="LayoutDashboard" size={20} />
              <span className="font-medium">Дашборд</span>
            </button>
            
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'vehicles' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon name="Car" size={20} />
              <span className="font-medium">Автомобили</span>
            </button>
            
            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'clients' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon name="Users" size={20} />
              <span className="font-medium">Клиенты</span>
            </button>
            
            <button
              onClick={() => setActiveTab('contracts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'contracts' 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon name="FileText" size={20} />
              <span className="font-medium">Договора</span>
            </button>

            {userRole === 'admin' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'users' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon name="Settings" size={20} />
                <span className="font-medium">Пользователи</span>
              </button>
            )}
          </nav>

          <div className="absolute bottom-6 left-4 right-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsLoggedIn(false)}
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Аналитика</h2>
                <p className="text-muted-foreground">Обзор ключевых показателей системы</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Всего автомобилей</CardTitle>
                    <Icon name="Car" className="text-primary" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{vehicles.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">В активном управлении</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Всего клиентов</CardTitle>
                    <Icon name="Users" className="text-blue-600" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{clients.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">Зарегистрировано в системе</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Активные договора</CardTitle>
                    <Icon name="FileText" className="text-orange-600" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground mt-1">На текущий момент</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Динамика поступления автомобилей</CardTitle>
                    <CardDescription>По годам выпуска</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={vehiclesByYear}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Распределение по категориям</CardTitle>
                    <CardDescription>Типы транспортных средств</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => entry.name}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Автомобили</h2>
                  <p className="text-muted-foreground">Управление парком транспортных средств</p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Icon name="Plus" size={18} />
                      Добавить автомобиль
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Новый автомобиль</DialogTitle>
                      <DialogDescription>Заполните информацию о транспортном средстве</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Марка ТС</Label>
                          <Input
                            value={newVehicle.brand || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, brand: e.target.value})}
                            placeholder="Toyota"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Модель ТС</Label>
                          <Input
                            value={newVehicle.model || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                            placeholder="Camry"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Наименование ТС</Label>
                        <Input
                          value={newVehicle.name || ''}
                          onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                          placeholder="Toyota Camry 2023"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Категория ТС</Label>
                          <Select onValueChange={(value) => setNewVehicle({...newVehicle, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Легковой">Легковой</SelectItem>
                              <SelectItem value="Грузовой">Грузовой</SelectItem>
                              <SelectItem value="Специальный">Специальный</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Год выпуска</Label>
                          <Input
                            type="number"
                            value={newVehicle.year || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, year: parseInt(e.target.value)})}
                            placeholder="2023"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>№ Двигателя</Label>
                          <Input
                            value={newVehicle.engineNumber || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, engineNumber: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Шасси (Рама) №</Label>
                          <Input
                            value={newVehicle.chassis || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, chassis: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Кузов №</Label>
                          <Input
                            value={newVehicle.bodyNumber || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, bodyNumber: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Цвет кузова</Label>
                          <Input
                            value={newVehicle.color || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Мощность, л.с. (кВт)</Label>
                          <Input
                            value={newVehicle.power || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, power: e.target.value})}
                            placeholder="249 (184)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Объем двигателя, куб.см</Label>
                          <Input
                            value={newVehicle.displacement || ''}
                            onChange={(e) => setNewVehicle({...newVehicle, displacement: e.target.value})}
                            placeholder="2487"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Тип двигателя</Label>
                          <Select onValueChange={(value) => setNewVehicle({...newVehicle, engineType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Бензиновый">Бензиновый</SelectItem>
                              <SelectItem value="Дизельный">Дизельный</SelectItem>
                              <SelectItem value="Электрический">Электрический</SelectItem>
                              <SelectItem value="Гибридный">Гибридный</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Экологический класс</Label>
                          <Select onValueChange={(value) => setNewVehicle({...newVehicle, ecoClass: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите класс" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Евро-3">Евро-3</SelectItem>
                              <SelectItem value="Евро-4">Евро-4</SelectItem>
                              <SelectItem value="Евро-5">Евро-5</SelectItem>
                              <SelectItem value="Евро-6">Евро-6</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Технически допустимая макс. масса, кг</Label>
                        <Input
                          value={newVehicle.maxWeight || ''}
                          onChange={(e) => setNewVehicle({...newVehicle, maxWeight: e.target.value})}
                          placeholder="2100"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddVehicle}>Добавить автомобиль</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Марка</TableHead>
                        <TableHead>Модель</TableHead>
                        <TableHead>Год</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Цвет</TableHead>
                        <TableHead>Тип двигателя</TableHead>
                        {userRole === 'admin' && <TableHead>Действия</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">{vehicle.brand}</TableCell>
                          <TableCell>{vehicle.model}</TableCell>
                          <TableCell>{vehicle.year}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{vehicle.category}</Badge>
                          </TableCell>
                          <TableCell>{vehicle.color}</TableCell>
                          <TableCell>{vehicle.engineType}</TableCell>
                          {userRole === 'admin' && (
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                              >
                                <Icon name="Trash2" size={16} className="text-destructive" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Клиенты</h2>
                  <p className="text-muted-foreground">База данных клиентов</p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Icon name="Plus" size={18} />
                      Добавить клиента
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Новый клиент</DialogTitle>
                      <DialogDescription>Заполните информацию о клиенте</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Фамилия</Label>
                          <Input
                            value={newClient.lastName || ''}
                            onChange={(e) => setNewClient({...newClient, lastName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Имя</Label>
                          <Input
                            value={newClient.firstName || ''}
                            onChange={(e) => setNewClient({...newClient, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Отчество</Label>
                          <Input
                            value={newClient.middleName || ''}
                            onChange={(e) => setNewClient({...newClient, middleName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Дата рождения</Label>
                        <Input
                          type="date"
                          value={newClient.birthDate || ''}
                          onChange={(e) => setNewClient({...newClient, birthDate: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Паспорт серия</Label>
                          <Input
                            value={newClient.passportSeries || ''}
                            onChange={(e) => setNewClient({...newClient, passportSeries: e.target.value})}
                            placeholder="4512"
                            maxLength={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Паспорт номер</Label>
                          <Input
                            value={newClient.passportNumber || ''}
                            onChange={(e) => setNewClient({...newClient, passportNumber: e.target.value})}
                            placeholder="123456"
                            maxLength={6}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Водительские права серия</Label>
                          <Input
                            value={newClient.licenseSeries || ''}
                            onChange={(e) => setNewClient({...newClient, licenseSeries: e.target.value})}
                            placeholder="77АА"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Водительские права номер</Label>
                          <Input
                            value={newClient.licenseNumber || ''}
                            onChange={(e) => setNewClient({...newClient, licenseNumber: e.target.value})}
                            placeholder="123456"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Дата выдачи прав</Label>
                        <Input
                          type="date"
                          value={newClient.licenseDate || ''}
                          onChange={(e) => setNewClient({...newClient, licenseDate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Номер телефона</Label>
                        <Input
                          value={newClient.phone || ''}
                          onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                          placeholder="+79161234567"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddClient}>Добавить клиента</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Дата рождения</TableHead>
                        <TableHead>Паспорт</TableHead>
                        <TableHead>Вод. удостоверение</TableHead>
                        <TableHead>Телефон</TableHead>
                        {userRole === 'admin' && <TableHead>Действия</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">
                            {client.lastName} {client.firstName} {client.middleName}
                          </TableCell>
                          <TableCell>{new Date(client.birthDate).toLocaleDateString('ru-RU')}</TableCell>
                          <TableCell>{client.passportSeries} {client.passportNumber}</TableCell>
                          <TableCell>{client.licenseSeries} {client.licenseNumber}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          {userRole === 'admin' && (
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClient(client.id)}
                              >
                                <Icon name="Trash2" size={16} className="text-destructive" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Договора</h2>
                <p className="text-muted-foreground">Управление договорами</p>
              </div>
              <Card className="p-12">
                <div className="text-center space-y-4">
                  <Icon name="FileText" size={64} className="mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Раздел в разработке</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Функционал работы с договорами будет доступен в следующих версиях системы
                  </p>
                </div>
              </Card>
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
              <Card className="p-12">
                <div className="text-center space-y-4">
                  <Icon name="Users" size={64} className="mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Раздел в разработке</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Управление пользователями будет доступно в следующих версиях системы
                  </p>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
