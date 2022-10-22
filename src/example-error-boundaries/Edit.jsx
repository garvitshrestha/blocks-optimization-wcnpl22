import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, FormToggle } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from '@wordpress/i18n';

import './editor.scss';
import ErrorBoundary from './ErrorBoundary';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes: { enable }, setAttributes }) {

	return (
		<div {...useBlockProps()}>

			<InspectorControls>
				<PanelBody
					title={__("Example Error Boundary Controls", "blocks-optimization-wcnpl22")}
				>
					<p>Enable Error Boundary</p>
					<FormToggle
						checked={enable}
						onChange={() => setAttributes({ enable: !enable })}
					/>
				</PanelBody>
			</InspectorControls>

			<h5>Error Boundary Will Save Me :)</h5>
			<p>This whole block will crash without the Error Boundary.</p>

			{
				!enable
					?
					<Counter />
					:
					<ErrorBoundary>
						<Counter />
					</ErrorBoundary>
			}
		</div>
	);
}

const Counter = () => {

	const [count, setCount] = useState(0);

	if (count === 5) throw new Error('KaBoom!!!');

	return (
		<div>
			<p>Count: {count}</p>
			<Button variant='primary' onClick={() => setCount(count + 1)}>Increase Count ++</Button>
		</div>
	)
}