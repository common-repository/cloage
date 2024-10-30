<?php
/*
Plugin Name: Cloage
Plugin URI: https://cloage.com/wordpress/
Description: Cloage official wordpress plugin
Author: Cloage development team
Version: 1.1.0
Author URI: https://cloage.com/
Text Domain: cloage
Domain Path: /languages/
*/

namespace Cloage;

class Bootstrap {

    private static $_instance;
    public static $path;
    public static $url;
	/**
	 * Bootstrap constructor.
	 */
	private function __construct() {
        self::$url = plugin_dir_url( __FILE__ );
        self::$path = plugin_dir_path( __FILE__ );

		include_once( self::$path . 'includes/Main.php' );
		Main::instance();
	}


	/**
	 * Main Class Instance.
	 *
	 * Ensures only one instance of this class is loaded or can be loaded.
	 *
	 * @static
	 * @return Bootstrap - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
}
Bootstrap::instance();
?>
