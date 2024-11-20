import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Offer, Seller} from '../../interfaces/api';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html'
})
export class DialogFormComponent implements OnInit {
  offer: Offer;
  priceFormat: number | undefined;
  isPreorderChecked: boolean = false;
  sellers: Seller[] | undefined;
  isOtherTypeSelected: boolean = false;
  previousPopularityValue: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.offer = data.offer;
    this.sellers = data.sellers;
  }

  resetPrice() {
    this.priceFormat = 0;
  }

  onPreorderChange() {
    if (this.isPreorderChecked) {
      this.offer.popularityValue = this.previousPopularityValue;
      this.previousPopularityValue = null;
    } else {
      this.previousPopularityValue = this.offer.popularityValue;
      this.offer.popularityValue = 0;
    }

    this.isPreorderChecked = !this.isPreorderChecked;
  }

  ngOnInit(): void {
    this.dividePrice()
  }

  private dividePrice() {
   this.priceFormat = this.offer.price.amount / 100;
  }

  onTypeChange() {
    this.isOtherTypeSelected = this.offer.type === 'other';
    if (this.isOtherTypeSelected) {
      this.offer.sellerId = '';
    } else if (this.sellers && this.sellers.length) {
      this.offer.sellerId = this.sellers[0].id;
    }
  }
}
