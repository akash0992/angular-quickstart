import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent }   from './app.component';
import {OrderByPipe} from './pipes/orderby';
@NgModule({
    imports: [ BrowserModule, FormsModule, ReactiveFormsModule , HttpModule],
    declarations: [ AppComponent, OrderByPipe ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
