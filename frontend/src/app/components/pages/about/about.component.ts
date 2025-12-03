import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h1 class="fw-bold mb-4">About AngNet Shop</h1>
      <p class="lead">AngNet Shop is your premier destination for online shopping.</p>
      <p>Founded in 2025, we are dedicated to providing the best products at the most affordable prices. Our mission is to make online shopping accessible, secure, and enjoyable for everyone.</p>
      <p>We offer a wide range of products including Electronics, Clothing, Books, and more. Our team works tirelessly to source high-quality items and ensure fast delivery to your doorstep.</p>
    </div>
  `,
  styles: []
})
export class AboutComponent { }
