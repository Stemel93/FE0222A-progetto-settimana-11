import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prod } from '../models/prod';
import { ProdottiService } from '../service/prodotti.service';
import { CartService } from '../service/cart.service';

@Component({
  template: `
    <div class="container col-xxl-8 px-4 py-5 bg-warning rounded">
      <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div class="col-10 col-sm-8 col-lg-6">
          <img
            src="../../assets/img/bookshelf.jpg"
            class="d-block mx-lg-auto img-fluid rounded-pill"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">
            Incontra il tuo prossimo libro preferito.
          </h1>
          <p class="lead fw-bold">
            Stai decidendo cosa leggere come prossimo libro? Sei nel posto
            giusto, dove troverai migliaia di libri pronti a ricevere una nuova
            casa e una nuova famiglia!
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              class="btn btn-outline-dark fw-bold btn-lg px-4 me-md-2"
            >
              Libreria
            </button>
            <button
              type="button"
              class="btn btn-outline-dark fw-bold btn-lg px-4"
            >
              Contatti
            </button>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-center mt-5">I nostri Best-Seller</h2>
    <div
      *ngIf="load; else loadingTemp"
      class="row row-cols-1 row-cols-md-5 g-5 mt-5"
    >
      <div class="col" *ngFor="let prodotto of prodotti">
        <div class="card w-100 border-0">
          <img src="{{ prodotto.url }}" class="card-img-top" alt="..." />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ prodotto.name | uppercase }}</h5>

            <p class="fs-5">Prezzo: {{ prodotto.price | currency: 'EUR' }}</p>
            <button
              class="btn btn-warning mt-auto"
              [routerLink]="['/products', prodotto.id]"
            >
              Dettagli
            </button>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <ng-template #loadingTemp>
      <div class="text-center mt-5">
        <img src="../../assets/img/load.gif" alt="" />
      </div>
    </ng-template>
  `,
  styles: [
    `
      .card-img-top {
        width: 90%;
        height: 65%;
      }

      hr {
        margin-top: 150px;
      }

      .card {
        height: 85%;
      }

      h5 {
        font-size: 18px;
      }
    `,
  ],
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
