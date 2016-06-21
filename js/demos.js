(function($){


	$(document).ready(function(){
		$('button#textpool-generate').on('click',function(e) {
			e.preventDefault();
			var $form = $(this).closest('form');
			var $textArea = $form.find('textarea#textpool-narrative');
			var msg = "Sometime during the winter, little ducklings leave their mother in search of food. The other wild animals in their immediate ecosystem will benefit from the duckling";
			$textArea.val(msg);
			console.log($textArea.val());
		});

		$('form#textpool-form-submit').submit(function(e) {
			e.preventDefault();
			var formData = $(this).serialize();
			$.ajax({
				'url': '/s/textpool',
				'type': 'POST',
				'data': formData,
				'success': function(data) {

				}
			});
			return false;
		});
	});

	

})(jQuery);