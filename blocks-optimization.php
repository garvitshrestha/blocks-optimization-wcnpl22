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

function blocks_optimization_wcnpl22_dynamic_template_cb( $attributes, $contents ) {
	ob_start();
	include __DIR__ . '/templates/template-dynamic.php';
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
