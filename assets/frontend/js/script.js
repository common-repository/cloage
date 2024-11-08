(function ($) {
  $(document).ready(function ($) {

    $(document).on('click', 'a.cloage_get_download_link', function (event) {
      event.preventDefault();
      var thisAction = $(this);
      $(this).addClass('loading');
      var file_id = $(this).data('file-id');
      var post_id = $(this).data('id');
      $.ajax({
        url: cloage.ajaxUrl,
        type: 'POST',
        dataType: 'json',
        data: {
          action: 'cloage_download_generator',
          file_id,
          product: post_id,
          nonce: cloage.nonce
        }
      })
        .done(function (result) {
          if (result.success === true) {
            window.location = result.data;
          } else {
            alert(result.data)
          }
        })
        .fail(function (result) {
          alert(cloage.error)
        })
        .always(function (result) {
          thisAction.removeClass('loading');
        })

    });

  });
})(jQuery);
