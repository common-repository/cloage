<?php

namespace Cloage;

use Cloage\Database\Database;
use Cloage\Media\Media;
use Cloage\Options\Options;
use Cloage\Backup\Backup;
use Cloage\Woocommerce\Woocommerce;

/**
 * Class Main
 * @package Cloage
 */
class Main {

	/**
	 * The single instance of the class.
	 *
	 * @var Main
	 */
	protected static $_instance = null;

	/**
	 * plugin version
	 *
	 * @var string
	 */
	public static $version = '1.1.0';

	/**
	 * plugin name
	 *
	 * @var string
	 */
	public static $name;

	/**
	 * plugin slug
	 *
	 * @var string
	 */
	public static $slug = 'cloage';

	/**
	 * Plugin description
	 *
	 * @var string
	 */
	private $description;

	/**
	 * plugin author name
	 *
	 * @var string|void
	 */
	private $author;

	/**
	 * plugin text domain
	 *
	 * @var string
	 */
	public static $text_domain = 'cloage';

	/**
	 * API Base url
	 *
	 * @var string
	 */
	public static $api_url = 'https://atoms.cloage.com';

	/**
	 * Website domain
	 *
	 * @var string
	 */
	public static $domain = 'cloage.io';

	/**
	 * API domain
	 *
	 * @var string
	 */
	public static $api_domain = 'cloage.com';


	/**
	 * Main constructor.
	 */
	private function __construct() {
		$this->includes();
		add_action( 'plugins_loaded', [ $this, 'init' ] );
	}

	/**
	 * include dependencies
	 */
	public function includes() {
		include_once Bootstrap::$path . 'includes/i18n.php';
		include_once Bootstrap::$path . 'includes/Helper.php';
		include_once Bootstrap::$path . 'includes/Backend.php';
		include_once Bootstrap::$path . 'includes/Frontend.php';
		include_once Bootstrap::$path . 'includes/Database/Database.php';
		include_once Bootstrap::$path . 'includes/Options/Options.php';
		include_once Bootstrap::$path . 'includes/Media/Media.php';
		include_once Bootstrap::$path . 'includes/Backup/Backup.php';
		include_once Bootstrap::$path . 'includes/Woocommerce/Woocommerce.php';
	}

	/**
	 * Instantiate plugin classes
	 */
	public function init() {
		self::$name        = __( 'Cloage', self::$text_domain );
		$this->description = __( 'Cloage official wordpress plugin', self::$text_domain );
		$this->author      = __( 'Cloage development team', self::$text_domain );

		Backend::instance();
		Options::instance();
		Media::instance();
		Backup::instance();
		Frontend::instance();
		Database::instance();
		if( class_exists('\Woocommerce') ) {
			Woocommerce::instance();
		}
	}

	/**
	 * Main Class Instance.
	 *
	 * Ensures only one instance of this class is loaded or can be loaded.
	 *
	 * @static
	 * @return Main - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}
}