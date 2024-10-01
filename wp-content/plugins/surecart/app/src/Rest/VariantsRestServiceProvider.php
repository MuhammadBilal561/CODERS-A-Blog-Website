<?php

namespace SureCart\Rest;

use SureCart\Controllers\Rest\VariantsController;
use SureCart\Rest\RestServiceInterface;

/**
 * Service provider for Variant Rest Requests
 */
class VariantsRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'variants';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = VariantsController::class;

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'find', 'edit', 'create', 'delete' ];

	/**
	 * Get our sample schema for post.
	 *
	 * @return array The sample schema for a post
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			// Since WordPress 5.3, the schema can be cached in the $schema property.
			return $this->schema;
		}

		$this->schema = [
			// This tells the spec of JSON Schema we are using which is draft 4.
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			// The title property marks the identity of the resource.
			'title'      => $this->endpoint,
			'type'       => 'object',
			// In JSON Schema you can specify object properties in the properties attribute.
			'properties' => [
				'id' => [
					'description' => esc_html__( 'Unique identifier for the object.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit', 'embed' ],
					'readonly'    => true,
				],
			],
		];

		return $this->schema;
	}


	/**
	 * Anyone can get a specfic variant.
	 *
	 * @param \WP_REST_Request $request Full details about the request .
	 * @return true | \WP_Error true if the request has access to create items, WP_Error object otherwise .
	 */
	public function get_item_permissions_check( $request ) {
		return true;
	}

	/**
	 * Who can list variants
	 *
	 * @param \WP_REST_Request $request Full details about the request .
	 * @return true | \WP_Error true if the request has access to create items, WP_Error object otherwise .
	 */
	public function get_items_permissions_check( $request ) {
		if ( $request ['archived'] ) {
			return current_user_can( 'edit_sc_prices' );
		}

		return true;
	}

	/**
	 * Who can create variants
	 *
	 * @param \WP_REST_Request $request Full details about the request .
	 * @return true | \WP_Error true if the request has access to create items, WP_Error object otherwise .
	 */
	public function create_item_permissions_check( $request ) {
		return current_user_can( 'publish_sc_prices' );
	}

	/**
	 * Who can edit variants
	 *
	 * @param \WP_REST_Request $request Full details about the request .
	 * @return true | \WP_Error true if the request has access to create items, WP_Error object otherwise .
	 */
	public function update_item_permissions_check( $request ) {
		return current_user_can( 'edit_sc_prices' );
	}

	/**
	 * Who can delete variants
	 *
	 * @param \WP_REST_Request $request Full details about the request .
	 * @return true | \WP_Error true if the request has access to create items, WP_Error object otherwise .
	 */
	public function delete_item_permissions_check( $request ) {
		return current_user_can( 'delete_sc_prices' );
	}
}
