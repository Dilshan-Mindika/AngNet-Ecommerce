import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h1 class="fw-bold mb-4">Terms of Service</h1>
      <p>Welcome to AngNet Shop. By using our website, you agree to the following terms and conditions.</p>
      <h4 class="mt-4">1. Usage</h4>
      <p>You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the site.</p>
      <h4 class="mt-4">2. Products</h4>
      <p>We strive to ensure that all product descriptions and prices are accurate. However, errors may occur. We reserve the right to correct any errors or omissions.</p>
      <h4 class="mt-4">3. Privacy</h4>
      <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
    </div>
  `,
  styles: []
})
export class TermsComponent { }
