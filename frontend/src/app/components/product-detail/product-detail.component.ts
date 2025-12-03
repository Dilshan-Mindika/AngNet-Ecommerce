import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5" *ngIf="product">
      <div class="row">
        <div class="col-md-6">
          <img [src]="product.imageUrl || 'https://via.placeholder.com/500'" class="img-fluid" alt="{{ product.name }}">
        </div>
        <div class="col-md-6">
          <h2>{{ product.name }}</h2>
          <p class="lead">{{ product.description }}</p>
          <h3 class="text-primary">\${{ product.price }}</h3>
          <p>Category: {{ product.category }}</p>
          <p>Stock: {{ product.stockQuantity }}</p>
          <button class="btn btn-primary btn-lg">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
    });
  }
}
