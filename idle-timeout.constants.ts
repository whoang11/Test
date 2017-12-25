//export class IdleTimeoutConstants {
//    public static readonly IdleTimeoutDuration: number = 780; // 13 minutes idle time
//    public static readonly IdleTimeoutCountdown: number = 120 // 2 minute countdown; 
//}

export class IdleTimeoutConstants {
    public static readonly IdleTimeoutDuration: number = 15; //IdleTimeoutDuration: number = 840, // 900 - 60 (15 minutes minus the 60 second countdown)
    public static readonly IdleTimeoutCountdown: number = 10; //IdleTimeoutCountdown: number = 60, // 60 Second Countdown  
}

index.ts
export * from './idle-timeout.constants';
