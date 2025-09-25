import React, { useState } from 'react';
import { Link, Key, Webhook, Zap, CheckCircle, XCircle, TestTube, Copy, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface IntegrationSettingsProps {
  settings: {
    apiKeys: { [key: string]: string };
    webhooks: { [key: string]: string };
    connections: { [key: string]: boolean };
  };
  onSettingsChange: (settings: any) => void;
}

export const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({ settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({});

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send notifications to Slack channels',
      icon: '💬',
      requiresKey: true,
      keyPlaceholder: 'xoxb-your-slack-bot-token',
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Post updates to Teams channels',
      icon: '👥',
      requiresKey: true,
      keyPlaceholder: 'webhook-url-from-teams',
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows with 5000+ apps',
      icon: '⚡',
      requiresKey: false,
    },
  ];

  const webhookEndpoints = [
    {
      id: 'ticket_created',
      name: 'Ticket Created',
      description: 'Triggered when a new ticket is created',
    },
    {
      id: 'ticket_updated',
      name: 'Ticket Updated',
      description: 'Triggered when a ticket status changes',
    },
    {
      id: 'vendor_assigned',
      name: 'Vendor Assigned',
      description: 'Triggered when a vendor is assigned to a ticket',
    },
  ];

  const handleApiKeyChange = (integrationId: string, value: string) => {
    const newApiKeys = { ...localSettings.apiKeys, [integrationId]: value };
    const newSettings = { ...localSettings, apiKeys: newApiKeys };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleWebhookChange = (webhookId: string, value: string) => {
    const newWebhooks = { ...localSettings.webhooks, [webhookId]: value };
    const newSettings = { ...localSettings, webhooks: newWebhooks };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleConnectionToggle = (integrationId: string, enabled: boolean) => {
    const newConnections = { ...localSettings.connections, [integrationId]: enabled };
    const newSettings = { ...localSettings, connections: newConnections };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const toggleKeyVisibility = (integrationId: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [integrationId]: !prev[integrationId]
    }));
  };

  const testConnection = (integrationId: string) => {
    // In a real app, this would test the connection
    console.log(`Testing connection for ${integrationId}`);
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* API Keys */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys & Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {integrations.map((integration) => (
            <div key={integration.id} className="space-y-4 p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h4 className="font-medium text-foreground">{integration.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={localSettings.connections[integration.id] 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                    }
                  >
                    {localSettings.connections[integration.id] ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                  <Switch
                    checked={localSettings.connections[integration.id] || false}
                    onCheckedChange={(checked) => handleConnectionToggle(integration.id, checked)}
                  />
                </div>
              </div>

              {integration.requiresKey && localSettings.connections[integration.id] && (
                <div className="space-y-2">
                  <Label htmlFor={`${integration.id}-key`}>API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={`${integration.id}-key`}
                        type={visibleKeys[integration.id] ? 'text' : 'password'}
                        placeholder={integration.keyPlaceholder}
                        value={localSettings.apiKeys[integration.id] || ''}
                        onChange={(e) => handleApiKeyChange(integration.id, e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                        onClick={() => toggleKeyVisibility(integration.id)}
                      >
                        {visibleKeys[integration.id] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => testConnection(integration.id)}
                      disabled={!localSettings.apiKeys[integration.id]}
                    >
                      <TestTube className="h-4 w-4 mr-1" />
                      Test
                    </Button>
                    {localSettings.apiKeys[integration.id] && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyApiKey(localSettings.apiKeys[integration.id])}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Webhook Endpoints */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Webhook Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure webhook URLs to receive real-time notifications about events in your system.
          </p>
          
          {webhookEndpoints.map((webhook) => (
            <div key={webhook.id} className="space-y-2 p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{webhook.name}</h4>
                  <p className="text-sm text-muted-foreground">{webhook.description}</p>
                </div>
                <Badge 
                  className={localSettings.webhooks[webhook.id] 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-gray-500/20 text-gray-300'
                  }
                >
                  {localSettings.webhooks[webhook.id] ? 'Configured' : 'Not Set'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`webhook-${webhook.id}`}>Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id={`webhook-${webhook.id}`}
                    placeholder="https://your-app.com/webhook/endpoint"
                    value={localSettings.webhooks[webhook.id] || ''}
                    onChange={(e) => handleWebhookChange(webhook.id, e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={!localSettings.webhooks[webhook.id]}
                  >
                    <TestTube className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Information */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            API Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>API Base URL</Label>
              <div className="flex gap-2">
                <Input 
                  value="https://api.yourcompany.com/v1" 
                  readOnly 
                  className="bg-accent/50"
                />
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Rate Limit</Label>
              <Input 
                value="1000 requests/hour" 
                readOnly 
                className="bg-accent/50"
              />
            </div>
          </div>
          
          <div className="p-4 bg-accent/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">API Documentation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Access our comprehensive API documentation to integrate with your existing systems.
            </p>
            <Button variant="outline" size="sm">
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save/Cancel Actions */}
      {hasChanges && (
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                You have unsaved changes
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};