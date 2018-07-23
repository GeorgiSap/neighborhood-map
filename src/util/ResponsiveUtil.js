  export const setViewStateOnMount = (app) => {
    let isListViewAlongside = window.innerWidth >= 600
    app.setState({
      isListViewAlongside: isListViewAlongside,
      isListViewOpened: isListViewAlongside
    })
  }

  export const setViewStateOnResize = (app) => {
    window.addEventListener('resize', () => {
      let isListViewAlongside = window.innerWidth >= 600
      app.setState({
        isListViewAlongside: isListViewAlongside,
        isListViewOpened: isListViewAlongside,
        isMainDarkened: false
      })
    })
  }

  export const onHamburgerClick = (app) => {
    if (app.state.isListViewAlongside) {
      app.setState({
        isListViewAlongside: false,
        isListViewOpened: false
      })
    } else {
      if (window.innerWidth >= 600) {
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

  export const onInfoWindowOpen = (location, app) => {
    if (!app.state.isListViewAlongside) {
      if (app.state.isListViewOpened) {
        app.setState({
          isListViewOpened: false,
          isMainDarkened: false
        })
      }
    }

    app.setState({selectedLocation: location})
  }