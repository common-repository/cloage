(function ($) {
  $(document).ready(function ($) {

    if ($(cloage.uppySelector).length) {
      var uppy = Uppy.Core({
        locale: Uppy.locales[cloage.locale],
        meta: {
          token: cloage.helper.token,
          folder_id: cloage.uploadPathId,
          partitionPath: cloage.uploadSubDir,
          public: cloage.uploadType,
          // imageSizes: JSON.stringify(cloage.helper.get_image_sizes)
        }
      })
        .use(Uppy.Dashboard, {
          inline: true,
          target: cloage.uppySelector,
          removeFingerprintOnSuccess: true,
          proudlyDisplayPoweredByUppy: false,
        })
        .use(Uppy.Tus, {
          endpoint: cloage.helper.urls.tus,
          removeFingerprintOnSuccess: true,
          chunkSize: 1000 * 1000 * 10,
          limit: 5,
        })
        .use(Uppy.Url, {
          target: Uppy.Dashboard,
          companionUrl: cloage.helper.urls.companion,
        })
        .use(Uppy.GoogleDrive, {
          target: Uppy.Dashboard,
          companionUrl: cloage.helper.urls.companion,
        })
        .use(Uppy.Dropbox, {
          target: Uppy.Dashboard,
          companionUrl: cloage.helper.urls.companion,
        })
        .use(Uppy.Webcam, {
          target: Uppy.Dashboard,
          onBeforeSnapshot: () => Promise.resolve(),
        });

      uppy.on('file-added', (file) => {
        if( file.type.includes("image") ) {
          const data = file.data
          const url = URL.createObjectURL(data)
          const image = new Image()
          image.src = url;
          image.onload = () => {
            uppy.setFileMeta(file.id, {
              original_size: JSON.stringify({
                width: image.width,
                height: image.height
              }),
              imageSizes: JSON.stringify(cloage.helper.get_image_sizes)
            })

            $.ajax({
              url: cloage.ajaxUrl,
              type: 'POST',
              dataType: 'json',
              data: {
                action: 'cloage_get_constrain_dimensions',
                width: image.width,
                height: image.height,
              }
            })
              .done(function (result) {
                uppy.setFileMeta(file.id, {imageSizes: JSON.stringify(result.data)})
              })
              .fail(function (response) {

              })
              .always(function (result) {
              })
            /*uppy.setFileMeta(file.id, { width: image.width, height: image.height })
            URL.revokeObjectURL(url)*/
          }
        }

      })

      uppy.on('upload-success', (file, response) => {
        var uploadURL = response.uploadURL;
        var upload_id = uploadURL.replace(cloage.helper.urls.tus.concat('/'), '');

        const data = file.data // is a Blob instance
        const url = URL.createObjectURL(data)
        const image = new Image()
        image.src = url;
        var isImage = file.type.split('/')[0] === 'image';
        if( isImage ) {
          image.onload = () => {
            $.ajax({
              url: cloage.ajaxUrl,
              type: 'POST',
              dataType: 'json',
              data: {
                action: 'cloage_add_attachment_by_uppy',
                path: cloage.uploadSubDir,
                upload_id: upload_id,
                width: image.width,
                height: image.height
              }
            })
              .done(function (result) {
              })
              .fail(function (response) {

              })
              .always(function (result) {
              })
          }
        } else {
          $.ajax({
            url: cloage.ajaxUrl,
            type: 'POST',
            dataType: 'json',
            data: {
              action: 'cloage_add_attachment_by_uppy',
              path: cloage.uploadSubDir,
              upload_id: upload_id,
            }
          })
            .done(function (result) {
            })
            .fail(function (response) {

            })
            .always(function (result) {
            })
        }

      });
    }

    $(document).on('click', 'a.cloage_send_to_mirror', function (event) {
      event.preventDefault();
      var thisAction = $(this);
      $(this).addClass('loading');
      var url = $(this).parent().parent().find('.file_url input').val();
      var post_id = $(this).data('id');

      $.ajax({
        url: cloage.ajaxUrl,
        type: 'POST',
        dataType: 'json',
        data: {
          action: 'cloage_generate_mirror_link',
          url: url,
          post_id: post_id
        }
      })
        .done(function (result) {
          if (result.success === true) {
            thisAction.parent().parent().find('.file_id input').val(result.data.id);
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

    $(document).on('ready', function (e) {
      if (cloage.helper.mirror_type === 'cloage') {
        $('.options_group.show_if_downloadable:not(".cloage_files_group")').hide();
        $('.show_if_variation_downloadable:not(".cloage_files_group")').hide();
      }
    });

    $(document).on('change', function (e) {
      if (cloage.helper.mirror_type === 'cloage') {
        $('.options_group.show_if_downloadable:not(".cloage_files_group")').hide();
        $('.show_if_variation_downloadable:not(".cloage_files_group")').hide();
      }
    });

    $(document).on('change', 'input#manually_insert', function (e) {
      if (this.checked) {
        $(this).parents('tr.mirror_row').find('input[name="_cloage_downloadable_files_ids[]"]').attr({
          disabled: false,
          readonly: false
        })
      } else {
        $(this).parents('tr.mirror_row').find('input[name="_cloage_downloadable_files_ids[]"]').attr({
          disabled: true,
          readonly: true
        })
      }
    });

    $(document).on('click', '.save_cloage_files', function (e) {
      e.preventDefault();
      $(this).next().removeClass('error success').html(cloage.selectFiles).html('');
      $(this).parents('.downloadable_files.cloage_files').addClass('loading');
      var thisButton = $(this);
      var fileIds = {};
      var post_id = $(this).data('id');
      $(this).parents('.downloadable_files.cloage_files').find('input[name="_cloage_downloadable_files_ids[]"]').each(function (index) {
        var thisValue = $(this).val();
        var thisName = $(this).parent().next().find('input').val();
        var isManual = $(this).parent().prev().find('input[type="checkbox"]').prop('checked');

        if ($(this).val() !== '') {
          if (isManual === true) {
            thisName = '';
          }
          fileIds[thisValue] = thisName;
        }
      });

      //if( !jQuery.isEmptyObject(fileIds) ) {
      $.ajax({
        url: cloage.ajaxUrl,
        type: 'POST',
        dataType: 'json',
        data: {
          action: 'cloage_save_downloadable_files',
          files: fileIds,
          post_id: post_id
        }
      })
        .done(function (result) {
          if (result.success === true) {
            thisButton.next().addClass('success').html(result.data.message);
            thisButton.parents('table.widefat.cloage_files_table').find('tbody').html('');
            $.each(result.data.files, function (fileId, file) {
              var htmlStructure = '' +
                '<tr class="mirror_row">\n' +
                '    <td class="sort"></td>\n' +
                '    <td style="width: 17px;">' +
                '        <label for="manually_insert" data-tooltip="' + cloage.insertFileManually + '" class="cloage_tooltip"><input id="manually_insert" type="checkbox" value="yes" style="width: 16px; min-width: 0;"></label>' +
                '    </td>' +
                '    <td class="file_id">\n' +
                '        <input type="text" class="input_text" placeholder="' + cloage.fileId + '" name="_cloage_downloadable_files_ids[]" value="' + fileId + '" disabled readonly>\n' +
                '    </td>\n' +
                '    <td class="file_name">\n' +
                '        <input type="text" class="input_text" placeholder="' + cloage.fileName + '" name="_cloage_downloadable_files_names[]" value="' + file.name + '" disabled readonly>\n' +
                '    </td>\n' +
                '    <td class="file_path">\n' +
                '        <input type="text" class="input_text" placeholder="" name="" value="' + file.path + '" disabled readonly>\n' +
                '    </td>\n' +
                '    <td class="file_url_choose" width="1%">' +
                '       <a ' +
                '         href="' + cloage.image_library_url + '" ' +
                '         class="button thickbox cloage_file_selector" ' +
                '         title="' + cloage.SelectFileTitle + '" ' +
                '         onclick="cloudAddClass(this)"' +
                '       >' +
                '             ' + cloage.chooseFile +
                '</a>' +
                '     </td>\n' +
                '    <td width="1%">\n' +
                '        <a href="#" class="cloage_get_download_link no_padding button cloage_tooltip" data-tooltip="' + cloage.getMirrorLink + '" data-id="' + result.data.product_id + '" data-file-id="' + fileId + '"><span class="spinner"></span> <span class="dashicons dashicons-download"></span></a>\n' +
                '    </td>\n' +
                '    <td width="1%"><a href="#" class="delete">' + cloage.delete + '</a></td>\n' +
                '</tr>';
              thisButton.parents('table.widefat.cloage_files_table').find('tbody').append(htmlStructure);
            });
          } else {
            thisButton.next().addClass('error').html(result.data);
          }
        })
        .fail(function (result) {
          thisButton.next().addClass('error').html(cloage.error);
        })
        .always(function (result) {
          thisButton.parents('.downloadable_files.cloage_files').removeClass('loading');
        })
    });

    $(document).on('click', '.cloage_copy_file_id', function (e) {
      e.preventDefault();
      $(this).prev().select();
      document.execCommand("copy");
      $(this).attr('data-tooltip', cloage.copied)
    });

    $(document).on('click', 'a.cloage_upload_to_cloud', function (e) {
      e.preventDefault();
      if (!$(this).hasClass('disabled')) {
        var thisButton = $(this);
        var url = thisButton.attr('href');
        var attachment_id = thisButton.data('attachment_id');
        thisButton.addClass('loading disabled');
        $.ajax({
          url: cloage.ajaxUrl,
          type: 'POST',
          dataType: 'json',
          data: {
            action: 'cloage_remote_upload',
            url,
            attachment_id,
          }
        })
          .done(function (result) {
            if (result.success) {
              thisButton.after('<p class="description">' + result.message + '</p>');
            } else {
              thisButton.after('<p class="description result error">' + result.message + '</p>');
              setTimeout(function () {
                thisButton.removeClass('disabled');
                $('.result.error').remove();
              }, 1000);
            }
          })
          .fail(function (result) {
            thisButton.next().addClass('error').html(cloage.error);
          })
          .always(function (result) {
            thisButton.removeClass('loading');
          })
      }

    });

    $(document).on('click', 'a.cloage_restore_media', function (e) {
      e.preventDefault();
      if (!$(this).hasClass('disabled')) {
        var thisButton = $(this);
        var attachment_id = thisButton.data('attachment-id');
        thisButton.addClass('loading disabled');
        $.ajax({
          url: cloage.ajaxUrl,
          type: 'POST',
          dataType: 'json',
          data: {
            action: 'cloage_restore_media',
            attachment_id,
          }
        })
          .done(function (result) {
            if (result.success) {
              thisButton.parent().html('<a href="' + result.data.attachment_url + '" data-attachment_id="' + result.data.attachment_id + '" class="button-secondary cloage_upload_to_cloud"><span class="spinner"></span>' + cloage.uploadToCloud + '</a>');
              thisButton.after('<p class="description">' + result.data + '</p>');
            } else {
              thisButton.after('<p class="description result error">' + result.data + '</p>');
              setTimeout(function () {
                thisButton.removeClass('disabled');
                $('.result.error').remove();
              }, 3000);
            }
          })
          .fail(function (result) {
            thisButton.next().addClass('error').html(cloage.error);
          })
          .always(function (result) {
            thisButton.removeClass('loading');
          })
      }

    });

    $(document).on('click', 'a.cloage_switch_to_gallery', function (event) {
      event.preventDefault();
      var wp = parent.wp;
      // switch tabs (required for the code below)
      wp.media.frame.setState('insert');
      // refresh
      if( wp.media.frame.content.get() !== null) {
        wp.media.frame.content.get().collection.props.set({ignore: (+ new Date())});
        wp.media.frame.content.get().options.selection.reset();
      } else {
        wp.media.frame.library.props.set ({ignore: (+ new Date())});
      }

    });

    $(document).on('click', 'a.cloage_recover_remote_file', function (event) {
      event.preventDefault();
      var thisAction = $(this);
      if (!thisAction.hasClass('disabled')) {
        $(this).addClass('disabled');
        var file_id = $(this).attr('href');

        $.ajax({
          url: cloage.ajaxUrl,
          type: 'POST',
          dataType: 'json',
          data: {
            action: 'cloage_update_remote_file_status',
            file_id
          }
        })
          .done(function (result) {
            if (result.success === true) {
              thisAction.parent().parent().remove();
            } else {
              thisAction.after('<p class="description">'+result.data+'</p>')
            }
          })
          .fail(function (result) {
            alert(cloage.error)
          })
          .always(function (result) {
            thisAction.removeClass('disabled');
          })
      }


    });


  });
})(jQuery);
