app.component('nav', {
  templateUrl: 'views/nav.html',
  controller: ['$routeParams', function GreetUserController($routeParams) {
    this.nav = [
      {
        "title": "All", 
        "url": "/", 
        "pageId": "main"
      },
      {
        "title": "Armour", 
        "url": "/category/armour", 
        "pageId": "armour"
      },
      {
        "title": "Weapons", 
        "url": "/category/weapons", 
        "pageId": "weapons"
      }
    ];
    this.getSelected = function(item) {
      let currentPage = "main";
      if (typeof $routeParams.category !== 'undefined') {
        currentPage = $routeParams.category;
      } 
      if (item.pageId == currentPage) {
        // this nav item is for the current page
        return 'selected';
      } else {
        return;
      }
    };
  }]
});