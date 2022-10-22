import { RichText, useBlockProps } from '@wordpress/block-editor';
import { withSelect } from "@wordpress/data";
import { __ } from '@wordpress/i18n';
import './editor.scss';

import { Placeholder, Spinner } from "@wordpress/components";
import Controls from './Controls';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ({ attributes, setAttributes, allPosts, selectedPosts }) => {

	return (
		<div {...useBlockProps()}>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				allPosts={allPosts}
			/>

			<div>
				<RichText
					tagName='h1'
					onChange={(val) => {
						setAttributes({ heading: val });
					}}
					value={attributes.heading}
				/>

				<div>
					{
						null === selectedPosts ? <Spinner /> :
							<>
								{
									selectedPosts.length > 0 ?
										<PostLists selectedPosts={selectedPosts} />
										:
										<Placeholder label={__('No posts selected', 'blocks-optimization-wcnpl22')} />
								}
							</>
					}
				</div>
			</div>

		</div>
	);
}


const PostLists = ({ selectedPosts }) => {
	return (
		<div className='bo-wcnpl22-grid'>
			{
				!!selectedPosts.length && selectedPosts.map((selectedPost) => (
					<div key={selectedPost.id}>
						<h4>{selectedPost.title.rendered}</h4>
						<p dangerouslySetInnerHTML={{ __html: selectedPost.excerpt.rendered }} />
					</div>
				))
			}
		</div>
	)
}

export default withSelect((select, props) => {

	const { post_ids } = props.attributes;

	const { getEntityRecords } = select("core");
	const { getCurrentPostId } =
		select("core/block--editor") || select("core/editor"); //double dashes are needed

	return {
		allPosts: getEntityRecords("postType", "post", {
			per_page: -1,
			exclude: [getCurrentPostId()],
		}),
		selectedPosts: getEntityRecords("postType", "post", {
			include: post_ids,
		})
	};

})(Edit);