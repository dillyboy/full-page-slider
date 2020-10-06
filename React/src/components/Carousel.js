import React, {useState, useEffect,useRef} from 'react';
import classes from './Carousel.module.scss';

const Carousel = (props) => {

  const widthRef = useRef(null);
  const [pages, setPages] = useState([
    {
      no: 1, active: true,
      heading: 'SUMMER 2020', subHeading: 'New Arrival Collection',
      classes: [classes.Animate__slideInLeft]
    }, {
      no: 2, active: false,
      heading: 'NEW SEASON', subHeading: 'Lookbook Collection',
      classes: []
    }, {
      no: 3, active: false,
      heading: 'SUMMER SALE', subHeading: 'Save up to 70%',
      classes: []
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentPage = pages.findIndex(x => x.active) + 1;
      if (currentPage === pages.length) {
        changePage(1);
      } else {
        changePage(currentPage + 1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [pages]);

  const changePage = (pageNo) => {
    const newPageList = JSON.parse(JSON.stringify(pages));
    newPageList.forEach(page => {
      // set active page
      page.active  = pageNo === page.no ? true: false;

      // set classes when slide change
      let sliderClasses = [];
      if (pageNo === page.no && pageNo % 2 === 0) {
        sliderClasses = [classes.Animate__slideInRight, classes.Right];
      } else if (pageNo === page.no) {
        sliderClasses = [classes.Animate__slideInLeft];
      }
      page.classes = sliderClasses;
    });
    setPages(newPageList);

    const scrollLeft = (widthRef.current.clientWidth * pageNo) - widthRef.current.clientWidth;
    widthRef.current.scrollLeft = scrollLeft;
  }

  return (
    <div className={classes.Carousel}>
      <div className={classes.Pages} ref={widthRef}>
        {pages.map(page => (
          <div key={page.no}>
            <div className={classes.TextContainer + ' ' + page.classes.join(' ')}>
              <h3>{page.heading}</h3>
              <h1>{page.subHeading}</h1>
              <button type="button" onClick={() => props.clicked(page.no)}>Explore Now</button>
            </div>
            <img src={require(`../../assets/images/slider/${page.no}.jpg`)} alt={page.heading} />
          </div>
        ))}
      </div>
      <div className={classes.Pagination}>
        {pages.map(page => (
          <span key={page.no} className={page.active ? classes.active : ''} onClick={() => changePage(page.no)}></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
