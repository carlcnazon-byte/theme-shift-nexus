import { MapPin, DollarSign, Bed, Bath, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    rent: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    status: 'occupied' | 'vacant' | 'maintenance';
    image: string;
  };
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const statusColors = {
    occupied: 'bg-success/20 text-success border-success/30',
    vacant: 'bg-warning/20 text-warning border-warning/30',
    maintenance: 'bg-destructive/20 text-destructive border-destructive/30',
  };

  return (
    <Card className="group bg-panel/80 backdrop-blur-panel border-border-subtle hover:shadow-panel hover:shadow-hover-glow/20 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
            {property.name}
          </CardTitle>
          <Badge className={`${statusColors[property.status]} font-medium`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center text-text-secondary text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {property.address}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-accent font-bold text-xl">
            <DollarSign className="h-5 w-5" />
            {property.rent.toLocaleString()}
            <span className="text-text-secondary font-normal text-sm ml-1">/month</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-text-secondary text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {property.bedrooms} bed
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {property.bathrooms} bath
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            {property.sqft.toLocaleString()} sqft
          </div>
        </div>
      </CardContent>
    </Card>
  );
};