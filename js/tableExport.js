

(function(view){
	"use strict";
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var fromCharCode = String.fromCharCode;
	var INVALID_CHARACTER_ERR = ( function() {
        // fabricate a suitable error object
        try {
            document.createElement('$');
        } catch (error) {
            return error;
        }
    }());

	// encoder
	var btoa = function(string) {
	    var a, b, b1, b2, b3, b4, c, i = 0, len = string.length, max = Math.max, result = '';

	    while (i < len) {
	        a = string.charCodeAt(i++) || 0;
	        b = string.charCodeAt(i++) || 0;
	        c = string.charCodeAt(i++) || 0;

	        if (max(a, b, c) > 0xFF) {
	            throw INVALID_CHARACTER_ERR;
	        }

	        b1 = (a >> 2) & 0x3F;
	        b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF);
	        b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3);
	        b4 = c & 0x3F;

	        if (!b) {
	            b3 = b4 = 64;
	        } else if (!c) {
	            b4 = 64;
	        }
	        result += characters.charAt(b1) + characters.charAt(b2) + characters.charAt(b3) + characters.charAt(b4);
	    }
	    return result;
	};

	//获取dom文本
	var getText = function( el ){
		var s = el.textContent || el.innerText;
		return s == null ? "" : s.replace( /^\s*(.*?)\s+$/, "$1");
	};
	view.tableExport = function(tableId, filename, type){
		var doc = view.document,
			table = doc.getElementById(tableId),
			charSet = doc.characterSet

		var uri = {
			json: 'application/json;charset='+charSet,
			txt: 'csv/txt;charset='+charSet,
			csv: 'csv/txt;charset='+charSet,
			doc: 'application/vnd.ms-doc', 
			excel: 'application/vnd.ms-excel',
			xml:'application/xml;charset='+charSet,
		};

		var base64 = function(s) {
        	return btoa(unescape(encodeURIComponent(s)));
    	};
    	var template = function(s, c) {
        	return s.replace(/{(\w+)}/g, function(m, p) {
            	return c[p];
        	});
    	};

    	var	get_blob = function() {
			return view.Blob;
		}

    	var fixCSVField = function(value) {
	        var fixedValue = value;
	        var addQuotes = (value.indexOf(',') !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
	        var replaceDoubleQuotes = (value.indexOf('"') !== -1);

	        if (replaceDoubleQuotes) {
	            fixedValue = fixedValue.replace(/"/g, '""');
	        }
	        if (addQuotes || replaceDoubleQuotes) {
	            fixedValue = '"' + fixedValue + '"';
	        }
	        return fixedValue;
	    };

	    var saveData = function(data){
	    	var BB = get_blob();
	        saveAs(new BB([data], {type: uri[type]}), filename + "."+type);
	    };

		var toCSV = function(){
			var data = "\ufeff";
			for (var i = 0, row; row = table.rows[i]; i++) {
	            for (var j = 0, col; col = row.cells[j]; j++) {
	            	var cel = document.getElementById("table").rows.item(0).cells.length;
	            	if(j<cel-1){
	            		 data = data + (j ? ',' : '') + fixCSVField(getText(col));
	            	}
	               
	            }
	            data = data + "\r\n";
	        }
	        saveData(data);
		};

		var toJson = function(){
			var jsonHeaderArray = [];

			if(table.tHead){
				for(var i =0,col; col = table.tHead.rows[0].cells[i]; i++){
					var cel = document.getElementById("table").rows.item(0).cells.length;
					if(i<cel-1){
						jsonHeaderArray.push(getText(col));
					}
					
				}
			}

			var jsonArray = [];
			if(table.tBodies){
				for(var j=0,tbody; tbody = table.tBodies[j]; j++){
					for(var k =0, rowb; rowb= tbody.rows[k]; k++){
						var len = jsonArray.length;
						jsonArray[len]  = []; 
						for (var g = 0, colb; colb = rowb.cells[g]; g++) {
							var cel = document.getElementById("table").rows.item(0).cells.length;
							if(g<cel-1){
								jsonArray[len].push(getText(colb));
							}
	                		
	            		}
					}
				}
			}

			var jsonExportArray = {
				header: jsonHeaderArray,
				data: jsonArray
			};
			saveData(JSON.stringify(jsonExportArray));
			console.log(JSON.stringify(jsonExportArray));
		};
		
		var toXml=function(){
			var xml = '<?xml version="1.0" encoding="utf-8"?>';
					xml += '<config><list>';
					var m=0;
					var common;
					// Header
						if(table.tHead){
							for(var i =0,col; col = table.tHead.rows[0].cells[i]; i++){
								
								//获取表格的行数
								//var rows = document.getElementById("table").rows.length;
								//获取表格列数
								
								var cel = document.getElementById("table").rows.item(0).cells.length
								
								//console.log(cel)
								
								//除掉最后一列，因为是按钮
								
								if(i<cel-1){
									
									xml+='<field data= "'+m+'" >'+getText(col)+'</field>';
									
									m++;
																	
								}	
							}
						}				


//						if(table.tHead){
//							for(var i =0,col; col = table.tHead.rows[0].cells[i]; i++){
//								
//								
//								var cel = document.getElementById("table").rows.item(0).cells.length
//
//								
//								if(i<cel-1){
//									
//									common=getText(col);	
//																
//								}	
//							}
//						}
									
					xml += '</list><game>';
					
					// Row Vs Column
					var rowCount=1;
					
					
					if(table.tBodies){
						var colCount=0;
						for(var j=0,tbody; tbody = table.tBodies[j]; j++){
							for(var k =0, rowb; rowb= tbody.rows[k]; k++){
								
								for (var g = 0, colb; colb = rowb.cells[g]; g++) {
			                		var cel = document.getElementById("table").rows.item(0).cells.length;
			                		if(g<cel-1){
			                			var col = table.tHead.rows[0].cells[g];
			                			common=getText(col);
			                			xml += "<column-"+colCount+" data='"+common+"' >"+getText(colb)+"</column-"+colCount+">";
			                		}
			                		
			            		}
								colCount++;
							}
							xml += '</game></config>';
						}
					}
					saveData(xml);

		}

		var toOffice = function(){
			var tmpl = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:'+type+'" xmlns="http://www.w3.org/TR/REC-html40">';
			tmpl += '<head><meta charset="'+charSet+'" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>';
			tmpl += '{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->';
  			tmpl += '</head><body><table>{table}</table></body></html>';
			var office = '',
				maph = [['<thead><tr>', '</tr></thead>'], ['<tbody><tr>', '</tr></tbody>'], ['<tr>', '</tr>']],
				mapb = [['<th>', '</th>'],['<td>', '</td>']],
				flag = +!table.tHead,
				com = 1 - flag;

			for(var i=0, row; row = table.rows[i]; i++){
				flag = i > com ? 2 : flag;
				office += maph[flag][0];
				for(var j =0, col; col = row.cells[j]; j++){
					var cel = document.getElementById("table").rows.item(0).cells.length;
					if(j<cel-1){
						office += mapb[+!!flag][0]+ getText(col) +mapb[+!!flag][1];
					}
					
				}
				office += maph[flag][1];
				flag++;
			}
			saveData(template(tmpl, {worksheet: 'Worksheet', table: office}));
		};

		var typeMap = {
			json : toJson,
			txt: toCSV,
			csv: toCSV,
			doc: toOffice,
			docx: toOffice,
			xls: toOffice,
			xlsx: toOffice,
			xml:toXml
		};

		typeMap[type]();
	};

})(window);