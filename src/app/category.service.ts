import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private db : AngularFireDatabase) {}

  getAll(){
    return this.db
    .list('categories', reference => reference.orderByChild('name'))
    .snapshotChanges() // include snapshot itself (access to key property)
    .pipe(map(metadata => metadata.map(data => ({ key: data.payload.key, ...(data.payload.val() as {}) }))));
  }

}
