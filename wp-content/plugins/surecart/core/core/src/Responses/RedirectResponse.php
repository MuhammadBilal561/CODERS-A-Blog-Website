<?php
/**
 * @package   SureCartCore
 * @author    SureCart <support@surecart.com>
 * @copyright 2017-2019 SureCart
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0
 * @link      https://surecart.com/
 */

namespace SureCartCore\Responses;

use SureCartVendors\GuzzleHttp\Psr7\Response as Psr7Response;
use SureCartVendors\Psr\Http\Message\ResponseInterface;
use SureCartCore\Requests\RequestInterface;

/**
 * A collection of tools for the creation of responses
 */
class RedirectResponse extends Psr7Response {
	/**
	 * Current request.
	 *
	 * @var RequestInterface
	 */
	protected $request = null;

	/**
	 * Constructor.
	 *
	 * @codeCoverageIgnore
	 * @param RequestInterface $request
	 */
	public function __construct( RequestInterface $request ) {
		parent::__construct();
		$this->request = $request;
	}

	/**
	 * Get a response redirecting to a specific url.
	 *
	 * @param  string  $url
	 * @param  integer $status
	 * @return ResponseInterface
	 */
	public function to( $url, $status = 302 ) {
		return $this
			->withHeader( 'Location', $url )
			->withStatus( $status );
	}

	/**
	 * Get a response redirecting back to the referrer or a fallback.
	 *
	 * @param  string  $fallback
	 * @param  integer $status
	 * @return ResponseInterface
	 */
	public function back( $fallback = '', $status = 302 ) {
		$url = $this->request->getHeaderLine( 'Referer' );

		if ( empty( $url ) ) {
			$url = $fallback;
		}

		if ( empty( $url ) ) {
			$url = $this->request->getUrl();
		}

		return $this->to( $url, $status );
	}
}
