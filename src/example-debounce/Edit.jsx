import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Controls from './Controls';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default ({ attributes, setAttributes }) => {

	return (
		<div {...useBlockProps()}>

			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			<h1>{attributes.heading}</h1>
		</div>
	);
}
