import { Product } from "./models/product";
import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list("/shopping-cart").push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-cart" + cartId);
  }

  private async getOrCreateCartId() : Promise<String> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object("/shopping-cart/" + cartId + "/items/" + product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item : any) => {
      if(item) item$.update({quantity : item.quantity +1 });
      else item$.set({product : product , quantity : 1});
    });
  }
}
