<?php

namespace Cloage\Options\Sections\General;

use Cloage\Main as MainClass;
use Cloage\Options\Sections\SectionsAbstract;

class Main extends SectionsAbstract {
	public function get_fields() {
		return [
			[
				'path'  => 'Options/Fields/General/Main/Token.php',
				'class' => '\Cloage\Options\Fields\General\Main\Token'
			],
			[
				'path'  => 'Options/Fields/General/Main/Domain.php',
				'class' => '\Cloage\Options\Fields\General\Main\Domain'
			],
			[
				'path'  => 'Options/Fields/General/Main/UploadType.php',
				'class' => '\Cloage\Options\Fields\General\Main\UploadType'
			],
			[
				'path'  => 'Options/Fields/General/Main/ActiveTime.php',
				'class' => '\Cloage\Options\Fields\General\Main\ActiveTime'
			],
			[
				'path'  => 'Options/Fields/General/Main/DeleteStatus.php',
				'class' => '\Cloage\Options\Fields\General\Main\DeleteStatus'
			],
			[
				'path'  => 'Options/Fields/General/Main/DebugMode.php',
				'class' => '\Cloage\Options\Fields\General\Main\DebugMode'
			],
		];
	}
}

new Main( 'general-main', __( 'General Settings', MainClass::$text_domain ), 'general' );