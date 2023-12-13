import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/platzi.interface';
import { PlatziStoreService } from 'src/app/services/platzi-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public product!: Product;
  public index: number = 0;
  public spinner: boolean = true;
  public currentImage: string = '';
  public images: string[] = [];
  public height: number = 200;
  public innerWidth: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private platzi: PlatziStoreService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    if (width > 500) {
      this.height = 400;
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 500) {
      this.height = 400;
    }
    this.activatedRoute.params.pipe(switchMap(({ id }) => this.platzi.getProductById(id)))
      .subscribe((response) => {
        this.product = response;
        this.currentImage = this.product.images[this.index];
        this.images = this.product.images;
        this.spinner = false;
      });

  }

  public changeImage(value: string): void {
    if (value === "next") {
      this.index++;
      if (this.index >= this.images.length) {
        this.index = 0;
      }
    } else {
      this.index--;
      if (this.index < 0) {
        this.index = this.images.length - 1;
      }
    }
    this.currentImage = this.product.images[this.index];
  }

  public changeSelectedImage(index: number): void {
    this.index = index;
    this.currentImage = this.product.images[this.index];
  }

  launchSwal(event: any) {
    Swal.fire({
      icon: 'success',
      title: 'Item added to cart!',
      html: `You can continue shopping <br>
      This is just a demo with sweetalert2 :)`,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }
}
