import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

export function SettingsPanel() {
  const [targetUrl, setTargetUrl] = useState('https://example.com');
  const [waitTime, setWaitTime] = useState('5');
  const [autoClickEnabled, setAutoClickEnabled] = useState(false);

  // Export settings for use by ControlButtons
  if (typeof window !== 'undefined') {
    (window as any).__automationSettings = {
      targetUrl,
      waitTime: parseInt(waitTime) || 5,
      autoClickEnabled,
    };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          সেটিংস
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="targetUrl">টার্গেট URL</Label>
          <Input
            id="targetUrl"
            type="url"
            placeholder="https://example.com"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="waitTime">অপেক্ষার সময় (সেকেন্ড)</Label>
          <Input
            id="waitTime"
            type="number"
            min="1"
            max="60"
            placeholder="5"
            value={waitTime}
            onChange={(e) => setWaitTime(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-accent/5">
          <Label htmlFor="autoClick" className="cursor-pointer font-medium">
            অটো ক্লিক সক্রিয় করুন
          </Label>
          <Switch
            id="autoClick"
            checked={autoClickEnabled}
            onCheckedChange={setAutoClickEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
