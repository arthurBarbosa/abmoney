import { BookEntryService } from './components/book-entry/book-entry.service';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BookEntryModule } from './components/book-entry/book-entry.module';
import { PersonModule } from './components/person/person.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BookEntryModule,
    PersonModule,

    CurrencyMaskModule,

    CoreModule,
  ],
  providers: [BookEntryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
