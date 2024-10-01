<div class="wrap">

<?php
	\SureCart::render( 'layouts/partials/admin-index-styles' );
?>

	<?php
	if ( ! $enabled ) :
		\SureCart::render(
			'admin/abandoned-orders/cta-banner',
		);
	endif;
	?>

	<?php
		\SureCart::render(
			'layouts/partials/admin-index-header',
			[ 'title' => __( 'Abandoned Checkouts', 'surecart' ) ]
		);
		?>

	<div id="stats"></div>

	<?php if ( $enabled ) : ?>
		<?php $table->display(); ?>
	<?php endif; ?>
</div>
