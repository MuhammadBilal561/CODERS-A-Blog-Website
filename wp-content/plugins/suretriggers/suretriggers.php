<?php
/**
 * Plugin Name:         SureTriggers
 * Description:         SureTriggers helps people automate their work by integrating multiple apps and plugins, allowing them to share data and perform tasks automatically.
 * Author:              SureTriggers
 * Author URI:          https://suretriggers.com/
 * Plugin URI:          https://suretriggers.com/
 * Text Domain:         suretriggers
 * Domain Path:         /languages
 * License:             GPLv3
 * License URI:         https://www.gnu.org/licenses/gpl-3.0.html
 * Version:             1.0.60
 * Requires at least:   5.4
 * Requires PHP:        5.6
 *
 * @package suretriggers
 */

/**
 * Plugin main file
 */

use SureTriggers\Loader;

require_once 'autoloader.php';
require_once 'functions.php';

define( 'SURE_TRIGGERS_FILE', __FILE__ );

/**
 * Kicking this off by calling 'get_instance()' method
 */
$loader = Loader::get_instance();
