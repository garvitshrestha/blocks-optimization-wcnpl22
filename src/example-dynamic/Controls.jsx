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

	/**
	 * We are doing memoization here so that `generateDropDownOptions` function
	 * do not re-run in every re-render.
	 * Instead, it will only re-run when the dependency of `useMemo` changes.
	 *
	 * This helps in the scenarios when we have to loop through big amount of data.
	 * In such cases, the performance of block decreases as the function gets called
	 * and does same calculation, each time the components re-renders.
	 */
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
