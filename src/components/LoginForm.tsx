import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface LoginFormProps {
  onLogin: (e: React.FormEvent) => void;
  onRoleChange: (role: 'admin' | 'manager') => void;
}

const LoginForm = ({ onLogin, onRoleChange }: LoginFormProps) => {
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
          <form onSubmit={onLogin} className="space-y-4">
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
              <Select onValueChange={(value) => onRoleChange(value as 'admin' | 'manager')} defaultValue="manager">
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
};

export default LoginForm;
