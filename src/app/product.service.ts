import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class ProductService {


  constructor(private db: AngularFireDatabase) {}

  add(product) {
    return this.db.list("/products").push(product);
  }

  getAll() {
    return this.db.list("/products").valueChanges();
  }

  remove(productId) {
    return this.db.object("/products/" + productId).remove();
  }

  getId() {
    let query = this.db.database.ref("/products/");
    query.once("value").then((snapshot) => {
      snapshot.forEach((itemSnapshot) => {
        console.log(itemSnapshot.key);
      });
    });
  }
}
