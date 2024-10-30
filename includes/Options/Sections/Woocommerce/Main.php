<?php

namespace Cloage\Options\Sections\Woocommerce;

use Cloage\Main as MainClass;
use Cloage\Options\Sections\SectionsAbstract;

class Main extends SectionsAbstract {
	public function get_fields() {
		return [
			[
				'path'  => 'Options/Fields/Woocommerce/Main/MirrorType.php',
				'class' => '\Cloage\Options\Fields\Woocommerce\Main\MirrorType'
			],
			[
				'path'  => 'Options/Fields/Woocommerce/Main/UploadPath.php',
				'class' => '\Cloage\Options\Fields\Woocommerce\Main\UploadPath'
			],
			[
				'path'  => 'Options/Fields/Woocommerce/Main/UploadPathId.php',
				'class' => '\Cloage\Options\Fields\Woocommerce\Main\UploadPathId'
			],
		];
	}
}

new Main( 'woocommerce-main', __( 'General', MainClass::$text_domain ), 'woocommerce' );