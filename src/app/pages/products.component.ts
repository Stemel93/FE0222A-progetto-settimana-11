import { Component, OnInit } from '@angular/core';
import { Prod } from '../models/prod';
import { Subscription } from 'rxjs';
import { ProdottiService } from '../service/prodotti.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  template: `
    <div *ngIf="load; else loadingTemp" class="container mt-5 text-center">
      <div>
        <div class="card border-0 mb-4">
          <h5 class="card-header">Dettagli {{ productDetails.name }}</h5>
          <div class="card-body">
            <h5 class="card-title">
              <img
                src="{{ productDetails.url }}"
                class="card-img-top"
                alt="..."
              />
              Prodotto num. {{ productDetails.id }} -
              {{ productDetails.name | uppercase }}
            </h5>

            <p class="card-text">{{ productDetails.description }}</p>
            <p class="card-text">
              Prezzo:
              <span class="fw-bold">{{
                productDetails.price | currency: 'EUR'
              }}</span>
            </p>
          </div>
          <div class="card-footer">
            <button [routerLink]="['/']" class="btn btn-primary">
              Torna alla Home
            </button>
            <button
              class="btn btn-success ms-5"
              (click)="aggiungi(productDetails)"
            >
              Manda al Carrello
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

    <hr />
  `,
  styles: [
    `
      .card-img-top {
        width: 25%;
        heigth: 50%;
      }

      hr {
        margin-top: 150px;
        color: transparent;
      }
    `,
  ],
})
export class ProductsComponent implements OnInit {
  products!: number;
  productDetails!: Prod;
  sub!: Subscription;
  load: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private prodServ: ProdottiService,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.router.snapshot.params['id'];

    this.prodServ.getSingleProduct(this.products).subscribe((result) => {
      this.productDetails = result;
      this.load = true;
    });
  }

  aggiungi(result: Prod) {
    this.cartServ.addToCart(result);
    this.cartServ.conta();
  }
}
