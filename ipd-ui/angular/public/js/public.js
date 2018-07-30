/*
 * author: wangwenjing
 */

angular.module('public', [])
.directive('sideMenu', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      scope.$on('ngRepeatFinished', function(event, eventElem){
        event.stopPropagation(); //防止无限制向上传递，处理后及时stop
        elem.parent().metisMenu();
      });
    }
  };
}])
.directive('navMini', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      // 菜单切换
    	elem.bind('click', function(){
    		$("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    	});
    }
  };
}])
.directive('onFinishRender', [function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      if (scope.$last === true) {
        scope.$emit('ngRepeatFinished', elem.parent());
      }
    }
  };
}])
.directive('searchData', [function(){
  return {
    restrict: 'A',
    transclude: true,
    template: '<div class="search_wrapper"></div>',
    link: function(scope, elem, attrs, ctrl, transclude){
      elem.find('.search_wrapper').append(transclude());
      /*根据最大可选日期和最大选择范围判断开始时间
       * maxLength， 以m分， h小时，d天开头，加上数字范围
       */
      function getMaxStart(maxLength, maxEnd){
        var maxStart;
        switch(maxLength.charAt(0)){
          case "m":
            maxStart = 1000 * 60 * ( maxLength.slice(1) - 0);
            break;
          case "h":
            maxStart = 1000 * 60 * 60 * (maxLength.slice(1) - 0);
            break;
          case "d":
            maxStart = 1000 * 60 * 60 *24 * (maxLength.slice(1) - 0);
        };
        return maxEnd.getTime() - maxStart;
      }
      /*
       * 日期改变时候检查开始和结束日期大小关系关联两项
       * 范围在设定日期时已经选择过，不做outOfRange处理
       */
      function checkStartEnd(start, end, source){
        var changeObj, stayObj;
        changeObj = source == 'start' ? start : end;
        stayObj = source == 'start' ? end : start;
        if(start.val() > end.val()){
          alert("开始时间不能大于结束时间");
          changeObj.val(stayObj.val());
          changeObj.datetimepicker('update');
        }
      }
      /*
       * 匹配出两个日期对儿，开始日期元素，结束日期元素，时间范围和最大日期
       */
      function timePair(start, end, maxLength, maxEnd){
        var maxEnd = (maxEnd || new Date());
        var maxStart = new Date(getMaxStart(maxLength, maxEnd)); 
        start.datetimepicker({
          format: 'hh:ii',
          startDate: maxStart,
          endDate: maxEnd,
          initialDate: maxStart,
          startView: 'hour',
          minuteStep: 5,
          autoclose: true
        })
        .on('changeDate', function(ev){
          checkStartEnd(start, end, 'start');
        });
        end.datetimepicker({
          format: 'hh:ii',
          startDate: maxStart,
          endDate: maxEnd,
          initialDate: maxEnd,
          startView: 'hour',
          minuteStep: 5,
          autoclose: true
        })
        .on('changeDate', function(ev){
          checkStartEnd(start, end, 'end');
        });
      }

      if(elem.find('form[hasTimepicker]').length > 0){
        var start = elem.find('.startTimepicker').eq(0);
        var end = elem.find('.endTimepicker').eq(0);
        var maxLength = 'h1';
        timePair(start, end, 'h1');
      }
      scope.$on('searchGo', function(event){
        //本指令未做任何动作，查询操作请在作用域中完成
      });
    }
  };
}])
.service('tabeleForAngular', [function(){ //在页面中有了dataTable后开始
  return {
    /*
     * saveObj: dataTable实例存放的变量名,注意有的页面中有两个dataTable不要覆盖；
     * elemObj: 初始化dataTable的页面dom元素；
     * dataTableObj: dataTable实例化的对象，公用部分在此方法设置default
     */
    init: function(saveObj, elemObj, dataTableObj, sys, app){ 
      var opt = {
        "destroy": true,
        // "pageSize": 10,
        // "pageIndex": 0,
        "bInfo":true,
        "bPaginate":true, 
        "bServerSide": false,        
        "bSort": false,
        "iDisplayLength": 10,
        "bLengthChange": true,
        // "sPaginationType": "full_numbers",
        "dom": 'C<"top">rt<"bottom"lip><"clear">',
        "language": {
           "sProcessing": "处理中...",
           "sLengthMenu": "每页显示 _MENU_ 条",
           "sZeroRecords": "没有匹配结果",
           "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
           "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
           "sEmptyTable": "表中数据为空",
           "sLoadingRecords": "载入中...",
           "oPaginate": {
               "sFirst": "首页",
               "sPrevious": "上页",
               "sNext": "下页",
               "sLast": "末页"
           },
           "oAria": {
               "sSortAscending": ": 以升序排列此列",
               "sSortDescending": ": 以降序排列此列"
           }
        },
        "initComplete": function () {
            var api = this.api();
            console.log('系统：' + sys + '\n应用：' + app);
        }
      };
      dataTableObj = $.extend({}, opt, dataTableObj);
      saveObj = elemObj.DataTable(dataTableObj);
      return saveObj;
    }
  };
}])
.service('eChartForAngular', ['$timeout', '$http', 'getProperty', function($timeout, $http, getProperty){
  return {
    initLine: function(saveObj, elemId, eChartTitle, eChartLegend, xAxisData, series, extra){
      var opt = {
            title : {
                text: eChartTitle
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data: eChartLegend
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : xAxisData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : series
          }

      opt = $.extend({}, opt, extra);
      if(saveObj == null){
        saveObj = echarts.init(document.getElementById(elemId));
      }else{
        saveObj.clear();
      }
      saveObj.setOption(opt);
      return saveObj;
    },
    initPie: function(saveObj, elemId, eChartTitle, eChartLegend, xAxisData, series, extra){
      var opt = {
            title : {
                text: eChartTitle,
                x:'center'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data: eChartLegend
            },
            calculable : true,
            series : [
                {
                    name: eChartTitle,
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: series
                }
            ]
        };
        opt = $.extend({}, opt, extra);
        if(saveObj == null){
          saveObj = echarts.init(document.getElementById(elemId));
        }else{
          saveObj.clear();
        }
        saveObj.setOption(opt);
        return saveObj;          
    }
  };
}])
.service('compileHtml', ['$compile', function($compile){
  return {
    getCompiledHtml: function(str, $scope){
      var compiled = $compile(str)($scope);
      var html = '';
      for(var i = 0; i < compiled.length; i++){
        html += compiled[i].outerHTML || '';
      };
      return html;
    }
  };
}])
.service('getProperty', [function(){
  return function getProperty(obj, prop){
    var propArr = prop.split(".");
    for(var i = 0; i < propArr.length; i++){
      obj = obj[propArr[i]];
      if(obj === undefined){ return undefined; }
    }
    return obj;
  }
}])
.service('peityChange', ['$timeout', '$http', 'getProperty', function($timeout, $http, getProperty){
  return {
    setPeityDynamic: function(objPeity, url, data, prop){
      $timeout(function(){
        $http.get(url, {data: data}).then(function(data){
          data = data.data;
          arr = getProperty(data, prop);
          objPeity.text(arr.join(',')).change();
        });
      }, 1000);
    },
    peityChange: function(objPeity, arr){
      objPeity.text(arr.join(',')).change();
    }
  };
}])
