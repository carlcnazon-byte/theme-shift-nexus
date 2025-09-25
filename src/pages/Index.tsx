import { Building2, DollarSign, Users, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import { PropertyCard } from '@/components/PropertyCard';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  // Sample property data
  const properties = [
    {
      id: '1',
      name: 'Sunset Apartments',
      address: '123 Oak Street, Downtown',
      rent: 1850,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      status: 'occupied' as const,
      image: '',
    },
    {
      id: '2',
      name: 'Riverside Condos',
      address: '456 River Road, Midtown',
      rent: 2200,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1450,
      status: 'vacant' as const,
      image: '',
    },
    {
      id: '3',
      name: 'Garden View Townhouse',
      address: '789 Park Avenue, Uptown',
      rent: 2800,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 1800,
      status: 'maintenance' as const,
      image: '',
    },
    {
      id: '4',
      name: 'Metro Lofts',
      address: '321 Industrial Blvd, Arts District',
      rent: 1650,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 850,
      status: 'occupied' as const,
      image: '',
    },
  ];

  const stats = [
    {
      title: 'Total Properties',
      value: '24',
      icon: Building2,
      trend: { value: 12, isPositive: true },
      description: 'vs last month',
    },
    {
      title: 'Monthly Revenue',
      value: '$48,250',
      icon: DollarSign,
      trend: { value: 8, isPositive: true },
      description: 'vs last month',
    },
    {
      title: 'Occupancy Rate',
      value: '94%',
      icon: Users,
      trend: { value: 2, isPositive: true },
      description: 'vs last month',
    },
    {
      title: 'Portfolio Value',
      value: '$2.4M',
      icon: TrendingUp,
      trend: { value: 15, isPositive: true },
      description: 'vs last quarter',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your properties today.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Properties Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Properties</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search properties..." 
                className="pl-10 w-64 bg-background border-border focus:border-primary focus:ring-primary/20" 
              />
            </div>
            <Button variant="outline" className="border-border hover:bg-accent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
