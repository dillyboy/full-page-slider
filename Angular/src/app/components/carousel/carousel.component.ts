import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-carousel',
  template: `
    <div class="Carousel">
      <div class="Pages" #pagesRef>
        <div *ngFor="let page of pages">
          <div class="TextContainer {{page.classes.join(' ')}}">
            <h3>{{page.heading}}</h3>
            <h1>{{page.subHeading}}</h1>
            <button type="button" (click)="changePage(page.no)">Explore Now</button>
          </div>
          <img src="/assets/images/slider/{{page.no}}.jpg" [alt]="page.heading" />
        </div>
      </div>
      <div class="Pagination">
        <span *ngFor="let page of pages" [ngClass]="{'active': page.active}" (click)="changePage(page.no)"></span>
      </div>
    </div>`,
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent {

  @ViewChild('pagesRef') pagesRef: ElementRef;
  pages = [
    {
      no: 1, active: true,
      heading: 'SUMMER 2020', subHeading: 'New Arrival Collection',
      classes: ['Animate__slideInLeft']
    }, {
      no: 2, active: false,
      heading: 'NEW SEASON', subHeading: 'Lookbook Collection',
      classes: []
    }, {
      no: 3, active: false,
      heading: 'SUMMER SALE', subHeading: 'Save up to 70%',
      classes: []
    }
  ];

  TIMEOUT_DURATION = 5000 as const;
  timer = null;

  constructor() {
    this.timer = setTimeout(() => this.autoPlay(), this.TIMEOUT_DURATION);
  }

  changePage = (pageNo) => {
    this.pages.forEach(page => {
      // set active page
      page.active  = pageNo === page.no ? true : false;

      // set classes when slide change
      let sliderClasses = [];
      if (pageNo === page.no && pageNo % 2 === 0) {
        sliderClasses = ['Animate__slideInRight', 'Right'];
      } else if (pageNo === page.no) {
        sliderClasses = ['Animate__slideInLeft'];
      }
      page.classes = sliderClasses;
    });
    this.pagesRef.nativeElement.scrollLeft = (this.pagesRef.nativeElement.clientWidth * pageNo) - this.pagesRef.nativeElement.clientWidth;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.autoPlay(), this.TIMEOUT_DURATION);
  }

  autoPlay() {
    const currentPage = this.pages.findIndex(x => x.active) + 1;
    if (currentPage === this.pages.length) {
      this.changePage(1);
    } else {
      this.changePage(currentPage + 1);
    }
  }

}
