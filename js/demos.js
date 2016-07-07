(function($){

	function createModal() {
		$('#results').remove();
		var popup =  '<div id="results" class="modal fade text-center" role="dialog">';
				popup += '<div class="modal-dialog">';
					popup += '<div class="modal-content">';
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
	function rebuildOutput(output){
		$('div#accordion').remove();
		$('div#chart-button').remove();
		window.tpchartdata = output.data || '';
		var resultsPanel = '<div class="panel-group col-xs-12 col-md-8 row" id="accordion" role="tablist" aria-multiselectable="true">';
		var chartButton = '<div id="chart-button" class="btn btn-lg btn-danger">Chart</div>';
		$('#textpool-panel').append(resultsPanel).append(chartButton);
		drawOutputDrawer(output.data,output.reqType);		
	}
	function drawHighChart(seriesData,chartType) {
		var sentimentData = [];
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
		sentimentSeriesData.push({name: "other", y: totalUnusedDist});
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
	            		return '<h3 class="lead">'+this.key+' '+this.y.toFixed(3)+'%</h3>';
	            		} else {
            			return '<h3 class="lead">'+this.key+' '+this.y.toFixed(3)+'%</h3><p class="small text-muted">no sentimental value.</p>';	
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
			var jsonToggle =  '<div class="panel panel-default panel-success">';
					jsonToggle += '<div class="panel-heading" role="tab" id="json">';
					jsonToggle += '<h4 class="panel-title">';
						jsonToggle += '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseJSON">';
							jsonToggle += 'JSON';
						jsonToggle += '</a>';
					jsonToggle += '</h4>';
					jsonToggle += '</div>';
					jsonToggle += '<div id="collapseJSON" class="panel-collapse collapse" role="tabpanel">';
						jsonToggle += '<div class="panel-body">';
						jsonToggle += '<pre><small>'+JSON.stringify(data,null,2)+'</small></pre>';
						jsonToggle += '</div>';
					jsonToggle += '</div>';
				jsonToggle += '</div>';
		} else if (format === 'xml') {
			var xmlToggle =  '<div class="panel panel-default panel-primary">';
				xmlToggle += '<div class="panel-heading" role="tab" id="xml">';
				xmlToggle += '<h4 class="panel-title">';
					xmlToggle += '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseXML" aria-expanded="false">';
						xmlToggle += 'XML';
					xmlToggle += '</a>';
				xmlToggle += '</h4>';
				xmlToggle += '</div>';
				xmlToggle += '<div id="collapseXML" class="panel-collapse collapse" role="tabpanel">';
					xmlToggle += '<div class="panel-body">';
					var xml = new XMLSerializer().serializeToString(data).toString();
					xmlToggle += '<small><xmp>'+xml+'</xmp></small>';
					xmlToggle += '</div>';
				xmlToggle += '</div>';
			xmlToggle += '</div>';
		}


		var output = '';
		output += (typeof jsonToggle !== 'undefined') ? jsonToggle : '';
		output += (typeof xmlToggle !== 'undefined') ? xmlToggle : '';

		$('div#accordion').append(output);
	}
	function generateRandomPreloader(){
		var loaders = [];
		var preMsg1 =  '<div class="">';
			preMsg1 += '<p class="lead">Oh boy, that\'s a tough one.</p>';
			preMsg1 += '<p class="text-muted">Flossing our brains for awile...</p>';
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

		loaders.push(preMsg1,preMsg2,preMsg3);
		return loaders[Math.floor(Math.random()*loaders.length)];
	}

	/**
	* EVENT HANLDERS
	**/

	/* GENERATE TEXT */
	$('button#textpool-generate').on('click',function(e) {
		e.preventDefault();
		var $form = $(this).closest('form');
		var $textArea = $form.find('textarea#textpool-narrative');
		var msg1 = "Many babies during the first 3 months of life are happy and carefree. Mothers often accept responsibility for their timid infants by feeding them milk as well as soft foods, so that stay happy and don't become irate or angry during the evening. Boy, what a joy that next morning would be!";
		var msg2 = "Conjoined twins are capable of leading separate lives, but the most interesting questions delve into the realm of perception and feeling, or in the case of those conjoined at the brain, shared cognitive abilities. This poses additional questions such as where their mental images originate, and whether one twin is able to read the mind of the other.";
		$textArea.val(msg1);
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