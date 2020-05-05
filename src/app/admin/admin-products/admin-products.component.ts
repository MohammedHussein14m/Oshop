import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products : Product[];
  filteredProducts : Product[];
  subscription : Subscription;


  constructor(private productService : ProductService ) {
    this.subscription =  this.productService.getAll()
    .subscribe( (products : Product []) => this.filteredProducts = this.products = products);
    //console.log(productService.getId());
    //console.log(productService.myId);
    //this.mykey = productService.getId();



  }

  filter(query : String){
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
    //console.log(this.filteredProducts);


  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
