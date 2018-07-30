/*
 * wangwenjing
 */
"use strict";
angular.module('app.menu', ['app.auth'])
/*
 * not template, 因为是异步
 * not templateUrl 因为异步是json，需要html
 * 自己生产html片段，以及$scope，使用$compile服务编译并绑定scope
 */
.directive('menuList', ['APP_CONFIG', '$rootScope', '$compile', '$http', function(APP_CONFIG, $rootScope, $compile, $http){
    return {
      restrict: 'A',
      compile: function(element, attrs){
        function createItem(item, parent, level){
          if(item.title === 'line'){
            parent.append('<li class="line dk"></li>');
            return; 
          }

          var ulLevel = {
            1: "nav",
            2: "nav nav-second-level",
            3: "nav nav-third-level"
          };

          var li = $('<li />' ,{'ui-sref-active': "active"})
          var a =  level == 1 ? $('<a />') : $('<a />', {'class': "J_menuItem"});
          var i = $('<i />');

          li.append(a);

          if(item.sref)
              a.attr('ui-sref', item.sref);
          if(item.href)
              a.attr('href', item.href);
          if(item.icon){
              i.attr('class', 'fa fa-'+item.icon);
              a.append(i);
          }
          if(item.title){
              a.attr('title', item.title);
              if(level == 1 || level == 2){
                  a.append(' <span class="nav-label">' + item.title + '</span>');
              } else {
                  a.append(' ' + item.title);
              }
          }

          if(item.items){
              a.append('<span class="fa arrow"></span>');
              var ul = $('<ul />', {'class': ulLevel[level]});
              li.append(ul);
              item.items.forEach(function(child) {
                  createItem(child, ul, level+1);
              })
          } 

          parent.append(li); 
        }
        $http.get(APP_CONFIG.menuListUrl).then(function(res){
          var ul = $('<ul />', {
                'class':  "nav",
                'id': "side-menu",
                'smart-menu': ''
              });

          ul.append('<li class="nav-header">' +
                        '<div class="dropdown profile-element">' +
                            '<a data-toggle="dropdown" class="dropdown-toggle" href="#">' +
                                '<span class="clear">' +
                                    '<span class="block m-t-xs" style="font-size:20px;">' +

                                        '<i class="logo-img"></i>' +

                                        '<strong class="font-bold">IPD-UI</strong>' +
                                    '</span>' +
                                '</span>' +
                            '</a>' +
                        '</div>' +
                        '<div class="logo-element">IPD-UI</div>' +
                    '</li>'
                    );

          res.data.items.forEach(function(item) {
              createItem(item, ul, 1);
          });
          
          var $scope = $rootScope.$new();
          var html = $('<div>', {'class': "sidebar-collapse"}).append(ul).html(); 
          var linkingFunction = $compile(html);
          var _element = linkingFunction($scope);
          
          element.html(_element);  
        });
      }
    };
}])
.directive('smartMenu', [function () {
  return {
    restrict: 'A',
    compile: function (element, attrs) {
      element.metisMenu();
      element.children('li').click(function () {
        if ($('body').hasClass('mini-navbar')) {
            NavToggle();
        }
      });
      function NavToggle() {
          $('.navbar-minimalize').click();
      }
    }
  };
}])
.directive('menuRole', ['authService', function(authService){
  return {
    restrict: 'A',
    link: function(scope){
      scope.role = authService.role;
    }
  };
}]);
