
import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;  //set isOpen to whatever the value of class.open 

    @HostListener('click') someMethodName(eventData: Event) {
        //alert(this.isOpen);
        this.isOpen = !this.isOpen;
    }
}