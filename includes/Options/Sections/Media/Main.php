<?php

namespace Cloage\Options\Sections\Media;

use Cloage\Main as MainClass;
use Cloage\Options\Sections\SectionsAbstract;

class Main extends SectionsAbstract {
	public function get_fields() {
		return [
			[
				'path'  => 'Options/Fields/Media/Main/UploadPath.php',
				'class' => '\Cloage\Options\Fields\Media\Main\UploadPath'
			],
			[
				'path'  => 'Options/Fields/Media/Main/UploadPathId.php',
				'class' => '\Cloage\Options\Fields\Media\Main\UploadPathId'
			],
			[
				'path'  => 'Options/Fields/Media/Main/Webhook.php',
				'class' => '\Cloage\Options\Fields\Media\Main\Webhook'
			],
		];
	}
}

new Main( 'media-main', __( 'Media Settings', MainClass::$text_domain ), 'media' );