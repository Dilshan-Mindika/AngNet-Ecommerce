import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h1 class="fw-bold mb-4">Privacy Policy</h1>
      <p>At AngNet Shop, we are committed to protecting your privacy.</p>
      <h4 class="mt-4">Information We Collect</h4>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.</p>
      <h4 class="mt-4">How We Use Your Information</h4>
      <p>We use your information to process transactions, provide customer support, and improve our services.</p>
      <h4 class="mt-4">Security</h4>
      <p>We implement a variety of security measures to maintain the safety of your personal information.</p>
    </div>
  `,
  styles: []
})
export class PrivacyComponent { }
