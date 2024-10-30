<?php


namespace Cloage\Options\Fields\General\Urls;

use Cloage\Helper;
use Cloage\Main;
use Cloage\Options\Fields\FieldsAbstract;
use Cloage\Options\Settings\General;

class Companion extends FieldsAbstract {
	public $default_value = NULL;

	public function set_id() {
		$this->id = 'companion_url';
	}

	public function set_title() {
		$this->title = __('Companion', Main::$text_domain);
	}

	public function set_setting_id() {
		$this->setting_id = General::get_options_name();
	}

	public function set_default_value() {
		$this->default_value = sprintf('https://companion.%s', Main::$api_domain);
	}

	public function render() {
		printf( '<input class="regular-text" type="url" name="%s[%s]" id="%s" value="%s"><p class="description">%s<code>%s</code></p>',
			$this->setting_id,
			$this->id,
			sprintf('%s-%s', Main::$slug, $this->id),
			Helper::get_option($this->id, $this->setting_id, $this->default_value),
			__('Default Value:', Main::$text_domain),
			sprintf('https://companion.%s', Main::$api_domain)
		);
	}
}