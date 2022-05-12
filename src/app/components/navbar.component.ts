import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand fs-3 me-5 text-white" href="#">Maurazon</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul
            class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px;"
          >
            <li class="nav-item">
              <a
                class="nav-link d-inline-block mt-1 ms-5 fs-5 text-white"
                aria-current="page"
                [routerLink]="['/']"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link ms-3" [routerLink]="['/cart']"
                ><button
                  type="button"
                  class="btn btn-outline-warning position-relative"
                >
                  <i class="bi bi-cart3"></i>
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {{ total }}
                  </span>
                </button></a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  total: number = 0;

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.cartServ.subject.subscribe((counter: number) => {
      this.total = counter;
    });
  }
}
