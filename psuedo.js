// Psuedo Code For Online

// The online version will merely be a visualization tool

  // It will allow you to see all of your connections, contact them,
  // see their info

    // IT WILL NOT HAVE: editing functionality, creating a new user,
    // creating a new connection, deleting connections

    // ** the idea of this app is to be a partner we application for the iphone app,
    // meant only to allow you to log in, mark as contacted, and view connections


// SO...
  // We will use a react-router to navigate between the authView (login) and the home-view
    // Check session to see if logged, otherwise login page

  // Home view will be very similar. It will make an API call upon mount and create a
  // Nice visual of all the connections (maybe with more data dislayed as there is more room)

    // The urgencies and days and sorting will be calculated with the already made functions

    // The mark as contacted button will be exactly that, just a button that resets that contact

    // The view page will just be a modal that pops up the necissary information


// COMPONENTS

  // AuthView (also a route)
    // LoginForm

  // HomeView (also a route)
    // TopBar (allows you to sign-out and branding)
    // MainList
      // ConnectionItem
        // ItemInfo
        // ConnectionUrgency
      // ** onClick ==>
          // Opens up modal with all the connection's info
