import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProfileStatus {
    status: string;
    profileId: string;
}
export interface AutomationSettings {
    autoClickEnabled: boolean;
    waitTime: bigint;
    targetUrl: string;
}
export interface LogEntry {
    profileId?: string;
    message: string;
    timestamp: bigint;
}
export interface Profile {
    id: string;
    isSelected: boolean;
    name: string;
}
export interface backendInterface {
    getLogs(): Promise<Array<LogEntry>>;
    getProfileStatuses(): Promise<Array<ProfileStatus>>;
    getProfiles(): Promise<Array<Profile>>;
    initializeProfiles(): Promise<void>;
    isOperationRunning(): Promise<boolean>;
    startQueue(): Promise<void>;
    stopQueue(): Promise<void>;
    toggleProfileSelection(profileId: string): Promise<void>;
    updateSettings(newSettings: AutomationSettings): Promise<void>;
}
