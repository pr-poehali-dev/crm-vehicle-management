import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface LoginFormProps {
  onLogin: (e: React.FormEvent) => void;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

const LoginForm = ({ onLogin, theme, onThemeChange }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
      >
        <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
      </Button>
      <Card className="w-full max-w-md shadow-2xl border-border">
        <CardHeader className="space-y-1">
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
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Введите пароль" required className="pr-10" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} className="text-muted-foreground" />
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">Войти в систему</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;