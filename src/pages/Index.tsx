import { Building2, DollarSign, Users, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
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
    <div className="min-h-screen bg-dashboard">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-panel/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-xl bg-accent-gradient flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">PropertyFlow</h1>
                <p className="text-sm text-text-secondary">Property Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button className="bg-accent-gradient hover:shadow-hover-glow transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* Properties Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Properties</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input 
                  placeholder="Search properties..." 
                  className="pl-10 w-64 bg-panel/80 border-border-subtle focus:border-accent focus:ring-accent/20" 
                />
              </div>
              <Button variant="outline" className="border-border-subtle hover:bg-accent/10">
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
        </section>
      </main>
    </div>
  );
};

export default Index;
