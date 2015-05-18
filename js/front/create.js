var zhongchou = {};
zhongchou.create = {
	initPage : function(){
		//初始化上传首屏图片
		this.uploadImg({
			server : 'php/upload.php',
			pick : '#filePicker1',
			multiple : false, //允许上传一张
			thumbWidth : 400,
			thumbHeight : 220,
			success : function(data){
				$('#indeximg').val(data);
			}
		});

		//初始化上传移动端图片
		this.uploadImg({
			server : 'php/upload.php',
			pick : '#filePicker2',
			multiple : false, //允许上传一张
			thumbWidth : 600,
			thumbHeight : 288,
			success : function(data){
				$('#mobileimg').val(data);
			}
		});

		//初始化校验
		this.valid();

		//初始化textarea输入限制
		this.limitTextarea();

		//初始化省市联动菜单
		new PCAS('area1','area2', 1000, 1007);

		this.initListeners();
	},
	valid : function(){
		validObj = $('.validform').Validform({
			btnSubmit:"#submitform", 
			tiptype : 3,
			tipmsg : {
				r : "&nbsp;"
			},
			datatype : {
				ceilnum : function(gets, obj){
					if(gets == 0){
						return true;
					}
					if(!$.isNumeric(gets)){
						return false;
					}
					var money = $('.money').val();
					if(money){
						return gets>=parseInt(money);
					}
				},
				daynum : function(gets, obj){
					var num = parseInt(gets);
					return num == gets && num>0 && num<91;
				}
			},
			showAllError : true
		});
		validObj.tipmsg.r="&nbsp;";
	},
	limitTextarea : function(){
		$('.limit').limitTextarea({
			maxNumber:140
		});
	},
	uploadImg : function(config){
		var uploader = WebUploader.create({
		    auto: config.auto || true,
		    swf: 'module/webuploader-0.1.5/Uploader.swf',
		    // 文件接收服务端。
		    server: config.server,
		    pick: {
		    	id : config.pick,
		    	multiple : config.multiple
		    },
		    accept: {
		        title: 'Images',
		        extensions: 'gif,jpg,jpeg,png',
		        mimeTypes: 'image/*'
		    }
		});
		uploader.on( 'fileQueued', function( file ) {
			$list = $(config.pick).nextAll('.uploader-list');
		    var $li = $(
		            '<div id="' + file.id + '" class="file-item thumbnail">' +
		                '<img>' +
		            '</div>'
		            );
		    if(config.single){
		    	$list.html('');	
		    }
		    $list.append( $li );

		});
		uploader.on( 'uploadProgress', function( file, percentage ) {
		    var $li = $( '#'+file.id ),
		        $percent = $li.find('.upprogress .upprogressbar'),
		        container = $li.find('.upprogress');

		    // 避免重复创建
		    if ( !$percent.length ) {
		        $percent = $('<div class="upprogress"><div class="upprogresswrap"><span class="upprogressbar"></span></div><span class="progresstext">正在上传</span></div>')
		                .prependTo( $li )
		                .find('.upprogressbar');
		    }

		    container.addClass('uping');
		    $percent.css( 'width', percentage * 100 + '%' );
		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on( 'uploadSuccess', function( file, obj ) {
			console.log(arguments);
			var $li = $( '#'+file.id ),
				container = $li.find('.upprogress'),
				$img = $li.find('img');
		    container.removeClass('uping').addClass('upsucc');
		    $li.find('.progresstext').text('上传成功');
		    // 创建缩略图
		    uploader.makeThumb( file, function( error, src ) {
		        if ( error ) {
		            $img.replaceWith('<span>不能预览</span>');
		            return;
		        }

		        $img.attr( 'src', src );
		    }, config.thumbWidth, config.thumbHeight );
		    if(config.success && $.isFunction(config.success)){
		    	config.success(obj._raw);
		    }
		});

		// 文件上传失败，显示上传出错。
		uploader.on( 'uploadError', function( file ) {
		    var $li = $( '#'+file.id ),
				container = $li.find('.upprogress');
		    container.removeClass('uping').addClass('upfail');
		    $li.find('progresstext').text('上传失败');
		});
	},
	initListeners : function(){

	}
};