(function($){

	function createModal() {
		$('#results').remove();
		var popup =  '<div id="results" class="modal fade text-center" role="dialog">';
				popup += '<div class="modal-dialog">';
					popup += '<div class="modal-content">';
						popup += '<div class="modal-header" style="border:none">';
						popup += '<button type="button" class="close" data-dismiss="modal">';
						popup += '<span style="">&times;</span>';
						popup += '</button>';
						popup += '</div>';
						popup += '<div class="modal-body" id="modal-body">';
						popup += '</div>';
					popup += '</div>';
				popup += '</div>';
			popup += '</div>';
		$('body').append(popup);
	}
	function renderModal($container, content, type) {
		if(type == 'textMsg'){
			$container.find('div.modal-body').html('');
			$container.modal();
			$container.find('div.modal-body').html(content);
		} else if (type == 'chartData') {
			$container.modal();
			$container.on('shown.bs.modal',function(e){
				$(this)
				.find('div.modal-body')
				.html(drawHighChart(content,'pie'));
			});
		}
	}
	function xml2json(xml, tab) {
	   var X = {
	      toObj: function(xml) {
	         var o = {};
	         if (xml.nodeType==1) {   // element node ..
	            if (xml.attributes.length)   // element with attributes  ..
	               for (var i=0; i<xml.attributes.length; i++)
	                  o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
	            if (xml.firstChild) { // element has child nodes ..
	               var textChild=0, cdataChild=0, hasElementChild=false;
	               for (var n=xml.firstChild; n; n=n.nextSibling) {
	                  if (n.nodeType==1) hasElementChild = true;
	                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
	                  else if (n.nodeType==4) cdataChild++; // cdata section node
	               }
	               if (hasElementChild) {
	                  if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
	                     X.removeWhite(xml);
	                     for (var n=xml.firstChild; n; n=n.nextSibling) {
	                        if (n.nodeType == 3)  // text node
	                           o["#text"] = X.escape(n.nodeValue);
	                        else if (n.nodeType == 4)  // cdata node
	                           o["#cdata"] = X.escape(n.nodeValue);
	                        else if (o[n.nodeName]) {  // multiple occurence of element ..
	                           if (o[n.nodeName] instanceof Array)
	                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
	                           else
	                              o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
	                        }
	                        else  // first occurence of element..
	                           o[n.nodeName] = X.toObj(n);
	                     }
	                  }
	                  else { // mixed content
	                     if (!xml.attributes.length)
	                        o = X.escape(X.innerXml(xml));
	                     else
	                        o["#text"] = X.escape(X.innerXml(xml));
	                  }
	               }
	               else if (textChild) { // pure text
	                  if (!xml.attributes.length)
	                     o = X.escape(X.innerXml(xml));
	                  else
	                     o["#text"] = X.escape(X.innerXml(xml));
	               }
	               else if (cdataChild) { // cdata
	                  if (cdataChild > 1)
	                     o = X.escape(X.innerXml(xml));
	                  else
	                     for (var n=xml.firstChild; n; n=n.nextSibling)
	                        o["#cdata"] = X.escape(n.nodeValue);
	               }
	            }
	            if (!xml.attributes.length && !xml.firstChild) o = null;
	         }
	         else if (xml.nodeType==9) { // document.node
	            o = X.toObj(xml.documentElement);
	         }
	         else
	            alert("unhandled node type: " + xml.nodeType);
	         return o;
	      },
	      toJson: function(o, name, ind) {
	         var json = name ? ("\""+name+"\"") : "";
	         if (o instanceof Array) {
	            for (var i=0,n=o.length; i<n; i++)
	               o[i] = X.toJson(o[i], "", ind+"\t");
	            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
	         }
	         else if (o == null)
	            json += (name&&":") + "null";
	         else if (typeof(o) == "object") {
	            var arr = [];
	            for (var m in o)
	               arr[arr.length] = X.toJson(o[m], m, ind+"\t");
	            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
	         }
	         else if (typeof(o) == "string")
	            json += (name&&":") + "\"" + o.toString() + "\"";
	         else
	            json += (name&&":") + o.toString();
	         return json;
	      },
	      innerXml: function(node) {
	         var s = ""
	         if ("innerHTML" in node)
	            s = node.innerHTML;
	         else {
	            var asXml = function(n) {
	               var s = "";
	               if (n.nodeType == 1) {
	                  s += "<" + n.nodeName;
	                  for (var i=0; i<n.attributes.length;i++)
	                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
	                  if (n.firstChild) {
	                     s += ">";
	                     for (var c=n.firstChild; c; c=c.nextSibling)
	                        s += asXml(c);
	                     s += "</"+n.nodeName+">";
	                  }
	                  else
	                     s += "/>";
	               }
	               else if (n.nodeType == 3)
	                  s += n.nodeValue;
	               else if (n.nodeType == 4)
	                  s += "<![CDATA[" + n.nodeValue + "]]>";
	               return s;
	            };
	            for (var c=node.firstChild; c; c=c.nextSibling)
	               s += asXml(c);
	         }
	         return s;
	      },
	      escape: function(txt) {
	         return txt.replace(/[\\]/g, "\\\\")
	                   .replace(/[\"]/g, '\\"')
	                   .replace(/[\n]/g, '\\n')
	                   .replace(/[\r]/g, '\\r');
	      },
	      removeWhite: function(e) {
	         e.normalize();
	         for (var n = e.firstChild; n; ) {
	            if (n.nodeType == 3) {  // text node
	               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
	                  var nxt = n.nextSibling;
	                  e.removeChild(n);
	                  n = nxt;
	               }
	               else
	                  n = n.nextSibling;
	            }
	            else if (n.nodeType == 1) {  // element node
	               X.removeWhite(n);
	               n = n.nextSibling;
	            }
	            else                      // any other node
	               n = n.nextSibling;
	         }
	         return e;
	      }
	   };
	   if (xml.nodeType == 9) // document node
	      xml = xml.documentElement;
	   var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
	   return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
	}
	function rebuildOutput(output){
		$('#accordion').remove();
		$('#chart-button').remove();
		window.tpchartdata = output.data || '';
		var resultsPanel = '<div class="panel-group col-xs-12 col-md-8" id="accordion" role="tablist" aria-multiselectable="true"></div>';
		var chartButton = '&nbsp;<button id="chart-button" class="btn btn-success btn-lg text-uppercase"><i class="fa fa-pie-chart"></i> Chart</button>';
		var demoOutput = '<div class="container-fluid">'+resultsPanel+'</div>';
		$('#textpool-panel').after(demoOutput);
		$('#textpool-submit').after(chartButton);
		drawOutputDrawer(output.data,output.reqType);		
	}
	function drawHighChart(seriesData,chartType) {

		//if the reqType was XML, convert to an obj
		if(typeof seriesData.length === 'undefined') {
			var data = xml2json(seriesData,"");
			var toJSONObj = $.parseJSON(data);
			seriesData = toJSONObj.text.sentiment;
			//var foo = 'bar';
		} else {
			seriesData = seriesData;
		}
		sentimentData = [];
		var totalUsedDist = 0;
		var totalUnusedDist = 0;
		var thisSentiment = {};
		//this part is necessary. We need to get the sentiment data organized.
		for(var i = 0; i < seriesData.length; i++ ) {
			var obj = {};
			obj.word = seriesData[i]['word'];
			obj.count = seriesData[i]['count'];
			obj.name = seriesData[i]['sentiment'];
			obj.position = seriesData[i]['position'];
			obj.y = seriesData[i]['distribution'] * 100;
			sentimentData.push(obj);
		}
		//inside of sentimentData, we want to merge 
		//the objects who have the same sentiment name
		for(var i = 0; i < sentimentData.length; i++) {
			thisSentiment[sentimentData[i]['name']] = sentimentData[i]['y'];
		}
		//lastly for thisSentiment, rebuild the sentimentData array with unique values
		var sentimentSeriesData = [];
		for(key in thisSentiment){
			var obj = {};
			totalUsedDist += thisSentiment[key];
			obj.name = key;
			obj.y = thisSentiment[key];
			sentimentSeriesData.push(obj);
		}
		totalUnusedDist = 100.0 - totalUsedDist;
		if(totalUnusedDist !== 0) {
			sentimentSeriesData.push({name: "other", y: totalUnusedDist});
		}
		//CREATE THE CHART!!
        // PIE CHART
        if(chartType === 'pie') {
        	var $container = $('div.modal-body');
        	var maxModalWidth = $container.width();
        	//console.log(maxModalWidth);
        	//var $chartContainer = 
        	// $chartContainer.appendTo('div.modal-body');
        	var c = new Highcharts.Chart({
	            chart: {
	                backgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false,
	                type: 'pie',
	                credits: false,
	                renderTo: $container[0]
	            },
	            title: {
	                text: 'Emotional Breakdown'
	            },
	            tooltip: {
	            	formatter: function(){
	            		
	            		if(this.key !== 'other'){
	            			return '<h3 class="lead">'+this.key+' '+this.y.toFixed(3)+'%</h3><small>triggered by:<strong> '+generateWordContext(this.key)+'</strong></small>';
	            		} else {
            			return '<h3 class="lead">'+this.key+' '+this.y.toFixed(3)+'%</h3><p class="small text-muted">unused sentiments and/or words</p>';	
	            		}
	            	},
	            	useHTML: true
	                //pointFormat: '<b>{point.y}</b>'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false
	                    },
	                    showInLegend: true
	                }
	            },
	            series: [{
	                name: 'Sentiment',
	                colorByPoint: true,
	                data: sentimentSeriesData
	            }],
	            credits: {
	            	enabled: false
	            }
        	});
	
        }//end if chart === pie        
	}
	function drawOutputDrawer(data,format) {
		if(format === 'json') {
			var jsonToggle =  '<div class="panel panel-success">';
					jsonToggle += '<div class="panel-heading" role="tab" id="json">';
					jsonToggle += '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseJSON" style="text-decoration:none">';
						jsonToggle += '<h4 class="panel-title">';
							jsonToggle += 'JSON';
						jsonToggle += '</h4>';
					jsonToggle += '</a>';
					jsonToggle += '</div>';
					jsonToggle += '<div id="collapseJSON" class="panel-collapse collapse" role="tabpanel">';
						jsonToggle += '<div class="panel-body">';
						jsonToggle += '<pre>'+JSON.stringify(data,null,2)+'</pre>';
						jsonToggle += '</div>';
					jsonToggle += '</div>';
				jsonToggle += '</div>';
		} else if (format === 'xml') {
			var xmlToggle =  '<div class="panel panel-success">';
				xmlToggle += '<div class="panel-heading" role="tab" id="xml">';
				xmlToggle += '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseXML" style="text-decoration:none">';
					xmlToggle += '<h4 class="panel-title">';
							xmlToggle += 'XML';
					xmlToggle += '</h4>';
				xmlToggle += '</a>';
				xmlToggle += '</div>';
				xmlToggle += '<div id="collapseXML" class="panel-collapse collapse" role="tabpanel">';
					xmlToggle += '<div class="panel-body">';
					var xml = new XMLSerializer().serializeToString(data).toString();
					xmlToggle += '<pre><xmp>'+xml+'</xmp></pre>';
					xmlToggle += '</div>';
				xmlToggle += '</div>';
			xmlToggle += '</div>';
		}
		var output = '';
		output += (typeof jsonToggle !== 'undefined') ? "<small>"+jsonToggle+"</small>" : '';
		output += (typeof xmlToggle !== 'undefined') ? "<small>"+xmlToggle+"</small>" : '';
		$('div#accordion').append(output);
	}
	function generateRandomPreloader(){
		var loaders = [];
		var preMsg1 =  '<div class="">';
			preMsg1 += '<p class="lead">Oh boy, that\'s a tough one.</p>';
			preMsg1 += '<p class="text-muted">Flossing our brains for awhile...</p>';
			preMsg1 += '<i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>';
			preMsg1 += '</div>';
		var preMsg2 =  '<div clas="">';
			preMsg2 += '<p class="lead">Wow, this should be fun!</p>';
			preMsg2 += '<p class="text-muted">Now let\'s get to work...</p>';
			preMsg2 += '<i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>';
			preMsg2 += '</div>';
		var preMsg3 =  '<div clas="">';
			preMsg3 += '<p class="lead">Hmmm...interesting.</p>';
			preMsg3 += '<p class="text-muted">I\'ll have to think about this one...</p>';
			preMsg3 += '<i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>';
			preMsg3 += '</div>';
		var preMsg4 =  '<div clas="">';
			preMsg4 += '<p class="lead">Good job!</p>';
			preMsg4 += '<p class="text-muted">Just a moment while we run the numbers...</p>';
			preMsg4 += '<i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>';
			preMsg4 += '</div>';

		loaders.push(preMsg1,preMsg2,preMsg3,preMsg4);
		return loaders[Math.floor(Math.random()*loaders.length)];
	}
	function generateWordContext(key){
	 	var words = [];
        for(var i = 0; i < sentimentData.length; i++) {
        	if(sentimentData[i]['name'] === key){
        		words.push(sentimentData[i]['word']);
        	}
        }
        return words.join(', ');
	}

	/**
	* EVENT HANLDERS
	**/

	/* GENERATE TEXT */
	$('button#textpool-generate').on('click',function(e) {
		e.preventDefault();
		var $form = $(this).closest('form');
		var $textArea = $form.find('textarea#textpool-narrative');
		var randomMsgs = [];
		var msg1 = "Many babies during the first 3 months of life are happy and carefree. Mothers often accept responsibility for their timid infants by feeding them milk as well as soft foods, so that stay happy and don't become irate or angry during the evening. Boy, what a joy that next morning would be!";
		var msg2 = "Conjoined twins are capable of leading separate lives, but the most astounding questions delve into the realm of perception and feeling, or in the case of those conjoined at the brain, shared cognitive abilities. This poses additional questions such as where caring and loving mental images originate, and whether one twin is able to read the mind of the other.";
		var msg3 = "The angry policemen chased the bandit through 3 states until they found his detestable hideout in a murky, revolting bayou. Knowing that he was awaiting an ambush, they  quickly coordinated a backup effort; they were fearful of his potential wrath upon himself or those around him.";
		randomMsgs.push(msg1,msg2,msg3);
		$textArea.val(randomMsgs[Math.floor(Math.random()*randomMsgs.length)]);
		return false;
	});

	/* TEXTPOOL SUBMIT */
	$('form#textpool-form-submit').submit(function(e) {
		e.preventDefault();
		createModal();
		var $container = $('#results');
		var $textpoolField = $(this).find('#textpool-narrative');
		if($textpoolField.val().length == 0 || $textpoolField.val().length < 3){
			var noPool =  '<div class="well well-lg">';
				noPool += '<p class="lead text-danger">';
				noPool += 'Uh, oh. No sentiments loaded.';
				noPool += '</p>';
				noPool += '<p class="lead">Try adding some more text?</p>';
				noPool += '</div>';
			renderModal($container,noPool,'textMsg');
			return false;
		} else {
			var formData = $(this).serialize();
			$.ajax({
				'url': '/s/textpool',
				'type': 'POST',
				'data': formData,
				'beforeSend': function(){
					var loader = generateRandomPreloader();
					renderModal($('#results'),loader,'textMsg');
				},
				'success': function(data) {
					var output = {};
					output.data = data;
					output.reqType = this.data.match(/&format=([\w]*)/)[1];
					var finishedMsg =  '<div class="">';
						finishedMsg += '<h1 class="text-success">Finished!</h1>';
						finishedMsg += '<p class="text-muted">Go look on the demo page for your results!</p>';
						finishedMsg += '</div>';
						renderModal($('#results'),finishedMsg,'textMsg');
					setTimeout(function(){$('#results').modal('hide');}, 2000);
					rebuildOutput(output);
				}
			});//end ajax
			// $container.on('hide.bs.modal',function(e){
			// 	$container.find('div.modal-body').html('');
			// });
			// $container.on('shown.bs.modal',function(e){
			// });
		}//end else no text
		
		return false;
	});

	/* CHART BUTTON */
	$('body').on('click','#chart-button',function(e){
		e.preventDefault();
		//var chart = drawHighChart(window.tpchartdata,'pie');
		var chart = window.tpchartdata;
		if(chart !== 'undefined'){
			renderModal($('#results'),chart,'chartData');
			//window.dispatchEvent(new Event('resize'));
		}
		return false;
	});


})(jQuery);