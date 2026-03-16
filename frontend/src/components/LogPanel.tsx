import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock } from 'lucide-react';
import { useLogs } from '../hooks/useQueries';

export function LogPanel() {
  const { data: logs } = useLogs();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          লগ প্যানেল
          {logs && logs.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {logs.length} এন্ট্রি
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4" ref={scrollRef}>
          <div className="space-y-2">
            {logs && logs.length > 0 ? (
              logs.map((log, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-border/50 bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground font-mono">
                          {formatTimestamp(log.timestamp)}
                        </span>
                        {log.profileId && (
                          <Badge variant="outline" className="text-xs">
                            {log.profileId}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground break-words">
                        {log.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">
                  এখনও কোনো লগ নেই
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  অপারেশন শুরু করলে লগ এখানে প্রদর্শিত হবে
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
