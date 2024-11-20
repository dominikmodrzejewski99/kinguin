import {Component, inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogFormComponent} from '../dialog-form/dialog-form.component';
import {NgxPermissionsService} from 'ngx-permissions';
import {Offer, Seller} from '../../interfaces/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  sellers: Seller[] | undefined;
  id: string = '';
  offers: Offer[] | undefined;
  viewOnly: boolean = false;

  constructor(private apiService: ApiService,
              private permissionsService: NgxPermissionsService) {
  }

  ngOnInit(): void {
    this.permissionsService.addPermission('canOpenModal');
  }

  getApiData(): void {
    this.apiService.getOffers(this.id).subscribe({
      next: (val) => {
        this.offers = val;

        this.sellers = this.offers.map((offer: Offer) => offer.seller);
      },
      error: (error) => {
        console.error('Error while downloading data:', error);
      }
    });
  }

  onViewOnlyChange(): void {
    this.setPermissions();
  }

  setPermissions(): void {
    if (this.viewOnly) {
      this.permissionsService.removePermission('canOpenModal');
    } else {
      this.permissionsService.addPermission('canOpenModal');
    }
  }

  getApiRequest() {
    this.getApiData();
  }

  openDialog(offer: Offer): void {
    if (this.permissionsService.getPermission('canOpenModal')) {
      this.dialog.open(DialogFormComponent, {
        width: '600px',
        height: '600px',
        data: {
          offer: offer,
          sellers: this.sellers
        },
      });
    } else {
      console.log('No permission to open modal window.');
    }
  }
}

