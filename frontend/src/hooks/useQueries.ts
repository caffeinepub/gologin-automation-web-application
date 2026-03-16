import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Profile, LogEntry, ProfileStatus, AutomationSettings } from '../backend';

export function useProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<Profile[]>({
    queryKey: ['profiles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializeProfiles() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.initializeProfiles();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
}

export function useToggleProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.toggleProfileSelection(profileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
}

export function useUpdateSettings() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (settings: AutomationSettings) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateSettings(settings);
    },
  });
}

export function useStartQueue() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.startQueue();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      queryClient.invalidateQueries({ queryKey: ['profileStatuses'] });
      queryClient.invalidateQueries({ queryKey: ['operationRunning'] });
    },
  });
}

export function useStopQueue() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.stopQueue();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      queryClient.invalidateQueries({ queryKey: ['operationRunning'] });
    },
  });
}

export function useLogs() {
  const { actor, isFetching } = useActor();

  return useQuery<LogEntry[]>({
    queryKey: ['logs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLogs();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2000, // Poll every 2 seconds for real-time updates
  });
}

export function useProfileStatuses() {
  const { actor, isFetching } = useActor();

  return useQuery<ProfileStatus[]>({
    queryKey: ['profileStatuses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProfileStatuses();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 1000, // Poll every second for real-time updates
  });
}

export function useOperationRunning() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['operationRunning'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOperationRunning();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 1000, // Poll every second
  });
}
