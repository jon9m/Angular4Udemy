import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',

})
export class HeaderComponent {

    @Output() featureSelectd = new EventEmitter<string>();
    OnSelect(feature: string) {
        this.featureSelectd.emit(feature);
    }

}