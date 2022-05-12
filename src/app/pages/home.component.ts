import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prod } from '../models/prod';
import { ProdottiService } from '../service/prodotti.service';
import { CartService } from '../service/cart.service';

@Component({
  template: `
    <div
      *ngIf="load; else loadingTemp"
      class="row row-cols-1 row-cols-md-4 g-4 mt-5"
    >
      <div class="col" *ngFor="let prodotto of prodotti">
        <div class="card w-75 h-100">
          <div class="card-body">
            <h5 class="card-title">{{ prodotto.name | uppercase }}</h5>
            <p class="card-text">
              {{ prodotto.description }}
            </p>
            <p>Prezzo: {{ prodotto.price | currency: 'EUR' }}</p>
            <button
              class="btn btn-primary"
              [routerLink]="['/products', prodotto.id]"
            >
              Dettagli
            </button>
          </div>
        </div>
      </div>
    </div>

    <ng-template #loadingTemp>
      <div class="text-center mt-5">
        <img src="../../assets/img/load.gif" alt="" />
      </div>
    </ng-template>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  prodotti: Prod[] = [];
  load: boolean = false;

  constructor(
    private http: HttpClient,
    private prodServ: ProdottiService,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {
    this.prodServ.getProducts().subscribe((products) => {
      this.prodotti = products;
      this.load = true;
      console.log(products);
    });
  }
}
