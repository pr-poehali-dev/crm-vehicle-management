import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Employee } from '@/types/crm';

interface EmployeesTabProps {
  employees: Employee[];
  newEmployee: Partial<Employee>;
  userRole: 'admin' | 'manager';
  onEmployeeChange: (employee: Partial<Employee>) => void;
  onAddEmployee: () => void;
  onDeleteEmployee: (id: string) => void;
}

const EmployeesTab = ({ 
  employees, 
  newEmployee, 
  userRole, 
  onEmployeeChange, 
  onAddEmployee, 
  onDeleteEmployee 
}: EmployeesTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Сотрудники</h2>
          <p className="text-muted-foreground">Управление учётными записями сотрудников</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Добавить сотрудника
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Новый сотрудник</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={newEmployee.lastName || ''}
                    onChange={(e) => onEmployeeChange({ ...newEmployee, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={newEmployee.firstName || ''}
                    onChange={(e) => onEmployeeChange({ ...newEmployee, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Отчество</Label>
                  <Input
                    id="middleName"
                    value={newEmployee.middleName || ''}
                    onChange={(e) => onEmployeeChange({ ...newEmployee, middleName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Дата рождения</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={newEmployee.birthDate || ''}
                    onChange={(e) => onEmployeeChange({ ...newEmployee, birthDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Должность</Label>
                  <Input
                    id="position"
                    value={newEmployee.position || ''}
                    onChange={(e) => onEmployeeChange({ ...newEmployee, position: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={onAddEmployee} className="w-full">
                Добавить сотрудника
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список сотрудников</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Дата рождения</TableHead>
                <TableHead>Должность</TableHead>
                {userRole === 'admin' && <TableHead className="text-right">Действия</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.lastName} {employee.firstName} {employee.middleName}
                  </TableCell>
                  <TableCell>{new Date(employee.birthDate).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  {userRole === 'admin' && (
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteEmployee(employee.id)}
                      >
                        <Icon name="Trash2" size={18} />
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
  );
};

export default EmployeesTab;
