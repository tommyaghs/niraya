import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/Category';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { OrderService } from 'src/app/services/order.service';
import { orderDetails } from 'src/app/interfaces/checkout';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  cartItems: Product[] = [];
  totalPrice: number = 0;
  ivaRate: number = 22;
  shippingCost: number = 0;
  couponCode: string = '';
  couponApplied: boolean = false;
  couponDiscount: number = 0;
  OrderDetails: orderDetails = {
    subtotal: 0,
    tax: 0,
    shippingCost: 0,
    couponDiscount: 0,
    total: 0,
    couponCode: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && params['cartItems'] && params['totalPrice']) {
        const cartItems: Product[] = JSON.parse(params['cartItems']);
        const totalPrice: number = +params['totalPrice'];
        this.cartItems = cartItems;
        this.totalPrice = totalPrice;
        this.calculateOrderDetails();
        this.initConfig();
      }
    });
  }

  calculateOrderDetails(): void {
    this.OrderDetails = {
      subtotal: this.totalPrice,
      tax: this.totalPrice * this.ivaRate / (100 * (1 + this.ivaRate / 100)),
      shippingCost: this.shippingCost,
      couponDiscount: this.couponApplied ? this.totalPrice * 0.2 : 0,
      total: this.totalPrice - (this.couponApplied ? this.totalPrice * 0.2 : 0) + this.shippingCost,
      couponCode: this.couponCode
    };
  }

  applyCoupon() {
    if (this.couponCode === 'NIRAYA20') {
      this.couponApplied = true;
      this.calculateOrderDetails();
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'YOUR_PAYPAL_CLIENT_ID', // Sostituisci con il tuo PayPal Client ID
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.totalPrice.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.totalPrice.toFixed(2),
                }
              }
            },
            items: [
              {
                name: 'Abbigliamento',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.totalPrice.toFixed(2),
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}



// AYY2KMUEfb7jJMJVms3cQ9AWL3pMI_M62mDNG0c20w1tGJvQynW-NwVBLRmSw_aSoInA8QGEZHviohh-
