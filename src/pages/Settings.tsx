import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { UserManagement } from '@/components/settings/UserManagement';
import { IntegrationSettings } from '@/components/settings/IntegrationSettings';
import { BillingSettings } from '@/components/settings/BillingSettings';

export interface Settings {
  general: {
    companyName: string;
    timeZone: string;
    language: 'en' | 'fr';
    theme: 'dark' | 'light' | 'system';
    workingHours: {
      start: string;
      end: string;
      days: string[];
    };
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    quietHours: { start: string; end: string };
    escalation: {
      enabled: boolean;
      threshold: number;
      recipients: string[];
    };
  };
  integrations: {
    apiKeys: { [key: string]: string };
    webhooks: { [key: string]: string };
    connections: { [key: string]: boolean };
  };
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<Settings>({
    general: {
      companyName: 'Demo PM Co',
      timeZone: 'America/New_York',
      language: 'en',
      theme: 'dark',
      workingHours: {
        start: '09:00',
        end: '18:00',
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      },
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
      quietHours: { start: '22:00', end: '08:00' },
      escalation: {
        enabled: true,
        threshold: 60,
        recipients: ['manager@company.com'],
      },
    },
    integrations: {
      apiKeys: {},
      webhooks: {},
      connections: {
        slack: false,
        teams: false,
        zapier: true,
      },
    },
  });

  const handleSettingsChange = (section: keyof Settings, newSettings: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newSettings }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings 
            settings={settings.general}
            onSettingsChange={(newSettings) => handleSettingsChange('general', newSettings)}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings 
            settings={settings.notifications}
            onSettingsChange={(newSettings) => handleSettingsChange('notifications', newSettings)}
          />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings 
            settings={settings.integrations}
            onSettingsChange={(newSettings) => handleSettingsChange('integrations', newSettings)}
          />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;