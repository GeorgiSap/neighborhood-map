 const BREAKPOINT_WIDTH = 600

 /**
  * @description Changes the layout based on viewport width on mount 
  * @param {Component} App component
  */
  export const setViewStateOnMount = app => {
    let isListViewAlongside = window.innerWidth >= BREAKPOINT_WIDTH
    app.setState({
      isListViewAlongside: isListViewAlongside,
      isListViewOpened: isListViewAlongside
    })
  }

 /**
  * @description Adds event listener that changes the layout on resize
  * @param {Component} App component
  */
  export const setViewStateOnResize = app => {
    window.addEventListener('resize', () => {
      let isListViewAlongside = window.innerWidth >= BREAKPOINT_WIDTH
      app.setState({
        isListViewAlongside: isListViewAlongside,
        isListViewOpened: isListViewAlongside,
        isMainDarkened: false
      })
    })
  }

 /**
  * @description Changes the layout on hamburger click  
  * based on current layout and viewport width
  * @param {Component} App component
  */
  export const onHamburgerClick = app => {
    if (app.state.isListViewAlongside) {
      app.setState({
        isListViewAlongside: false,
        isListViewOpened: false
      })
    } else {
      if (window.innerWidth >= BREAKPOINT_WIDTH) {
        app.setState({
          isListViewAlongside: true,
          isListViewOpened: true
        }) 
      } else {
        app.setState({
          isListViewOpened: true,
          isMainDarkened: true
        })  
      }
    }
  }

 /**
  * @description Closes list view and stops propagation 
  * if list view opened and viewport not alongside
  * @param {object} event
  * @param {Component} App component
  */
  export const onMainClick = (event, app) => {
    if (!app.state.isListViewAlongside) {
      if (app.state.isListViewOpened) {
        event.stopPropagation()
        app.setState({
          isListViewOpened: false,
          isMainDarkened: false
        })
      }
    }
  }

 /**
  * @description Calls closeListViewIfNotAlongside and setSelectedLocation
  * @param {object} location
  * @param {Component} App component
  */
  export const onInfoWindowOpen = (location, app) => {
    closeListViewIfNotAlongside(app)
    setSelectedLocation(location, app)
  }

 /**
  * @description Closes list view if opened and viewport not alongside
  * @param {Component} App component
  */
  const closeListViewIfNotAlongside = app => {
    if (!app.state.isListViewAlongside) {
      if (app.state.isListViewOpened) {
        app.setState({
          isListViewOpened: false,
          isMainDarkened: false
        })
      }
    }
  } 

 /**
  * @description Sets state of selected location
  * @param {object} location
  * @param {Component} App component
  */
  const setSelectedLocation = (location, app) => {
    app.setState({selectedLocation: location})
  }