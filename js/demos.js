(function($){


	$(document).ready(function(){
		$('button#textpool-generate').on('click',function(e) {
			e.preventDefault();
			var $form = $(this).closest('form');
			var $textArea = $form.find('textarea#textpool-narrative');
			var msg = "Sometime during the winter, little ducklings leave their mother in search of food. Without a doubt, the duckling's prominent predator is probably the vicious honey badger; He's very mean, and well, he just doesn't care.";
			$textArea.val(msg);
			return false;
		});

		$('form#textpool-form-submit').submit(function(e) {
			e.preventDefault();
			var formData = $(this).serialize();
			$.ajax({
				'url': '/s/textpool',
				'type': 'POST',
				'data': formData,
				'beforeSend': function(){

				},
				'success': function(data) {

				}
			});
			return false;
		});
	});

	

})(jQuery);