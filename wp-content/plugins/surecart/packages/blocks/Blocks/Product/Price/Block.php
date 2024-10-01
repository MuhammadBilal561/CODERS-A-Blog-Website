<?php

namespace SureCartBlocks\Blocks\Product\Price;

use SureCart\Support\Currency;
use SureCartBlocks\Blocks\Product\ProductBlock;

/**
 * Product Title Block
 */
class Block extends ProductBlock {
	/**
	 * Keep track of the instance number of this block.
	 *
	 * @var integer
	 */
	public static $instance;

	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content ) {
		$product = $this->getProductAndSetInitialState( $attributes['id'] ?? '' );
		if ( empty( $product ) || empty( $product->activePrices() ) ) {
			return '';
		}

		$attributes = get_block_wrapper_attributes(
			[
				'sale-text'  => esc_attr( $attributes['sale_text'] ?? '' ),
				'class'      => esc_attr( $this->getClasses( $attributes ) . ' product-price surecart-block' ),
				'style'      => esc_attr( $this->getStyles( $attributes ) . ' --sc-product-price-alignment:' . esc_attr( $attributes['alignment'] ?? 'left' ) . '; text-align:' . esc_attr( $attributes['alignment'] ?? 'left' ) . ';' ),
				'product-id' => esc_attr( $product->id ),
			]
		);

		// first price.
		$first_price = $product->activePrices()[0];

		return wp_sprintf(
			'<sc-product-price %1$s>
				%2$s
			</sc-product-price>',
			$attributes,
			esc_html( Currency::format( $first_price->amount, $first_price->currency ) )
		);
	}
}
