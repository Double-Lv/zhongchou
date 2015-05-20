var zhongchou = {};
zhongchou.create = {
	initPage : function(){
		//初始化上传首屏图片
		this.uploadResource({
			server : 'php/upload.php',
			pick : '#filePicker1',
			multiple : false,
			thumbWidth : 400,
			thumbHeight : 220,
			success : function(data){
				$('#indeximg').val(data);
			}
		});

		//初始化上传移动端图片
		this.uploadResource({
			server : 'php/upload.php',
			pick : '#filePicker2',
			multiple : false,
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
	//初始化步骤二，回报设置
	initStep2Page : function(){
		//初始化上传说明图片
		this.uploadResource({
			server : 'php/upload.php',
			pick : '#filePicker1',
			multiple : false,
			thumbWidth : 120,
			thumbHeight : 120,
			success : function(data){
				$('#descimg').val(data);
			}
		});

		//初始化输入框限制
		$('.limit').limitTextarea({
			maxNumber:200
		});

		//初始化校验
		this.valid();

		this.initListeners();
	},
	//初始化步骤三，信息确认
	initStep3Page : function(){
		this.valid(null);
		this.initListeners();
	},
	valid : function(selector, beforeSubmitFunc){
		var form = selector ? $(selector) : $('.validform');
		validObj = form.Validform({
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
					return num == gets && num>9 && num<91;
				},
				confirmcardnumber : function(gets, obj){
					if(gets == ''){return false;}
					var num1 = $('.cardnumber1').val();
					var num2 = $('.cardnumber2').val();
					return num1 == num2;
				}
			},
			showAllError : true,
			beforeSubmit : function(){
				if($('.valid_error').length>0){
					return false;
				}
				if(beforeSubmitFunc && typeof beforeSubmitFunc == 'function'){
					return beforeSubmitFunc();
				}
			}
		});
		validObj.tipmsg.r="&nbsp;";
	},
	limitTextarea : function(){
		$('.limit').limitTextarea({
			maxNumber:140
		});
	},
	uploadResource : function(config, type){
		var conf = {
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
		    },
		    formData : {
		    	token : $('#token').val()
		    }
		};
		if(type == 'doc'){
			conf.accept = {
				title: 'Doc',
				extensions: 'doc,docx,pdf'
			}
		}
		var uploader = WebUploader.create(conf);
		uploader.on( 'fileQueued', function( file ) {
			$list = $(config.pick).nextAll('.uploader-list');
		    var $li = $(
		            '<div id="' + file.id + '" class="file-item thumbnail">' +
		            	'<div class="imgoptbar"><a href="javascript:void(0);" class="delimg"></a></div>' +
		                '<img>' +
		            '</div>'
		            );
		    if(!config.multiple){
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
			var $li = $( '#'+file.id ),
				container = $li.find('.upprogress'),
				$img = $li.find('img');
		    container.removeClass('uping').addClass('upsucc');
		    $li.find('.progresstext').text('上传成功');
		    $li.data('url', obj._raw); //记录返回数据
		    // 创建缩略图
		    //如果是上传文档，设置预览图
	        if(type == 'doc'){
	        	$img.attr('src', 'images/front/create/defaultdoc.png').css({width:'162px', height:'105px'});
	        }
	        else{
	        	uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }
			        $img.attr( 'src', src );
			    }, config.thumbWidth, config.thumbHeight );
	        }

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
		var _this = this;
		//选择项目类型
		$('.category .cateitem').click(function(){
			$(this).closest('.category').find('.checked').removeClass('checked');
			$(this).addClass('checked');
			$('#projecttype').val($(this).data('value'));
		});
		//删除已上传图片
		$(document.body).on('click', '.delimg', function(){
			var $this = $(this);
			var input = $this.closest('.uppanel').find('input[type="hidden"]');
			var uppanel = $this.closest('.uppanel');
			//删除元素
			$this.closest('.file-item').remove();
			//为表单重新赋值
			var newval = [];
			uppanel.find('.file-item').each(function(){
				newval.push($(this).data('url'));
			});
			input.val(newval.join(','));
		});

		//点击添加回报
		$(document.body).on('click', '.addpayback', function(){
			var source   = $("#formtpl").html();
			var template = Handlebars.compile(source);
			var html = template({});
			box = $.popbox({
				title : '回报设置',
				width : '800px',
				maxHeight : '700px',
				padding : '0 20px 20px',
				showBtn : false,
				contentSelector : '#formtpl',
				onOpen : function(){
					_this.valid('.pb_panel .validform');
					//初始化上传说明图片
					_this.uploadResource({
						server : 'php/upload.php',
						pick : '.pb_panel #filePicker1',
						multiple : false,
						thumbWidth : 120,
						thumbHeight : 120,
						success : function(data){
							$('.pb_panel #descimg').val(data);
						}
					});

					//初始化输入框限制
					$('.pb_panel .limit').limitTextarea({
						maxNumber:200
					});
				}
			});
		});

		//回报设置，关闭弹出form
		$(document.body).on('click', '.canceldata', function(){
			$(this).closest('form')[0].reset();
			validObj.resetForm();
			$('.Validform_checktip').html('');
			if(typeof box != 'undefined'){
				box.close();
			}
		});

		//删除回报
		$(document.body).on('click', '.deletepayback', function(){
			var item = $(this).closest('.paybackitem');
			$.popbox({
				title : '提示信息',
				width : 360,
				content : '确认删除吗？',
				onOk : function(){
					$.ajax({
						url : '',
						data : {id : item.data('id')},
						success : function(data){
							item.remove();
						}
					});
				}
			});
		});

		//选择已有银行卡
		$(document.body).on('change', '.cardlist .checkcard', function(){
			$('.cardlist .checked').removeClass('checked');
			$(this).closest('.carditem').addClass('checked');
		});

		//确认信息页面，保存草稿
		$('#saveconfirmform').click(function(){
			var formData = $('.validform').serialize();
			$.ajax({
				url : '',
				data : formData,
				success : function(data){
					history.go(0);
				}
			});
		});
	},

};