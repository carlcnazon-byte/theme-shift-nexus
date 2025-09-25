import React from 'react';
import { CreditCard, Receipt, Download, AlertCircle, Crown, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

export const BillingSettings: React.FC = () => {
  const currentPlan = {
    name: 'Professional',
    price: 49,
    period: 'month',
    features: [
      'Up to 50 users',
      'Unlimited tickets',
      'Advanced reporting',
      'API access',
      'Priority support',
    ],
  };

  const usage = {
    users: { current: 24, limit: 50 },
    tickets: { current: 1847, limit: null },
    apiCalls: { current: 8523, limit: 10000 },
  };

  const recentInvoices = [
    {
      id: 'INV-001',
      date: '2024-01-01',
      amount: 49.00,
      status: 'paid',
    },
    {
      id: 'INV-002',
      date: '2023-12-01',
      amount: 49.00,
      status: 'paid',
    },
    {
      id: 'INV-003',
      date: '2023-11-01',
      amount: 49.00,
      status: 'paid',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{currentPlan.name}</h3>
              <p className="text-muted-foreground">
                ${currentPlan.price}/{currentPlan.period}
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-300">Active</Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Features included:</h4>
            <ul className="space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              Change Plan
            </Button>
            <Button variant="outline">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage & Limits */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Usage & Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Users */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Active Users</Label>
              <span className="text-sm text-muted-foreground">
                {usage.users.current} / {usage.users.limit}
              </span>
            </div>
            <Progress 
              value={(usage.users.current / usage.users.limit) * 100} 
              className="h-2"
            />
          </div>

          {/* Tickets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Tickets This Month</Label>
              <span className="text-sm text-muted-foreground">
                {usage.tickets.current} / Unlimited
              </span>
            </div>
            <div className="h-2 bg-accent rounded-full">
              <div className="h-full bg-primary rounded-full w-1/4" />
            </div>
          </div>

          {/* API Calls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">API Calls This Month</Label>
              <span className="text-sm text-muted-foreground">
                {usage.apiCalls.current} / {usage.apiCalls.limit}
              </span>
            </div>
            <Progress 
              value={(usage.apiCalls.current / usage.apiCalls.limit) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">****</span>
              </div>
              <div>
                <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Payment Method Expiring Soon
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Your payment method expires in 2 months. Update it to avoid service interruption.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">
                    ${invoice.amount.toFixed(2)}
                  </span>
                  <Badge className="bg-green-500/20 text-green-300">
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            View All Invoices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};