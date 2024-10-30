<?php

namespace Cloage\Options\Sections\Backup;

use Cloage\Main as MainClass;
use Cloage\Options\Sections\SectionsAbstract;

class Main extends SectionsAbstract {
	public function get_fields() {
		return [
			[
				'path'  => 'Options/Fields/Backup/Main/UploadPath.php',
				'class' => '\Cloage\Options\Fields\Backup\Main\UploadPath'
			],
			[
				'path'  => 'Options/Fields/Backup/Main/UploadPathId.php',
				'class' => '\Cloage\Options\Fields\Backup\Main\UploadPathId'
			],
		];
	}
}

new Main( 'backup-main', __( 'Backup Settings', MainClass::$text_domain ), 'backup' );