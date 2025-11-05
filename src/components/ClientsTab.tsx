import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Client } from '@/types/crm';

interface ClientsTabProps {
  clients: Client[];
  newClient: Partial<Client>;
  userRole: 'admin' | 'manager';
  onClientChange: (client: Partial<Client>) => void;
  onAddClient: () => void;
  onDeleteClient: (id: string) => void;
  onUpdateClient: (id: string, client: Client) => void;
}

const ClientsTab = ({ clients, newClient, userRole, onClientChange, onAddClient, onDeleteClient, onUpdateClient }: ClientsTabProps) => {
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState<string | null>(null);

  const handleEditClick = (client: Client) => {
    setEditingClient({ ...client });
    setIsEditDialogOpen(true);
  };

  const handleUpdateClick = () => {
    if (editingClient) {
      onUpdateClient(editingClient.id, editingClient);
      setIsEditDialogOpen(false);
      setEditingClient(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteClientId) {
      onDeleteClient(deleteClientId);
      setDeleteClientId(null);
    }
  };
  return (
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
                    onChange={(e) => onClientChange({...newClient, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Имя</Label>
                  <Input
                    value={newClient.firstName || ''}
                    onChange={(e) => onClientChange({...newClient, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Отчество</Label>
                  <Input
                    value={newClient.middleName || ''}
                    onChange={(e) => onClientChange({...newClient, middleName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Дата рождения</Label>
                <Input
                  type="date"
                  value={newClient.birthDate || ''}
                  onChange={(e) => onClientChange({...newClient, birthDate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Паспорт серия</Label>
                  <Input
                    value={newClient.passportSeries || ''}
                    onChange={(e) => onClientChange({...newClient, passportSeries: e.target.value})}
                    placeholder="4512"
                    maxLength={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Паспорт номер</Label>
                  <Input
                    value={newClient.passportNumber || ''}
                    onChange={(e) => onClientChange({...newClient, passportNumber: e.target.value})}
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
                    onChange={(e) => onClientChange({...newClient, licenseSeries: e.target.value})}
                    placeholder="77АА"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Водительские права номер</Label>
                  <Input
                    value={newClient.licenseNumber || ''}
                    onChange={(e) => onClientChange({...newClient, licenseNumber: e.target.value})}
                    placeholder="123456"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Дата выдачи прав</Label>
                <Input
                  type="date"
                  value={newClient.licenseDate || ''}
                  onChange={(e) => onClientChange({...newClient, licenseDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Номер телефона</Label>
                <Input
                  value={newClient.phone || ''}
                  onChange={(e) => onClientChange({...newClient, phone: e.target.value})}
                  placeholder="+79161234567"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={onAddClient}>Добавить клиента</Button>
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
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(client)}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteClientId(client.id)}
                        >
                          <Icon name="Trash2" size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
            <DialogDescription>Измените информацию о клиенте</DialogDescription>
          </DialogHeader>
          {editingClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Фамилия</Label>
                  <Input
                    value={editingClient.lastName}
                    onChange={(e) => setEditingClient({...editingClient, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Имя</Label>
                  <Input
                    value={editingClient.firstName}
                    onChange={(e) => setEditingClient({...editingClient, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Отчество</Label>
                  <Input
                    value={editingClient.middleName}
                    onChange={(e) => setEditingClient({...editingClient, middleName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Дата рождения</Label>
                <Input
                  type="date"
                  value={editingClient.birthDate}
                  onChange={(e) => setEditingClient({...editingClient, birthDate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Паспорт серия</Label>
                  <Input
                    value={editingClient.passportSeries}
                    onChange={(e) => setEditingClient({...editingClient, passportSeries: e.target.value})}
                    maxLength={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Паспорт номер</Label>
                  <Input
                    value={editingClient.passportNumber}
                    onChange={(e) => setEditingClient({...editingClient, passportNumber: e.target.value})}
                    maxLength={6}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Водительские права серия</Label>
                  <Input
                    value={editingClient.licenseSeries}
                    onChange={(e) => setEditingClient({...editingClient, licenseSeries: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Водительские права номер</Label>
                  <Input
                    value={editingClient.licenseNumber}
                    onChange={(e) => setEditingClient({...editingClient, licenseNumber: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Дата выдачи прав</Label>
                <Input
                  type="date"
                  value={editingClient.licenseDate}
                  onChange={(e) => setEditingClient({...editingClient, licenseDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Номер телефона</Label>
                <Input
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateClick}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteClientId} onOpenChange={() => setDeleteClientId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить клиента?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Клиент будет удалён из системы.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClientsTab;