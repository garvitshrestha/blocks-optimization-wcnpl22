import { RichText, useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes: { heading, content }, setAttributes }) {

	const handleRichTextChange = (key, value) => {
		setAttributes({ [key]: value });
	}

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName='h1'
				onChange={(val) => handleRichTextChange('heading', val)}
				value={heading}
			/>

			<RichText
				tagName='p'
				onChange={(val) => handleRichTextChange('content', val)}
				value={content}
			/>
		</div>
	);
}
