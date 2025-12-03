import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h1 class="fw-bold mb-4">Contact Us</h1>
      <div class="row">
        <div class="col-md-6">
          <p class="lead">Have questions? We're here to help.</p>
          <ul class="list-unstyled">
            <li class="mb-3"><i class="fa fa-map-marker me-2 text-primary"></i> 123 E-commerce St, Tech City, USA</li>
            <li class="mb-3"><i class="fa fa-phone me-2 text-primary"></i> +1 (555) 123-4567</li>
            <li class="mb-3"><i class="fa fa-envelope me-2 text-primary"></i> support&#64;angnetshop.com</li>
          </ul>
        </div>
        <div class="col-md-6">
          <form>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" placeholder="Your Name">
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" placeholder="Your Email">
            </div>
            <div class="mb-3">
              <label class="form-label">Message</label>
              <textarea class="form-control" rows="5" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContactComponent { }
