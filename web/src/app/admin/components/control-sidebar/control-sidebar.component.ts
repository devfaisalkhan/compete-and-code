import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, viewChild, viewChildren } from '@angular/core';
import { ComponentsWithFormsModule } from '../../../components/components-with-forms.module';
import { AppConstant } from '../../../universal/app-constant';

@Component({
  selector: 'app-control-sidebar',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './control-sidebar.component.html',
  styleUrl: './control-sidebar.component.scss'
})
export class ControlSidebarComponent implements OnInit {
  isDarkMode: boolean = false;
 
  constructor(
    private renderer: Renderer2,
  ) {
    
  }

  ngOnInit(): void {
    const savedDarkMode = localStorage.getItem(AppConstant.KEY_DARK_MODE);
    this.isDarkMode = savedDarkMode ? JSON.parse(savedDarkMode) : false;
    this.applyTheme();
  }

  onDarkModeToggle(): void {
    localStorage.setItem(AppConstant.KEY_DARK_MODE, JSON.stringify(this.isDarkMode));
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = document.querySelector('body');
    if (body) {
      if (this.isDarkMode) {
        this.renderer.addClass(body, 'dark-mode');
      } else {
        this.renderer.removeClass(body, 'dark-mode');
      }
    }
  }

}
