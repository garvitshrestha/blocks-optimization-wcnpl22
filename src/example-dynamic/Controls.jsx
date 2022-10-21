import { InspectorControls } from '@wordpress/block-editor';
import { useMemo } from "@wordpress/element";
import { SelectControl, PanelBody } from "@wordpress/components";
import { __ } from '@wordpress/i18n';

const generateDropDownOptions = (data = []) => {
	if (!data) return [];

	return data.map((_data) => {
		return {
			value: _data.id,
			label: _data.title.rendered
		}
	})
}

export default ({ attributes, setAttributes, allPosts }) => {

	const options = useMemo(() => generateDropDownOptions(allPosts), [allPosts?.length]);

	return (
		<InspectorControls>
			<PanelBody
				title={__("Example Dynamic Controls", "blocks-optimization-wcnpl22")}
			>
				<SelectControl
					multiple
					value={attributes.post_ids}
					options={options}
					onChange={(post_ids) => {
						setAttributes({ post_ids });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	)
}
