import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _Router = inject(Router);

  categoriesList: ICategory[] = [];

  productListOfSpecificCategory: IProduct[] = [];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
      },
    });
  }

  dispalyAllProductsFromTisCategory(catName: string): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.productListOfSpecificCategory = res.data.filter(
          (product: IProduct) => product.category.name == catName
        );
        console.log(this.productListOfSpecificCategory);
        this._CategoriesService.productListOfSpecificCategory =
          this.productListOfSpecificCategory;

        this._Router.navigate(['/products-of-category']);
      },
    });
  }
}
