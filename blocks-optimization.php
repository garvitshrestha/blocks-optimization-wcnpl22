<?php
/**
* Plugin Name: Blocks Optimization WCNPL22
*/

/**
 * Exit if accessed directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function blocks_optimization_wcnpl22_dynamic_template_cb( $attributes ) {
	ob_start();
	?>
	<div <?php echo get_block_wrapper_attributes(); ?>>

		<div>
			<h1><?php echo esc_html( $attributes['heading'] ); ?></h1>

			<div>
				<div class="bo-wcnpl22-grid">
					<?php
					$query = new WP_Query(
						array(
							'ignore_sticky_posts' => true,
							'post__in'            => isset( $attributes['post_ids'] ) ? $attributes['post_ids'] : array()
						)
					);

					if ( $query->have_posts() ) {
						while ( $query->have_posts() ) {
							$query->the_post();

							?>
							<div id="grid-item-<?php the_ID(); ?>">
								<?php
									the_title( '<h4>', '</h4>' );
									the_excerpt();
								?>
							</div>
							<?php
						}
					}

					wp_reset_postdata();

					?>
				</div>
			</div>
		</div>

	</div>
	<?php
	return ob_get_clean();
}

function blocks_optimization_wcnpl22_blocks_init() {

	$blocks = array(
		'example-dynamic' => array(
			'render_callback' => 'blocks_optimization_wcnpl22_dynamic_template_cb'
		),
		'example-static' => array(),
	);

	if ( is_array( $blocks ) && ! empty( $blocks ) ) {
		foreach ( $blocks as $foldername => $args ) {
			register_block_type( __DIR__ . '/build/' . $foldername, $args );
		}
	}
}
add_action( 'init', 'blocks_optimization_wcnpl22_blocks_init' );
