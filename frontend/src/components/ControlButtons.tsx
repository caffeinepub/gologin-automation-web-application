import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  useStartQueue,
  useStopQueue,
  useUpdateSettings,
  useOperationRunning,
} from '../hooks/useQueries';

export function ControlButtons() {
  const startQueue = useStartQueue();
  const stopQueue = useStopQueue();
  const updateSettings = useUpdateSettings();
  const { data: isRunning } = useOperationRunning();

  const handleStart = async () => {
    try {
      const settings = (window as any).__automationSettings;
      if (!settings) {
        toast.error('সেটিংস লোড করা যায়নি');
        return;
      }

      await updateSettings.mutateAsync({
        targetUrl: settings.targetUrl,
        waitTime: BigInt(settings.waitTime),
        autoClickEnabled: settings.autoClickEnabled,
      });

      await startQueue.mutateAsync();
      toast.success('অপারেশন শুরু হয়েছে');
    } catch (error: any) {
      toast.error(error.message || 'অপারেশন শুরু করতে ব্যর্থ');
    }
  };

  const handleStop = async () => {
    try {
      await stopQueue.mutateAsync();
      toast.info('অপারেশন স্থগিত করা হয়েছে');
    } catch (error: any) {
      toast.error(error.message || 'অপারেশন স্থগিত করতে ব্যর্থ');
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleStart}
            disabled={isRunning || startQueue.isPending}
            className="w-full"
            size="lg"
          >
            {startQueue.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                শুরু হচ্ছে...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                কিউ শুরু করুন
              </>
            )}
          </Button>

          <Button
            onClick={handleStop}
            disabled={!isRunning || stopQueue.isPending}
            variant="destructive"
            className="w-full"
            size="lg"
          >
            {stopQueue.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                স্থগিত হচ্ছে...
              </>
            ) : (
              <>
                <Square className="mr-2 h-4 w-4" />
                স্থগিত করুন
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
