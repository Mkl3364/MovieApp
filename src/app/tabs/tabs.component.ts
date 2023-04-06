import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SeenComponent } from '../seenComponent/seen.component';
import { RateComponent } from '../rateComponent/rate.component';

interface TabsInterface {
    title: string;
    content: string;
    active: boolean;
}

@Component({
    standalone: true,
    selector: 'tp-movies-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    imports: [CommonModule, SeenComponent, RateComponent]
})
export class MyTabsComponent {
    public tabs: TabsInterface[];
    constructor() {
        this.tabs = [
            {
                title: 'films vus',
                content: 'seen',
                active: false
            },
            {
                title: 'films notés',
                content: 'rated',
                active: false
            }
        ];
        console.log(this.tabs)
    }

    selectTab(tab: TabsInterface) {
      this.tabs.forEach((tab) => {
        tab.active = false;
      });
      tab.active = true;
      console.log('the tab', tab)
    }
  
    addTab(tab: TabsInterface) {
      if (this.tabs.length === 0) {
        tab.active = true;
      }
      this.tabs.push(tab);
    }
}
