import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";
import { DataStorageService } from "app/shared/data-storage.service";

import { Response } from '@angular/http';
import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipes.service";
import { FireBaseAuthService } from "app/auth/firebase.auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit, OnDestroy {

    myNumbersSubscription: Subscription;
    myCustomSubscription: Subscription;

    count: Number;

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, public authService: FireBaseAuthService) { }

    @Output() featureSelectd = new EventEmitter<string>();
    OnSelect(feature: string) {
        this.featureSelectd.emit(feature);
    }

    ngOnInit() {
        const myNumbers = Observable.interval(1000)            //ms
            .map(
            (data: number) => {
                return data * 1;
            }
            );
        this.myNumbersSubscription = myNumbers.subscribe(
            (number: number) => {
                this.count = number;
            }
        );

        //new
        const myObservable = Observable.create((observer: Observer<string>) => {
            setTimeout(() => {
                observer.next("package 1");
            }, 2000);
            setTimeout(() => {
                observer.next("package 2");
            }, 4000);
            setTimeout(() => {
                observer.complete();
            }, 6000);
            setTimeout(() => {
                observer.error("this is observable error");
            }, 8000);
        });

        this.myCustomSubscription = myObservable.subscribe(
            (data: string) => { console.log(data) },
            (error: string) => { console.log(error) },
            () => { console.log("Completed !") }
        );
    }

    ngOnDestroy(): void {
        this.myNumbersSubscription.unsubscribe();
        this.myCustomSubscription.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    onFetchData() {
        this.dataStorageService.getRecipes().subscribe(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                this.recipeService.setRecipes(recipes);
            },
            (error) => console.log(error)
        );
    }

    onLogout(){
        this.recipeService.resetRecipes();
        this.authService.logout();
    }
}