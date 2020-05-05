import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { Observable } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import { FormControl ,Validators  } from "@angular/forms";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {

  categories$;
  constructor(
    categoryService : CategoryService ,
    private productService : ProductService ,
    private router : Router
    ){
    this.categories$ = categoryService.getAll();
    //const control = new FormControl("",Validators.min(0))
    //console.log(control.errors);
   }

   save(product) {
    this.productService.add(product);
    this.router.navigate(['/admin/products'])
   }

   delete(){
     if(!confirm('R U Sure?')) return;
   }

}
