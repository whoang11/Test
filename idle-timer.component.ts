import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { IdleTimerService, WorksheetService } from "@app/core/services";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval'; 

@Component({
    selector: 'lhi-idle-timer',
    templateUrl: './idle-timer.component.html',
    styleUrls: ['./idle-timer.component.css']
})

export class IdleTimerComponent implements OnInit, OnDestroy {

    // component show hide/things
    countdown: number = 60;
    visible: boolean = false;
    activeSession: boolean = true;

    // subscriptions
    private onIdleEndSub: Subscription;
    private onTimeoutSub: Subscription;
    private onIdleStartSub: Subscription;
    private onTimeoutWarningSub: Subscription;
    private keepAlivePingSub: Subscription;
    private logoutSub: Subscription;
    private activeTimer: Subscription;

    constructor(
        private keepalive: Keepalive,
        private titleService: Title,
        private idleTimerService: IdleTimerService,      
        private router: Router,
        private worksheetService: WorksheetService) {   
    }

    ngOnInit() {
        // the user is doing stuff, hide alert       
        this.onIdleEndSub = this.idleTimerService.idle.onIdleEnd.subscribe(() => {           
            var expireSession = false;
            this.hideAlert(expireSession);
            this.activeSession = true;
        });

        // the user has timed out (meaning idleDuration + timeout has passed without any activity)
        // this is where you'd log them
        this.onTimeoutSub = this.idleTimerService.idle.onTimeout.subscribe(() => {          
            var expireSession = true;
            this.hideAlert(expireSession);
            this.activeSession = false;
        });

        // the user appears to have gone idle, show alert with warning
        this.onIdleStartSub = this.idleTimerService.idle.onIdleStart.subscribe(() => {
            this.visible = true;  
            this.activeSession = false;
        });

        this.onTimeoutWarningSub = this.idleTimerService.idle.onTimeoutWarning.subscribe((countdown) => {
            // follows after the IdleStart event, but includes a countdown until the user is considered timed out
            // the countdown arg is the number of seconds remaining until then.
            // you can change the title or display a warning dialog from here.
            // you can let them resume their session by calling Idle.watch()
            //console.log('You will time out in ' + countdown + ' seconds!');          
            this.countdown = countdown;
        });


        ///////////
        // Events - Keep alive
        //////////
        // Using this Keepalive Even, we are going to keep the user's session active on a timed interval
        // this will be a 'heartbeat' check to keep the token alive
        // this is started automattically when Idle.watch() is called
        //this.keepAlivePingSub = this.idleTimerService.keepalive.onPing.subscribe(() => {
        //    this.authService.heartbeatCheck();
        //});

        this.logoutSub = this.idleTimerService.logOut.subscribe(() => {
            //console.log('ITC-logoutSub');            
            var expireSession = false;
            this.hideAlert(false);
        });

       
        this.activeTimer = Observable.interval(10000).subscribe(() => { // 1140000 miliseconds = 19 minutes
            if (this.activeSession)
                console.log('Update last active date')
            else 
                console.log('Not active; Do not Update last active date')
        });        
    }

    ngOnDestroy() {
        this.onIdleEndSub.unsubscribe();
        this.onTimeoutSub.unsubscribe();
        this.onIdleStartSub.unsubscribe();
        this.onTimeoutWarningSub.unsubscribe();
        this.keepAlivePingSub.unsubscribe();
        this.logoutSub.unsubscribe();
        this.activeTimer.unsubscribe();
    }

    private hide(): void {
        this.visible = false;
        this.countdown = 60;
    };

    private expireSession(): void {      
        this.hide();
    };

    private hideAlert(expireSession: boolean): void {  
        if (!expireSession) {
            this.hide();
        }
        else {
            // redirect the user to the logout screen of old portal
            this.activeTimer.unsubscribe();  
            let index = this.worksheetService.returnUrl.indexOf('.com/')
            let returnUrl = this.worksheetService.returnUrl.substr(0, index + 5) + 'Logout.aspx';
            // console.log('returnUrl:', returnUrl);
            window.location.href = returnUrl; 
        }
       
    };
}

// index.ts -under the parent folder of component folder
export * from './idle-timer/idle-timer.component';
