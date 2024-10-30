<?php


namespace Cloage\Options\Fields\General\Main;

use Cloage\Helper;
use Cloage\Main;
use Cloage\Options\Fields\FieldsAbstract;
use Cloage\Options\Settings\General;

class Token extends FieldsAbstract {
	public $default_value = '';

	public function set_id() {
		$this->id = 'token';
	}

	public function set_title() {
		$this->title = __('Token', Main::$text_domain);
	}

	public function set_setting_id() {
		$this->setting_id = General::get_options_name();
	}

	public function render() {
		printf( '<input class="regular-text" type="text" name="%s[%s]" id="%s" value="%s">',
			$this->setting_id,
			$this->id,
			sprintf('%s-%s', Main::$slug, $this->id),
			Helper::get_option($this->id, $this->setting_id, $this->default_value)
		);
	}
}