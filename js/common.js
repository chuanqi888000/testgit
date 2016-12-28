$(function(){
	$(".pageDiv").createPage({
        pageCount:19,//总页数
        current:1,//当前页
        turndown:'true',//是否显示跳转框，显示为true，不现实为false,一定记得加上引号...
        backFn:function(p){
            console.log(p);
        }
   });	
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
//       $(".investment_title").find("div").each(function(i,dom){
//       	if(dom.innerHTML=="往期赛事房间"){
//       		console.log(1)
//       	}
//       
//       })
         if($(this).text()=="往期赛事房间"){
         	$.ajax({
         		type:"get",
         		url:"",
         		async:true,
         		dataType:"json",
         		success:function(data){
         			
         		},
         		Error:function(){
         			alert("请求数据失败")
         		}
         	});
         }
    });
     }
  tabs(".investment_title","on",".investment_con");
  var n=3;
  var m=1;
  var k=1
     /*参赛条件 */
    $(document).on("click",".btn",function(){
    	
	  	if($(this).prev().attr("type")){
	    	html='<select class="sel2" style="margin-top:20px;">'+
	           	      '<option>免费</option>'+
	           	      '<option>乐豆</option>'+
	           	      '<option>道具</option>'+
	           	      '<option>参赛券</option>'+
	           '</select><input type="text" class="inp3 inp4" style="margin-top:20px;">'
	           $(html).insertBefore($(this));
	           $("select").css({"background":"#e1e1e1"});	  		
	  	}else if($(this).attr("title")=="cj"){
	  		n++;
	  		html1='<span style="opacity:0;filter:alpha(opacity=0);margin-top:20px;">奖池信息:</span>'+n+'<select class="sel2" style="margin-top:20px;">'+
           	      '<option>抽奖券</option>'+
           	      '<option>乐豆</option>'+
           	      '<option>话费</option>'+
           	      '<option>流量</option>'+
           	      '<option>兑换券</option>'+
           	      '<option>参赛券</option>'+
           	      '<option>补签卡</option>'+
           	      '<option>谢谢惠顾</option>'+
           	      '<option>蓝色轿车</option>'+
           	      '<option>红色保时捷</option>'+
           	      '<option>金色劳斯莱斯</option>'+
           '</select><input type="text" class="inp3 inp4"><input type="text" class="inp3 inp4" style="margin-top:20px;"><input type="text" class="inp3 inp4" style="margin-top:20px;"><br><br>'
           $(html1).insertBefore($(this));
            $("select").css({"background":"#e1e1e1"});
	  	}else{
	  		n++;
	  		html1='<span style="opacity:0;filter:alpha(opacity=0);margin-top:20px;">奖励:</span>第'+n+'名:<select class="sel2" style="margin-top:20px;">'+
           	      '<option>免费</option>'+
           	      '<option>乐豆</option>'+
           	      '<option>道具</option>'+
           	      '<option>参赛券</option>'+
           '</select><input type="text" class="inp3 inp4" style="margin-top:20px;"><input type="button" value="+" class="btn" style="margin-top:20px;"><br><br>'
           $(html1).insertBefore($(this));
            $("select").css({"background":"#e1e1e1"});	  		
	  		
	  	}

    })
	$(document).on("click",".btn2",function(){
		k++
		html2='<input type="text" class="inp5 inp7" number="'+k+'" style="margin-top:20px;">'
		$(html2).insertBefore($(this));
		$("select").css({"background":"#e1e1e1"});
		if($(this).attr("data")){
			m++;
			html3='<span style="opacity:0;filter:alpha(opacity=0)"> 房间排序:</span><span class="num">'+m+'</span><input type="text" class="inp5 inp6" number="'+k+'"><br><br>';
			$(html3).insertBefore($("#ts"));
		}
        kb();

	})
    $("select").css({"background":"#e1e1e1"});
    
    /*输入框变字*/
   function kb(){
      $(".inp7").blur(function(){
    	console.log(1);
    	console.log($(this).attr("number"))
	   	if($(".inp6").each(function(i,dom){i+1==$(this).attr("number")})){
	   		console.log(2)
	   		var kn=$(this).attr("number");
	   		console.log(kn)
	   		$('input[number="'+kn+'"]').val($(this).val());
	   	}  	
 	  })	
   };

   kb();
   	
   /* 表格输出类型*/
	var $exportLink = document.getElementById('export');

	$exportLink.addEventListener('click', function(e){

		e.preventDefault();

		if(e.target.nodeName === "A"){

			tableExport('table', '数据', e.target.getAttribute('data-type'));

		}

	}, false);
	/*弹出窗*/
	$(document).on("click",".btn4",function(){
		$("#tc").css({"display":"block"});
		var a1=$(this).parent().parent().children().eq(0).html();
		var a2=$(this).parent().parent().children().eq(1).html();
		var a3=$(this).parent().parent().children().eq(2).html();
		var a4=$(this).parent().parent().children().eq(3).html();
		var a5=$(this).parent().parent().children().eq(4).html();
		var a6=$(this).parent().parent().children().eq(5).html();
		var a7=$(this).parent().parent().children().eq(6).html();
		
		var a=[a1,a2,a3,a4,a5,a6,a7];
		for(var i=1;i<=a.length;i++){
			$("#xq"+i+"").val(a[i-1]);
		}
		
		
	})
	
	$(document).on("click",".btn5",function(){
		$(this).parent().parent().remove();
	})
	
	$("#gb").click(function(){
		$("#tc").hide();
	})
	$("#bt2").click(function(){
		$("#tc").hide();
	});
    $(document).on("click",".btnn",function(){
    	

	    	html='<input type="text" class="inp3 inp4">'
	           $(html).insertBefore($(this));
	           $("select").css({"background":"#e1e1e1"});	  		


    })
    
    /*选择select*/
   $(".sel").change(function(){
	   	if($(this).val()=="自定义天数" || $(this).val()=="自定义几轮几局"){
	   		$(this).next().show();
	   	}else{
	   		$(this).next().hide();
	   	}
   	
   })
   
  
   $(document).on("click","#qd_btn",function(){
   	    if($(this).attr("data")=="1"){
	   		var html='<select class="sel2" style="margin-top:20px;">'+
	           	      '<option>3日宝箱</option>'+
	           	      '<option>5日宝箱</option>'+
	           	      '<option>7日宝箱</option>'+
	           	      '<option>15日宝箱</option>'+
	           	      '<option>全勤宝箱</option>'+
	            '</select><input type="text" class="inp3 inp4" style="margin-top:20px;">' ;
	            $(html).insertBefore($(this));
	            $("select").css({"background":"#e1e1e1"});   	    	
   	    }else{
		   		var html1='<select class="sel2" style="margin-top:20px;">'+
	           	    '<option>乐豆</option>'+
	           	    '<option>抽奖券</option>'+
	           	    '<option>兑换券</option>'+
	           	    '<option>参赛券</option>'+
	           	    '<option>补签卡</option>'+
	           	    '<option>流量</option>'+
	           	    '<option>话费</option>'+
	            '</select><input type="text" class="inp3 inp4" style="margin-top:20px;"><input type="text" class="inp3 inp4" style="margin-top:20px;">' ;
	            $(html1).insertBefore($(this));
	            $("select").css({"background":"#e1e1e1"}); 
   	    }
	
   })
   
  /*select变化*/ 
   $("select").change(function(){
   		
   		if($(this).next().attr("type")){
   			return;
   		}else{
   			$(this).css("margin-bottom","18px");
   		}
   });
// $("select").css("margin-bottom","18px")
   
   
   //改变某种
 })