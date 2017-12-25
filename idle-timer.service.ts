import { Injectable, Output, EventEmitter } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject } from 'rxjs/Subject';
import { IdleTimeoutConstants } from "@app/core/constants";

@Injectable()
export class IdleTimerService {
    idleTimeoutDuration: number;

    @Output() logOut: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public idle: Idle,
        public keepalive: Keepalive) {
        this.idleTimeoutDuration = IdleTimeoutConstants.IdleTimeoutDuration;
    }

    setupIdleTimer(): void {
        // Stop the idle timer (even if it is not running) to prevent a double idle.watch().        
        // debugger;
        this.idle.stop();

            // set defaults
            this.idle.setIdle(this.idleTimeoutDuration);
            this.idle.setTimeout(IdleTimeoutConstants.IdleTimeoutCountdown);

            // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
            this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

            this.idle.watch();
        
    };

    stopIdleTimer(): void {
        this.logOut.next(true);
    };
}

// index.ts
export * from './idle-timer.service';
