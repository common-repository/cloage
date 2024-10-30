<?php

namespace Cloage\Options\Sections\General;

use Cloage\Main;
use Cloage\Options\Sections\SectionsAbstract;

class Urls extends SectionsAbstract {
	public function get_fields() {
		return [
			[
				'path'  => 'Options/Fields/General/Urls/Tus.php',
				'class' => '\Cloage\Options\Fields\General\Urls\Tus'
			],
			[
				'path'  => 'Options/Fields/General/Urls/Companion.php',
				'class' => '\Cloage\Options\Fields\General\Urls\Companion'
			],
		];
	}

	public static function callback() {
		printf(__('This is %s API endpoint that our plugin uses. if you don\'t know what is these setting exactly are, don\'t change them.', Main::$text_domain), Main::$name);
	}
}

new Urls( 'general-endpoints', __( 'API Endpoint Settings', Main::$text_domain ), 'general' );