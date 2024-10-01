<?php

namespace SureCart\Controllers\Admin\Customers;

use SureCart\Models\Product;
use SureCart\Models\Customer;
use SureCart\Support\Currency;
use SureCart\Support\TimeDate;
use SureCart\Controllers\Admin\Tables\ListTable;
/**
 * Create a new table class that will extend the WP_List_Table
 */
class CustomersListTable extends ListTable {
	/**
	 * Prepare the items for the table to process
	 *
	 * @return Void
	 */
	public function prepare_items() {
		$columns  = $this->get_columns();
		$hidden   = $this->get_hidden_columns();
		$sortable = $this->get_sortable_columns();

		$this->_column_headers = array( $columns, $hidden, $sortable );

		$query = $this->table_data();
		if ( is_wp_error( $query ) ) {
			$this->items = [];
			return;
		}

		$this->set_pagination_args(
			[
				'total_items' => $query->pagination->count,
				'per_page'    => $this->get_items_per_page( 'customerss' ),
			]
		);

		$this->items = $query->data;
	}

	/**
	 * Override the parent columns method. Defines the columns to use in your listing table
	 *
	 * @return Array
	 */
	public function get_columns() {
		return [
			'name'    => __( 'Name', 'surecart' ),
			'email'   => __( 'Email', 'surecart' ),
			'created' => __( 'Created', 'surecart' ),
			'mode'    => '',
		];
	}

	/**
	 * Displays the checkbox column.
	 *
	 * @param Product $product The product model.
	 */
	public function column_cb( $product ) {
		?>
		<label class="screen-reader-text" for="cb-select-<?php echo esc_attr( $product['id'] ); ?>"><?php _e( 'Select comment', 'surecart' ); ?></label>
		<input id="cb-select-<?php echo esc_attr( $product['id'] ); ?>" type="checkbox" name="delete_comments[]" value="<?php echo esc_attr( $product['id'] ); ?>" />
			<?php
	}

	/**
	 * Define which columns are hidden
	 *
	 * @return Array
	 */
	public function get_hidden_columns() {
		return array();
	}

	/**
	 * Define the sortable columns
	 *
	 * @return Array
	 */
	public function get_sortable_columns() {
		return array( 'title' => array( 'title', false ) );
	}

	/**
	 * Get the table data
	 *
	 * @return Object
	 */
	private function table_data() {
		return Customer::with( [ 'orders' ] )
		->where( [ 'query' => $this->get_search_query() ] )
		->paginate(
			[
				'per_page' => $this->get_items_per_page( 'customers' ),
				'page'     => $this->get_pagenum(),
			]
		);
	}

	/**
	 * Nothing found.
	 *
	 * @return void
	 */
	public function no_items() {
		echo esc_html_e( 'No customers found.', 'surecart' );
	}

	/**
	 * Handle the orders column.
	 *
	 * @param \SureCart\Models\Customer $customer Customer model.
	 *
	 * @return string
	 */
	public function column_orders( $customer ) {
		return __( 'No price', 'surecart' );
	}

	/**
	 * The customer email.
	 *
	 * @param \SureCart\Models\Customer $customer The customer model.
	 *
	 * @return string
	 */
	public function column_email( $customer ) {
		return sanitize_email( $customer->email );
	}

	/**
	 * Name column
	 *
	 * @param \SureCart\Models\Customer $customer Customer model.
	 *
	 * @return string
	 */
	public function column_name( $customer ) {
		ob_start();
		?>
		<a class="row-title" aria-label="<?php esc_attr_e( 'Edit Customer', 'surecart' ); ?>" href="<?php echo esc_url( \SureCart::getUrl()->edit( 'customers', $customer->id ) ); ?>">
			<?php echo wp_kses_post( $customer->name ?? $customer->email ); ?>
		</a>

		<?php
		echo $this->row_actions(
			[
				'edit' => '<a href="' . esc_url( \SureCart::getUrl()->edit( 'customers', $customer->id ) ) . '" aria-label="' . esc_attr( 'Edit Customer', 'surecart' ) . '">' . __( 'Edit', 'surecart' ) . '</a>',
			],
		);
		?>

		<?php
		return ob_get_clean();
	}

	/**
	 * Define what data to show on each column of the table
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 * @param String                   $column_name - Current column name.
	 *
	 * @return Mixed
	 */
	public function column_default( $product, $column_name ) {
		switch ( $column_name ) {
			case 'name':
				return '<a href="' . \SureCart::getUrl()->edit( 'product', $product->id ) . '">' . $product->name . '</a>';
			case 'name':
			case 'description':
				return $product->$column_name ?? '';
		}
	}
}
