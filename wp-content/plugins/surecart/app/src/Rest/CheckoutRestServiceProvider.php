<?php

namespace SureCart\Rest;

use SureCart\Rest\RestServiceInterface;
use SureCart\Controllers\Rest\CheckoutsController;
use SureCart\Form\FormValidationService;
use SureCart\Models\User;

/**
 * Service provider for Price Rest Requests
 */
class CheckoutRestServiceProvider extends RestServiceProvider implements RestServiceInterface {
	/**
	 * Endpoint.
	 *
	 * @var string
	 */
	protected $endpoint = 'checkouts';

	/**
	 * Rest Controller
	 *
	 * @var string
	 */
	protected $controller = CheckoutsController::class;

	/**
	 * Methods allowed for the model.
	 *
	 * @var array
	 */
	protected $methods = [ 'index', 'create', 'find', 'edit' ];

	/**
	 * Register Additional REST Routes
	 *
	 * @return void
	 */
	public function registerRoutes() {
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\S+)/finalize/',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'finalize' ),
					'permission_callback' => [ $this, 'finalize_permissions_check' ],
				],
				// Register our schema callback.
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\S+)/confirm/',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'confirm' ),
					'permission_callback' => [ $this, 'confirm_permissions_check' ],
				],
				// Register our schema callback.
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\S+)/manually_pay/',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'manuallyPay' ),
					'permission_callback' => [ $this, 'manually_pay_permissions_check' ],
				],
				// Register our schema callback.
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\S+)/cancel/',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'cancel' ),
					'permission_callback' => [ $this, 'cancel_item_permissions_check' ],
				],
				// Register our schema callback.
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\S+)/offer_bump/(?P<bump_id>\S+)',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'offerBump' ),
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				// Register our schema callback.
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\S+)/offer_upsell/(?P<upsell_id>\S+)',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'offerUpsell' ),
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				// Register our schema callback.
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
		register_rest_route(
			"$this->name/v$this->version",
			$this->endpoint . '/(?P<id>\S+)/decline_upsell/(?P<upsell_id>\S+)',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => $this->callback( $this->controller, 'declineUpsell' ),
					'permission_callback' => [ $this, 'update_item_permissions_check' ],
				],
				// Register our schema callback.
				'schema' => [ $this, 'get_item_schema' ],
			]
		);
	}

	/**
	 * Get our sample schema for a post.
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
				'id'          => [
					'description' => esc_html__( 'Unique identifier for the object.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'view', 'edit', 'embed' ],
					'readonly'    => true,
				],
				'currency'    => [
					'description' => esc_html__( 'The currency for the session.', 'surecart' ),
					'type'        => 'string',
				],
				'metadata'    => [
					'description' => esc_html__( 'Metadata for the order.', 'surecart' ),
					'type'        => 'object',
					// 'context'     => [ 'edit' ],
				],
				'customer_id' => [
					'description' => esc_html__( 'The customer id for the order.', 'surecart' ),
					'type'        => 'string',
					'context'     => [ 'edit' ],
				],
				'customer'    => [
					'description' => esc_html__( 'The customer for the session.', 'surecart' ),
					'type'        => 'object',
					'context'     => [ 'edit' ],
				],
				'line_items'  => [
					'description' => esc_html__( 'The line items for the session.', 'surecart' ),
					'type'        => 'object',
				],
				'discount'    => [
					'description' => esc_html__( 'The discount for the session.', 'surecart' ),
					'type'        => 'object',
				],
			],
		];

		return $this->schema;
	}

	/**
	 * Finalizing an order requires some server side form validation.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function finalize_permissions_check( \WP_REST_Request $request ) {
		// form id or a product id is required.
		if ( empty( $request['form_id'] ) && empty( $request['product_id'] ) ) {
			return new \WP_Error( 'form_id_required', esc_html__( 'Form ID is required.', 'surecart' ), [ 'status' => 400 ] );
		}

		// get form.
		if ( ! empty( $request['form_id'] ) ) {
			$form = get_post( $request['form_id'] );
			if ( ! $form || 'sc_form' !== $form->post_type ) {
				return new \WP_Error( 'form_id_invalid', esc_html__( 'Form ID is invalid.', 'surecart' ), [ 'status' => 400 ] );
			}
			// validate form input based on saved form content.
			$validator = new FormValidationService( $form->post_content, $request->get_body_params() );
			$validated = $validator->validate();
			if ( is_wp_error( $validated ) ) {
				return $validated;
			}
		}

		return true;
	}

	/**
	 * Confirming an order was paid for.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function confirm_permissions_check( \WP_REST_Request $request ) {
		return $this->get_item_permissions_check( $request );
	}

	/**
	 * Filters a response based on the context defined in the schema.
	 *
	 * @since 4.7.0
	 *
	 * @param array|\WP_REST_Response $data    Response data to filter.
	 * @param string                  $context Context defined in the schema.
	 * @return array Filtered response.
	 */
	public function filter_response_by_context( $data, $context ) {
		$schema = $this->get_item_schema();

		// if the user can edit customers, show the edit context.
		if ( current_user_can( 'edit_sc_customers' ) ) {
			return rest_filter_response_by_context( $data, $schema, 'edit' );
		}

		$data = is_a( $data, 'WP_REST_Response' ) ? $data->get_data() : $data;

		// if the user is logged in, and we have customer data.
		// if it matches the current customer, then we can show the edit context.
		if ( is_user_logged_in() && ! empty( $data['customer'] ) ) {
			$customer_id = ! empty( $data['customer']['id'] ) ? $data['customer']['id'] : $data['customer'];
			if ( User::current()->customerId() === $customer_id ) {
				return rest_filter_response_by_context( $data, $schema, 'edit' );
			}
		}

		return rest_filter_response_by_context( $data, $schema, 'view' );
	}


	/**
	 * Anyone can get a specific order if they have the unique order id.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function get_item_permissions_check( $request ) {
		return true;
	}

	/**
	 * Listing
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function get_items_permissions_check( $request ) {
		return current_user_can( 'read_sc_checkouts', $request->get_params() );
	}

	/**
	 * Anyone can create.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function create_item_permissions_check( $request ) {
		return true;
	}

	/**
	 * Update permissions.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function update_item_permissions_check( $request ) {
		return true;
	}

	/**
	 * Nobody can delete.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return false
	 */
	public function delete_item_permissions_check( $request ) {
		return false;
	}

	/**
	 * Can the user manually mark the checkout as paid?
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 *
	 * @return boolean
	 */
	public function manually_pay_permissions_check( $request ) {
		return current_user_can( 'edit_sc_checkouts' );
	}

	/**
	 * Cancelling orders.
	 *
	 * @param \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has access to create items, WP_Error object otherwise.
	 */
	public function cancel_item_permissions_check( $request ) {
		return current_user_can( 'edit_sc_orders' );
	}
}
