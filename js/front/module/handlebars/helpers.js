//handlebars Helper
if(Handlebars){
	Handlebars.registerHelper('compare', function(left, operator, right, options) {
	    if (arguments.length < 3) {
	      throw new Error('Handlerbars Helper "compare" needs 2 parameters');
	    }

	    if (options === undefined) {
	      options = right;
	      right = operator;
	      operator = '===';
	    }

	    var operators = {
	      '==':     function(l, r) {return l == r; },
	      '===':    function(l, r) {return l === r; },
	      '!=':     function(l, r) {return l != r; },
	      '!==':    function(l, r) {return l !== r; },
	      '<':      function(l, r) {return l < r; },
	      '>':      function(l, r) {return l > r; },
	      '<=':     function(l, r) {return l <= r; },
	      '>=':     function(l, r) {return l >= r; },
	      'typeof': function(l, r) {return typeof l == r; }
	    };

	    if (!operators[operator]) {
	      throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
	    }

	    var result = operators[operator](left, right);

	    if (result) {
	      return options.fn(this);
	    } else {
	      return options.inverse(this);
	    }
	});

	//千分位分割
	Handlebars.registerHelper('formatnumber', function(num, options){
		num = num + '';
		return num.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1');
	});

	//数据增长格式，根据正数、负数、-，返回不同内容
	Handlebars.registerHelper('formatincrease', function(num, options){
		if(num == '-'){
			return '<span class="jiantou_up"></span> -';
		}
		else{
			num = parseFloat(num);
			if(num >= 0){
				return '<span class="jiantou_up"></span> '+num+'%';
			}
			else{
				return '<span class="jiantou_down"></span> '+Math.abs(num)+'%';
			}
		}
	});

	//转化时间：x秒---x时x分x秒
	Handlebars.registerHelper('parsetime', function(s, options){
		s = parseInt(s);
		if(s<=0){
			return '超时';
		}
		var result = {};
    	result.h = parseInt(s/3600);
    	var t1 = s%3600;
    	result.m = parseInt(t1/60);
    	result.s = t1%60;
    	for(i in result){
    		if(result[i]<10){
    			result[i] = '0'+result[i];
    		}
    	}
    	return result.h+':'+result.m+':'+result.s;
	});

	//获取图片缩略图路径，用于报告中的截图
	Handlebars.registerHelper('thumb', function(url, options){
		if(!url){
			return false;
		}
		return url.replace('qhimg.com', 'qhimg.com\/dm\/162_288_80');
	});

	//判断是否是奇数
	Handlebars.registerHelper('if_odd', function(conditional, options) {
		if((conditional % 2) == 0) {
			return options.inverse(this);
		} else {
			return options.fn(this);
		}
	});

	//格式化日期，去掉时间，2014-12-03 12:02:15 为 2014-12-03
	Handlebars.registerHelper('parsedate', function(d, options){
		return d.split(' ')[0];
	});
}