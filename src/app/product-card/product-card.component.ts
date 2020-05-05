import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input('product') product : Product;
  @Input('shopping-cart') shoppingCart

  constructor(private shoppingCartService :ShoppingCartService) { }

  addToCart(product : Product){
    this.shoppingCartService.addToCart(product);
    console.log(this.getQuantity());

  }

  getQuantity(){
    //if(!this.shoppingCart) return 0 ;
    let item = this.shoppingCart.items["undefined"];
    console.log(item);
    return item ? item.quantity : 0;
  }


}
