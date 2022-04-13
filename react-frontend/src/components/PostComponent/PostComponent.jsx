import React, { useState, useContext } from 'react'
import './PostComponent.scss';
import {Button, Spinner} from 'react-bootstrap';
import PostVoteComponent from "../PostVoteComponent/PostVoteComponent";
import AddCommentComponent from "../AddCommentComponent/AddCommentComponent";
import { AuthContext } from '../../App';

function PostComponent(props) {
	const context = useContext(AuthContext);
  	const [userWalletAddress] = context;
	const [post] = useState(props.post);
	const [addCommentModalShow, setCommentModalShow] = useState(false);
	const [imgIsLoading, setImgIsLoading] = useState(true);
	const [fileUrl] = useState(`https://ipfs.io/ipfs/${post.fileCid}`);

	return (
		<div className="postContainer">
			<PostVoteComponent />
			<div className="post">
				<div className="postTitle">{post.postTitle}</div>
				<div className="postOwner">Posted by: {post.username ? post.username : post.postOwner}</div>
				{post.fileCid ? 
					(imgIsLoading ?
							<>
							<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
							</Spinner>
							<img src={fileUrl} alt="" onLoad={() => setImgIsLoading(false)}/> 
							</> :
							<img src={fileUrl} alt="" /> 
					) 
					: ""}
					<div className="postBody">{post.postBody}</div>
					<ul className='commentList'>
					{post.comments.map((comment) => {
							return (
							<li key={comment.commentId} className="comment">
									<div className="commentInfoContainer">
									from: <div className="commentOwner"> {comment.username ? comment.username : comment.commentOwner} </div>
									</div>
									<div className="commentInfoContainer">
									<div className="commentBody"> {comment.commentBody}</div>
									</div>
							</li>
							)
					})}
				</ul>
				<Button className="buttons" variant="primary" onClick={async () => {
					setCommentModalShow(true);
				}}>
					Add a Comment
				</Button>
				 <AddCommentComponent 
						userwalletaddress={userWalletAddress}
						postdatacid={post.postDataCid}
						postowner={post.postOwner}
						show={addCommentModalShow}
						onHide={() => setCommentModalShow(false)}
					/>
			</div>
		</div>
  )
}

export default PostComponent