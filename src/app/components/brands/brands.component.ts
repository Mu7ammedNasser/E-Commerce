import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService);

  brandsList: IBrand[] = [];

  selectedImage: string = '';
  brandName: string = '';

  @ViewChild('clickedElement') clickedElement!: ElementRef;

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandsList = res.data;
      },
    });
  }

  getImageSrc(imgSource: string, name: string): void {
    this.selectedImage = imgSource;
    this.brandName = name;
    this.clickedElement.nativeElement.classList.remove('d-none');
    this.clickedElement.nativeElement.classList.add('d-flex');
  }

  hideCard(): void {
    this.clickedElement.nativeElement.classList.remove('d-flex');
    this.clickedElement.nativeElement.classList.add('d-none');
  }
}
