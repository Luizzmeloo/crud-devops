import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../api/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private basePath = "products";

    constructor(private db: AngularFireDatabase) { }

    // Função para buscar produtos pequenos
    getProductsSmall(): Promise<Product[]> {
        return this.db.list<Product>(`${this.basePath}`)
            .valueChanges()
            .pipe(map(products => products.slice(0, 5))) // Retorna uma lista pequena
            .toPromise();
    }

    // Função padrão para buscar todos os produtos
    getProducts(): Promise<Product[]> {
        return this.db.list<Product>(this.basePath).valueChanges().toPromise();
    }

    // Função para buscar produtos com ordens pequenas
    getProductsWithOrdersSmall(): Promise<Product[]> {
        return this.db.list<Product>(`${this.basePath}`)
            .valueChanges()
            .pipe(map(products => products.slice(0, 5))) // Exemplo para uma lista de ordens pequenas
            .toPromise();
    }

    // Função para criar um produto
    createProduct(product: Product): Promise<void> {
        const id = product.id || this.db.createPushId(); // Usa um ID gerado ou fornecido
        return this.db.object<Product>(`${this.basePath}/${id}`).set(product);
    }
}
