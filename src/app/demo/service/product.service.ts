import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map }from 'rxjs/operators';
import { Product } from '../api/product';

@Injectable()
export class ProductService {

    private basePath ="products"

    constructor(private db: AngularFireDatabase) { }

    getProducts(): Observable<Product[]> {
        return this.db.list<Product>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
        );
    }
    
    getProduct(key: string): Observable<Product> {
        return this.db.object<Product>(`${this.basePath}/${key}`).snapshotChanges().pipe(
            map(c => ({ key: c.payload.key, ...c.payload.val() }))
        );
    }
    
    createProduct(product: Product): any {
        return this.db.list<Product>(this.basePath).push(product);
    }
    
    updateProduct(key: string, value: any): Promise<void> {
        return this.db.object<Product>(`${this.basePath}/${key}`).update(value);
    }
    
    deleteProduct(key: string): Promise<void> {
        return this.db.object<Product>(`${this.basePath}/${key}`).remove();
    }
    
}