import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.posts = await this.apiService.getItems();
    console.log(this.posts);
  }
}