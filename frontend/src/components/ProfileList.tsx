import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useProfiles, useToggleProfile, useProfileStatuses } from '../hooks/useQueries';

export function ProfileList() {
  const { data: profiles, isLoading } = useProfiles();
  const { data: statuses } = useProfileStatuses();
  const toggleProfile = useToggleProfile();

  const getProfileStatus = (profileId: string) => {
    return statuses?.find((s) => s.profileId === profileId)?.status;
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'default';
    if (status.includes('সম্পন্ন')) return 'default';
    if (status.includes('চালু')) return 'default';
    return 'secondary';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            প্রোফাইল তালিকা
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          প্রোফাইল তালিকা
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {profiles?.map((profile) => {
              const status = getProfileStatus(profile.id);
              return (
                <div
                  key={profile.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      id={profile.id}
                      checked={profile.isSelected}
                      onCheckedChange={() => toggleProfile.mutate(profile.id)}
                      disabled={toggleProfile.isPending}
                    />
                    <Label
                      htmlFor={profile.id}
                      className="cursor-pointer font-medium flex-1"
                    >
                      {profile.name}
                    </Label>
                  </div>
                  {status && (
                    <Badge variant={getStatusColor(status)} className="text-xs">
                      {status}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
