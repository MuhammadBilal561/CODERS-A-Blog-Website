<?php
/**
 * Base Modal class.
 * php version 5.6
 *
 * @category Model
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */

namespace SureTriggers\Models;

use SureTriggers\Support\Encryption;
use SureTriggers\Controllers\OptionController;

/**
 * The API token model.
 */
class SaasApiToken {

	/**
	 * The option key.
	 *
	 * @var string
	 */
	protected $key = 'secret_key';

	/**
	 * Prevent php warnings.
	 */
	final public function __construct() {}

	/**
	 * Save and encrypt the API token.
	 *
	 * @param string|null $value The API token.
	 * @return void|null
	 */
	protected function save( $value ) {
		if ( null === $value ) {
			return OptionController::set_option( $this->key, $value );
		} else {
			return OptionController::set_option( $this->key, Encryption::encrypt( $value ) );
		}
	}

	/**
	 * Get and decrypt the API token
	 *
	 * @return mixed|string The decoded API token.
	 */
	protected function get() {
		$token = Encryption::decrypt( OptionController::get_option( $this->key ) );
		if ( ! $token ) {
			$old_token = OptionController::get_option( $this->key );
			if ( is_string( $old_token ) && ! empty( $old_token ) ) {
				self::save( $old_token );
				$token = self::get();
			} else {
				$token = null;
			}
		}
		return $token;
	}

	/**
	 * Forward call to method
	 *
	 * @param array|string $method Method to call.
	 * @param array|mixed  $params Method params.
	 * 
	 * @return mixed Mixed value.
	 */
	public function __call( $method, $params ) {
		/**
		 *
		 * Ignore line
		 *
		 * @phpstan-ignore-next-line
		 */
		return call_user_func_array( [ $this, $method ], $params );
	}

	/**
	 * Static Facade Accessor
	 *
	 * @param array|string $method Method to call.
	 * @param array|mixed  $params Method params.
	 *
	 * @return mixed Mixed value.
	 */
	public static function __callStatic( $method, $params ) {
		/**
		 *
		 * Ignore line
		 *
		 * @phpstan-ignore-next-line
		 */
		return call_user_func_array( [ new static(), $method ], $params );
	}
}
