import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { Prod } from '../models/prod';

@Component({
  template: `
    <!-- si collega ad elseIfTemplate in modo tale da poter creare una sorta di "elseIf" usando gli ngIf -->
    <ng-container *ngIf="productArray.length > 0; else elseIfTemplate">
      <ol class="list-group list-group-numbered">
        <li
          *ngFor="let products of productArray; let i = index"
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ products.name }}</div>
            {{ products.description }}
          </div>

          <span class="badge bg-primary rounded-pill">{{
            products.price | currency: 'EUR'
          }}</span>

          <i
            class="bi bi-x-circle-fill text-danger fs-3 mx-5"
            (click)="removeItem(i)"
          ></i>
        </li>
      </ol>
      <ul class="list-group list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-start bg-dark text-white"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">Totale Spesa</div>
            Puoi sempre tornare alla home e acquistare altri prodotti
          </div>
          <span class="badge bg-light text-dark rounded-pill">{{
            totalPrice | currency: 'EUR'
          }}</span>
        </li>
      </ul>
      <ng-container *ngIf="!display; else emptyTemplate">
        <div class="container text-center">
          <button
            class="btn btn-warning mt-5"
            id="confirm2"
            (click)="displayOnOff()"
          >
            Procedi all'acquisto
          </button>
        </div>
      </ng-container>

      <!-- FORM -->

      <ng-container *ngIf="display && !thanks; else emptyTemplate">
        <form (ngSubmit)="submit(formtd)" #formtd="ngForm">
          <div
            class="form-group mx-auto w-50 mt-5 text-center position-relative"
          >
            <label for="email" class="form-label mx-auto"
              >Indirizzo Email</label
            >
            <input
              type="email"
              class="form-control "
              id="email"
              ngModel
              name="email"
              placeholder="name@example.com"
              required
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
              #email="ngModel"
              [className]="
                email.invalid && email.touched
                  ? 'form-control is-invalid'
                  : !email.invalid && email.touched
                  ? 'form-control is-valid'
                  : 'form-control'
              "
            />
            <div class="invalid-tooltip">
              Per favore inserisci una Email valida
            </div>
          </div>
          <div class="mx-auto w-50 mt-3 text-center position-relative">
            <label for="name" class="form-label mx-auto">Nome</label>
            <input
              type="text"
              class="form-control"
              id="name"
              ngModel
              name="name"
              placeholder="Nome"
              required
              #name="ngModel"
              [className]="
                name.invalid && name.touched
                  ? 'form-control is-invalid'
                  : !name.invalid && name.touched
                  ? 'form-control is-valid'
                  : 'form-control'
              "
            />
            <div class="invalid-tooltip">Per favore inserisci il tuo nome</div>
          </div>
          <div class="mx-auto w-50 mt-3 text-center position-relative">
            <label for="surname" class="form-label mx-auto">Cognome</label>
            <input
              type="text"
              class="form-control"
              id="surname"
              ngModel
              name="surname"
              placeholder="Cognome"
              required
              #surname="ngModel"
              [className]="
                surname.invalid && surname.touched
                  ? 'form-control is-invalid'
                  : !surname.invalid && surname.touched
                  ? 'form-control is-valid'
                  : 'form-control'
              "
            />
            <div class="invalid-tooltip">
              Per favore inserisci il tuo cognome
            </div>
          </div>
          <div class="mx-auto w-50 mt-3 text-center position-relative">
            <label for="address" class="form-label mx-auto"
              >Indirizzo di Spedizione</label
            >
            <input
              type="text"
              class="form-control"
              id="address"
              ngModel
              name="address"
              placeholder="Indirizzo"
              required
              #address="ngModel"
              [className]="
                address.invalid && address.touched
                  ? 'form-control is-invalid'
                  : !address.invalid && address.touched
                  ? 'form-control is-valid'
                  : 'form-control'
              "
            />
            <div class="invalid-tooltip">
              Per favore inserisci il tuo indirizzo
            </div>
          </div>

          <div class="container text-center">
            <button
              type="submit"
              class="btn btn-warning mt-3"
              id="confirm"
              [disabled]="formtd.invalid"
            >
              Conferma Acquisto
            </button>
          </div>
        </form>
      </ng-container>
    </ng-container>

    <ng-template #elseIfTemplate>
      <ng-container *ngIf="display && thanks; else emptyCartTemplate">
        <div class="container" id="else">
          <div class="d-flex align-items-center flex-column mt-5">
            <p class="fs-2">Grazie per l'acquisto!</p>
            <a class="btn btn-warning fs-4" routerLink="/">Torna alla Home</a>
          </div>
        </div>
      </ng-container>
    </ng-template>

    <ng-template #emptyCartTemplate>
      <div class="container" id="else">
        <div class="d-flex align-items-center flex-column mt-5">
          <p class="fs-2">Il tuo carrello è vuoto!</p>
          <a class="btn btn-warning fs-4" routerLink="/">Torna alla Home</a>
        </div>
      </div>
    </ng-template>

    <ng-template #emptyTemplate></ng-template>
  `,
  styles: [
    `
      #confirm {
        margin-bottom: 150px;
      }
      #confirm2 {
        margin-bottom: 150px;
      }

      input.ng-invalid.ng-touched {
        border: 1px solid red;
      }

      .bi-x-circle-fill {
        cursor: pointer;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  productArray!: Prod[];
  totalPrice: number = 0;
  display = false; /* variabile usata per gli ngTemplates */
  thanks = false; /* variabile per template ringraziamenti */
  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.productArray = this.cartServ.items;

    for (let index = 0; index < this.productArray.length; index++) {
      this.totalPrice += this.productArray[index].price;
    }
  }

  displayOnOff() {
    this.display = true;
  }

  submit(ngform: any) {
    console.log(ngform);
    this.cartServ.clearCart();
    this.thanks = true;
    this.display = true;
  }

  removeItem(id: number) {
    this.cartServ.remove(id);
    this.totalPrice = 0;
    for (let index = 0; index < this.productArray.length; index++) {
      this.totalPrice += this.productArray[index].price;
    }
  }
}
