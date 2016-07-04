(function($){

	function drawModal() {
		var popup =  '<div id="results" class="modal fade text-center" role="dialog">';
				popup += '<div class="modal-dialog">';
					popup += '<div class="modal-content">';
						popup += '<div class="modal-body">';
						popup += '</div>';
					popup += '</div>';
				popup += '</div>';
			popup += '</div>';
		$('body').append(popup);
	}
	function drawHighChart(seriesData,chartType) {
		var sentimentData = [];
		for(var i = 0; i < seriesData.length; i++ ) {
			var obj = {};
			obj.name = seriesData[i]['word'];
			obj.y = seriesData[i]['count'];
			sentimentData.push(obj);
		}
        // PIE CHART
        if(chartType === 'pie') {
        	$('#results div.modal-body').highcharts({
	            chart: {
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false,
	                type: 'pie',
	                credits: false
	            },
	            title: {
	                text: 'Emotional Breakdown'
	            },
	            tooltip: {
	                pointFormat: '<b>{point.y}</b>'
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
	                data: sentimentData
	            }],
	            credits: {
	            	enabled: false
	            }
        	});
        }//end if chart === pie    
	}//end drawHighChart
	function drawOutputDrawer(data,format) {

		if(format === 'json') {
			var jsonToggle =  '<div class="panel panel-default panel-primary">';
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

		loaders.push(preMsg1,preMsg2);
		return loaders[Math.floor(Math.random()*loaders.length)];
	}
	$('button#textpool-generate').on('click',function(e) {
		e.preventDefault();
		var $form = $(this).closest('form');
		var $textArea = $form.find('textarea#textpool-narrative');
		var msg = "Many babies during the first 3 months of life are happy and care-free. Mothers often accept responsibility for their timid infants by feeding them milk as well as soft foods, so that stay happy and don't become irate during the evening.";
		$textArea.val(msg);
		return false;
	});
	$('form#textpool-form-submit').submit(function(e) {
		e.preventDefault();
		$('#results').remove();
		$('#chart-button').remove();
		//add the modal
		drawModal();
		//clear the output drawer
		$('div#accordion').remove();
		var $container = $('#results');
		var $textpoolField = $(this).find('#textpool-narrative');
		if($textpoolField.val().length == 0 || $textpoolField.val().length < 3){
			$container.modal();
			$container.find('div.modal-body')
			.html('<div class="well well-lg"><p class="lead text-danger">Uh, oh. No sentiments loaded.</p><p class="lead"> Try adding some more text?</p></div>');
			return false;
		} else {
			$container.modal();
			var formData = $(this).serialize();
			$container.on('hide.bs.modal',function(e){
				$container.find('div.modal-body').html('');
			});
			$container.on('shown.bs.modal',function(e){
				$.ajax({
					'url': '/s/textpool',
					'type': 'POST',
					'data': formData,
					'beforeSend': function(){
						var loader = generateRandomPreloader();
						$container.find('div.modal-body').html(loader);
					},
					'success': function(data) {
						var reqType = this.data.match(/&format=([\w]*)/)[1];
						$container.find('div.modal-body')
						.html('<div class=""><h1 class="text-success">Finished!</h1><p class="text-muted">Go look on the demo page for your results!</p></div>')
						.hide()
						.fadeIn()
						.animate({opacity: 1}, 100)
						.animate({opacity: 0}, 100)
						.animate({opacity: 1}, 100);
						//console.log(this.data);
						setTimeout(function(){
							$('#results').modal('hide');
						}, 2000);
						$('div#accordion').remove();
						var resultsPanel = '<div class="panel-group col-xs-12 col-md-6 row" id="accordion" role="tablist" aria-multiselectable="true">';
						$('#textpool-panel').append(resultsPanel);
						// window.tpchartdata = data || {};
						drawOutputDrawer(data,reqType);
					}
				});//end ajax
			});
		}//end else no text
		
		return false;
	});
	$('body').on('click','#chart-button',function(e){
		e.preventDefault();
		var $container = $('#results');
		$container.find('div.body').html('');
		var chart = drawHighChart(window.tpchartdata,'pie');
		if(chart !== 'undefined'){
			$container.find('div.modal-body').html(chart);
			$container.modal();
		}
		return false;
	});

})(jQuery);