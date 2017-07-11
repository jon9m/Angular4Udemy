
import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') someMethodName(eventData: Event) {
        this.isOpen = !this.isOpen;
    }
}