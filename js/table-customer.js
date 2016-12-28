$(function(){
		
    /*tab标签切换*/
    function tabs(tabTit,on,tabCon){
	$(tabCon).each(function(){
	  $(this).children().eq(0).show();
	 
	  });
	$(tabTit).each(function(){
	  $(this).children().eq(0).addClass(on);
	  });
     $(tabTit).children().click(function(){
        $(this).addClass(on).siblings().removeClass(on);
         var index = $(tabTit).children().index(this);
         $(tabCon).children().eq(index).show().siblings().hide();

    });
     }
  tabs(".investment_title","on",".investment_con");
  
  /*搜索跳转*/
	$(document).on("click","#search",function(){
	 	var ID=$("#search_id").val();
	 	$.ajax({
	 		type:"post",
	 		url:"",
	 		data:ID,
	 		async:true,
	 		dataType:"json",
	 		success:function(data){
	 			
	 		}
	 	});
	 })
	 
	 
	$(document).on("click","#search_check",function(){ 
	 	$(this).prev().removeAttr("readonly");
	 	$(this).prev()[0].focus();
	 })
	 
	 $(document).on("click","#search_check1",function(){ 
	  	if($(this).val()=="加入黑名单"){
	  		$(this).val("移出黑名单");
	  	}else{
	  		$(this).val("加入黑名单");
	  	}
	 	
	})
    $(document).on("click",".btnn",function(){
    	

	    	var html='<input type="text" class="inp3 inp4">'
	            $(html).insertBefore($(this));
	            $("select").css({"background":"#e1e1e1"});	  		


    })
    $(document).on("click","#search",function(){
    	
      	  	var html1=''+
        '<h2>用户基本信息</h2>'+
        '<div class="search_news">'+
        	'<span>昵称:</span><input type="text" value="哈哈哈" id="search_name"  readonly="readonly">'+
        	'<input type="button" value="修改" class="sel3" id="search_check"/><input type="button" value="加入黑名单" class="sel3" id="search_check1"/>'+
        	
        '</div>'+
        '<div class="search_news">'+
        	'<span>ID:</span><span>823829</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>绑定手机号:</span><input type="text" value="188888888888" id="search_name"  readonly="readonly">'+
        	'<input type="button" value="修改" class="sel3" id="search_check"/>'+
        	
        '</div>'+
 
        '<div class="search_news">'+
        	'<span>用户账号:</span><span>123456</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>注册时间:</span><span>2016-10-12 10:14</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>ip段:</span><span>123456</span>'+
        '</div>'+
		'<h2>用户游戏信息</h2>'+
        '<div class="search_news">'+
        	'<span>用户对局流水:</span><span>123456</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>用户等级:</span><span>123456</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>乐豆数量:</span><span>123456</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>用户背包道具信息数量:</span><input type="text" value="888" id="search_name"  readonly="readonly">'+
        	'<input type="button" value="修改" class="sel3" id="search_check"/>'+
        	
        '</div>'  +      
        
        '<div class="search_news">'+
        	'<span>用户道具增减:</span><span>123456</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>使用信息:</span><span>123456</span>'+
        '</div>'+
        '<div class="search_news">'+
        	'<span>乐豆流向:</span><span>123456</span>'+
        '</div>'+        
        '<div class="search_news">'+
        	'<span>配桌信息:</span><span>123456</span>'+
        '</div> '     +    
        '<div class="search_news">'+
        	'<span>时间段内胜负情况及概率:</span><input type="text" class="sj" onclick="$(this).calendar()">—<input type="text" class="sj" onclick="$(this).calendar()"><br><br>'+
        '</div> '+
		'<h2>游戏活动信息</h2>'+
        '<div class="search_news">'+
        	'<span>活动时间:</span><span>123456</span>'+
        '</div> '  +     
        '<div class="search_news">'+
        	'<span>活动奖励:</span><span>123456</span>'+
        '</div> '     +    
        '<div class="search_news">'+
        	'<span>活动规则:</span><span>123456</span>'+
        '</div>'+
    	'<input type="button" value="提交" class="sel1" id="search_con">'+
        '<input type="button" value="返回" class="sel1" id="return">'
		$("#search_switch").html(html1);

    })
    $(document).on("click","#return",function(){
    	

	    	var html1=''+
	    	'<div class="kh_sy"><span>输入用户ID:</span><input type="text" class="inp1" id="search_id"></div><br><br>'+
	    	'<div class="kh_sy">'+
		    	'<input type="button" value="搜索" class="sel1" id="search">'+
	        '</div>'
			$("#search_switch").html(html1);

    })  
})