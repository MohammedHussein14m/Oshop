import { ShoppingCartService } from "./../shopping-cart.service";
import { switchMap } from "rxjs/operators";
import { ProductService } from "./../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/models/product";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit , OnDestroy {
  products: Product[] = [];
  category: String;
  filteredProducts: Product[] = [];
  cart;
  subscription : Subscription;
  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;

          return route.queryParamMap;
        })
      )

      .subscribe((params) => {
        this.category = params.get("category");

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }
  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges()
      .subscribe((cart) => (this.cart = cart));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
