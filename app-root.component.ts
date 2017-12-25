import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IdleTimerService } from "@app/core/services";

@Component({
    selector: 'lhi-app-root',
    templateUrl: './app-root.component.html'
})

export class AppRootComponent {
    constructor(private idleTimerService: IdleTimerService) {
        idleTimerService.setupIdleTimer();
    }
}

// app-root.component.html
<lhi-idle-timer></lhi-idle-timer>
<router-outlet></router-outlet>
