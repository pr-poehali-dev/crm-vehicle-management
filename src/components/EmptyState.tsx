import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <Card className="p-12">
      <div className="text-center space-y-4">
        <Icon name={icon} size={64} className="mx-auto text-muted-foreground" />
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default EmptyState;
