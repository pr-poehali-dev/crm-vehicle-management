import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DashboardProps {
  vehiclesCount: number;
  clientsCount: number;
}

const Dashboard = ({ vehiclesCount, clientsCount }: DashboardProps) => {
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
    </div>
  );
};

export default Dashboard;