import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-light pt-5 pb-3 mt-5 border-top">
      <div class="container">
        <div class="row">
          <div class="col-md-3 mb-3">
            <h6 class="text-uppercase fw-bold mb-3">Buy</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-decoration-none text-secondary">Registration</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Money Back Guarantee</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Bidding & buying help</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Stores</a></li>
            </ul>
          </div>
          <div class="col-md-3 mb-3">
            <h6 class="text-uppercase fw-bold mb-3">Sell</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-decoration-none text-secondary">Start selling</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Learn to sell</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Affiliates</a></li>
            </ul>
          </div>
          <div class="col-md-3 mb-3">
            <h6 class="text-uppercase fw-bold mb-3">Tools & Apps</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-decoration-none text-secondary">Developers</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Security center</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Site map</a></li>
            </ul>
          </div>
          <div class="col-md-3 mb-3">
            <h6 class="text-uppercase fw-bold mb-3">About AngNet</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-decoration-none text-secondary">Company info</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">News</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Investors</a></li>
              <li><a href="#" class="text-decoration-none text-secondary">Careers</a></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0 text-secondary small">&copy; 2025 AngNet Shop Inc. All Rights Reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <a href="#" class="text-secondary me-3"><i class="fa fa-facebook"></i></a>
            <a href="#" class="text-secondary me-3"><i class="fa fa-twitter"></i></a>
            <a href="#" class="text-secondary"><i class="fa fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer a:hover { text-decoration: underline !important; color: #000 !important; }
  `]
})
export class FooterComponent { }
