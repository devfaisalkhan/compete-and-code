import { AfterViewInit, Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.scss'
})
export class MainSidebarComponent implements AfterViewInit{
  
  ngAfterViewInit(): void {
    
    $(document).ready(function () {
      $('[data-widget="treeview"]').Treeview('init');
    });
  }

}
