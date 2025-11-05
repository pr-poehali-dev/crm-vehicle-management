import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  vehiclesCount: number;
  clientsCount: number;
}

const Dashboard = ({ vehiclesCount, clientsCount }: DashboardProps) => {
  const vehiclesByYear = [
    { year: '2020', count: 2 },
    { year: '2021', count: 5 },
    { year: '2022', count: 8 },
    { year: '2023', count: 12 }
  ];

  const categoryData = [
    { name: 'Легковой', value: 15, color: '#FBBF24' },
    { name: 'Грузовой', value: 8, color: '#F59E0B' },
    { name: 'Специальный', value: 4, color: '#D97706' }
  ];

  return (
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
            <div className="text-3xl font-bold">{vehiclesCount}</div>
            <p className="text-xs text-muted-foreground mt-1">В активном управлении</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего клиентов</CardTitle>
            <Icon name="Users" className="text-primary" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{clientsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Зарегистрировано в системе</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные договора</CardTitle>
            <Icon name="FileText" className="text-primary" size={20} />
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
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#FBBF24" radius={[8, 8, 0, 0]} />
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
  );
};

export default Dashboard;