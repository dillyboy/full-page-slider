(() => {
  const $ = function( id ) { return document.getElementById( id ); } // make it easier to select by id
  const TIMEOUT_DURATION = 5000;
  let timer = setInterval(autoPlay, TIMEOUT_DURATION);

  const pages = [
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

  function generateSlider() {
    let slideElements = '';
    let navElements = '';

    pages.forEach(page => {
      slideElements += `
        <div>
          <div class="TextContainer ${page.classes.join(' ')}">
            <h3>${page.heading}</h3>
            <h1>${page.subHeading}</h1>
            <button type="button">Explore Now</button>
          </div>
          <img src="images/slider/${page.no}.jpg" alt="${page.heading}">
        </div>`

      navElements += `<span id="full-page-slider-nav-${page.no}" class="${page.active ? 'active': ''}"></span>`;
    });

    $('pages').innerHTML = slideElements;
    $('pagination').innerHTML = navElements;

    pages.forEach(page => {
      $(`full-page-slider-nav-${page.no}`).onclick = () => changePage(page.no);
    });
  };

  generateSlider();

  function changePage(pageNo) {
    pages.forEach(page => {
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
    generateSlider();
    $('pages').scrollLeft = ($('pages').clientWidth * pageNo) - $('pages').clientWidth;
    clearInterval(timer);
    timer = setInterval(autoPlay, TIMEOUT_DURATION);
  }

  function autoPlay() {
    const currentPage = pages.findIndex(x => x.active) + 1;
    if (currentPage === pages.length) {
      changePage(1);
    } else {
      changePage(currentPage + 1);
    }
  }
})();
