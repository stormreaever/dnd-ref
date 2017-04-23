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
        "title": "Armor", 
        "url": "/category/armor", 
        "pageId": "armor"
      },
      {
        "title": "Weapons", 
        "url": "/category/weapons", 
        "pageId": "weapons"
      },
      {
        "title": "Spells", 
        "url": "/category/spells", 
        "pageId": "spells"
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