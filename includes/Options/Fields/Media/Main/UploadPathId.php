<?php


namespace Cloage\Options\Fields\Media\Main;

use Cloage\Helper;
use Cloage\Main;
use Cloage\Options\Fields\FieldsAbstract;
use Cloage\Options\Settings\Media;

class UploadPathId extends FieldsAbstract {
	public $default_value = '';

	public function set_id() {
		$this->id = 'upload_path_id';
	}

	public function set_title() {
		$this->title = __('Upload path ID', Main::$text_domain);
	}

	public function set_setting_id() {
		$this->setting_id = Media::get_options_name();
	}

	public function render() {
		printf( '
				<input class="regular-text" type="text" name="%s[%s]" id="%s" value="%s" disabled readonly>
				<span class="description">%s</span>
                <p class="description">%s</p>
                ',
			$this->setting_id,
			$this->id,
			sprintf('%s-%s', Main::$slug, $this->id),
			Helper::get_option($this->id, $this->setting_id, $this->default_value),
			__('Upload path ID in partition', Main::$text_domain),
			__('This ID is auto generated.', Main::$text_domain)
		);
	}
}