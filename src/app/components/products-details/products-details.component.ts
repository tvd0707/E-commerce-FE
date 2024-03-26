import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  product!: Product;

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      });
  }

  addToCart(product: Product) {
    const cartItem:CartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }
}
