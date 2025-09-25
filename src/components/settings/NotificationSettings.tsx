import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface NotificationSettingsProps {
  settings: {
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
  onSettingsChange: (settings: any) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');

  const handleToggleChange = (field: string, value: boolean) => {
    const newSettings = { ...localSettings, [field]: value };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleQuietHoursChange = (field: 'start' | 'end', value: string) => {
    const newQuietHours = { ...localSettings.quietHours, [field]: value };
    const newSettings = { ...localSettings, quietHours: newQuietHours };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleEscalationChange = (field: string, value: any) => {
    const newEscalation = { ...localSettings.escalation, [field]: value };
    const newSettings = { ...localSettings, escalation: newEscalation };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const addRecipient = () => {
    if (newRecipient && !localSettings.escalation.recipients.includes(newRecipient)) {
      const newRecipients = [...localSettings.escalation.recipients, newRecipient];
      handleEscalationChange('recipients', newRecipients);
      setNewRecipient('');
    }
  };

  const removeRecipient = (email: string) => {
    const newRecipients = localSettings.escalation.recipients.filter(r => r !== email);
    handleEscalationChange('recipients', newRecipients);
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
      {/* Email Notifications */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates and tickets
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={localSettings.email}
              onCheckedChange={(checked) => handleToggleChange('email', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            SMS Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get text messages for urgent issues and emergencies
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={localSettings.sms}
              onCheckedChange={(checked) => handleToggleChange('sms', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show browser push notifications for real-time updates
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={localSettings.push}
              onCheckedChange={(checked) => handleToggleChange('push', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quiet Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Set hours when you don't want to receive non-urgent notifications
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quiet-start">Start Time</Label>
              <Input
                id="quiet-start"
                type="time"
                value={localSettings.quietHours.start}
                onChange={(e) => handleQuietHoursChange('start', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiet-end">End Time</Label>
              <Input
                id="quiet-end"
                type="time"
                value={localSettings.quietHours.end}
                onChange={(e) => handleQuietHoursChange('end', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Rules */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Escalation Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="escalation-enabled">Enable Escalation</Label>
              <p className="text-sm text-muted-foreground">
                Automatically escalate unresolved tickets
              </p>
            </div>
            <Switch
              id="escalation-enabled"
              checked={localSettings.escalation.enabled}
              onCheckedChange={(checked) => handleEscalationChange('enabled', checked)}
            />
          </div>

          {localSettings.escalation.enabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="escalation-threshold">Escalation Threshold (minutes)</Label>
                <Input
                  id="escalation-threshold"
                  type="number"
                  min="1"
                  value={localSettings.escalation.threshold}
                  onChange={(e) => handleEscalationChange('threshold', parseInt(e.target.value))}
                  placeholder="60"
                />
              </div>

              <div className="space-y-2">
                <Label>Escalation Recipients</Label>
                <div className="space-y-2">
                  {localSettings.escalation.recipients.map((recipient, index) => (
                    <div key={index} className="flex items-center justify-between bg-accent/50 rounded-lg p-2">
                      <span className="text-sm">{recipient}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRecipient(recipient)}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="manager@company.com"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                    />
                    <Button onClick={addRecipient} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
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