import { Observable } from "rxjs/Rx";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanMyComponentDeactivate {
    canMyComponenetDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanMyComponentDeactivate>{
    canDeactivate(component: CanMyComponentDeactivate, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        return component.canMyComponenetDeactivate();

    }
}