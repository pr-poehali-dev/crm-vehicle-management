import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Employee } from '@/types/crm';

interface EmployeesTableProps {
  employees: Employee[];
  onEditClick: (employee: Employee) => void;
  onDeleteClick: (id: string) => void;
}

const EmployeesTable = ({ employees, onEditClick, onDeleteClick }: EmployeesTableProps) => {
  return (
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
              <TableHead className="text-right">Действия</TableHead>
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
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditClick(employee)}
                    >
                      <Icon name="Pencil" size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteClick(employee.id)}
                    >
                      <Icon name="Trash2" size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeesTable;
