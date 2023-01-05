import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, __experimentalInputControl as InputControl } from "@wordpress/components";
import { __ } from '@wordpress/i18n';
import { useDebounce } from './hooks';

export default ({ attributes: { heading }, setAttributes }) => {

	const debounceCallback = (value) => {
		setAttributes({ heading: value });
	}

	const debounce = useDebounce(debounceCallback, 1000);

	return (
		<InspectorControls>
			<PanelBody
				title={__("Example Debounce Controls", "blocks-optimization-wcnpl22")}
			>
				<InputControl
					value={heading}
					onChange={(value) => debounce(value)}
				/>

				<p>The delay is set to 1000 ms.</p>
			</PanelBody>
		</InspectorControls>
	)
}
