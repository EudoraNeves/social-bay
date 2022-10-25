import React, { useEffect, useState } from 'react'
import { useReducer } from 'react';
import "./Feed.css"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShareIcon from '@mui/icons-material/Share';
import Action from './Action';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import firebase from 'firebase/compat/app';
import { db } from '../../app/firebase';
import { storage } from '../../app/firebase';
import { ref, uploadBytes } from 'firebase/storage'; 


const actions = [
  {
    icon: ThumbUpAltIcon,
    action: 'Like',
  },
  {
    icon: RateReviewIcon,
    action: 'Comment',
  },
  {
    icon: ShareIcon,
    action: 'Share',
  }
]

const initialPostData = {
  avatar: 'avatar.jpg',
  username: 'Hai Na',
  userTitle: 'Junior Web Developer',
  likes: 0,
  comments: 0,
  shares: 0,
  visibility: 'public',
  title: '',
  content: '',
  image: null, 
}

function reducer(state, action) {
  switch (action.type) {
    case "inputs":
      return {
        ...state,
        [action.key]: action.value
      }
    case "visibility":
      return {
        ...state,
        visibility: state.visibility
      }
    default:
      return state
  }
}

function Feed() {
  const [postData, dispatch] = useReducer(reducer, initialPostData)
  const [posts, setPosts] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const imagesRef = ref(storage, `images`)
  /* firebase storage reference
  root folder ref:
  - const ref = ref(storage)
  - const ref = imageRef.root
  - const ref = imagesRef.parent

  child folder ref: 
  - const imagesRef = ref(storage, 'images')

  specific file/image ref: 
  - const imageRef = ref(storage, 'images/image.jpg')
    -> imageRef.fullPath: 'images/image.jpg'
    -> imageRef.name: 'image.jpg'
  */

  useEffect(() => {
    console.log('aha')
    //create a realtime-listener to the post collection in db
    db.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => ({
        //get posts from firebase
        id: doc.id,
        data: doc.data(),
      }))
      console.log(posts)
      setPosts(posts)
    })
  }, [])

  const submitPost = (e) => {
    e.preventDefault()
    //add my new post(const postData) to posts collection in db
    db.collection('posts').add({
      ...postData,
      image: 'Image in the firebase storage bucket: social-bay-af7f3.appspot.com',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //upload and store image
    if(postData.image == null) return;
    const imageRef = ref(storage, `images/${postData.image.name}`)
    uploadBytes(imageRef, postData.image).then(()=>{
      alert('Image uploaded!')
    }).catch(error => {
      console.log(error)
    })
    // {postData.image && console.log(URL.createObjectURL(postData.image))}
  
    //reset post's inputs' values after submitting a post
    postData.title = ''
    postData.content = ''
    postData.image = null
  }

  return (
    <div className='feed'>

      {/* Create A Post */}
      <div className="feed__createPost">
        <h3>Create a post</h3>
        <form onSubmit={submitPost}>
          {/* visibility */}
          <select name="visibility" id="visibility" value={postData.visibility} onChange={(e) => dispatch({
            type: "visibility",
            value: e.target.value
          })}>
            <option value="public">public</option>
            <option value="friends only">friends only</option>
            <option value="private">private</option>
          </select>
          {/* title */}
          <input type="text" name="createPost__title" id="" value={postData.title} onChange={e => {
            dispatch({
              type: "inputs",
              key: "title",
              value: e.target.value
            })
          }} placeholder='title' />
          {/* content */}
          <textarea name="" id="" cols="30" rows="10" value={postData.content} onChange={e => dispatch({
            type: "inputs",
            key: "content",
            value: e.target.value
          })} placeholder='What do you want to talk about?'></textarea>
          {/* attachements: photo */}
          <div className="createPost__attachments">
          {postData.image &&
              <div className="createPost__imgContainer">
                <img src={URL.createObjectURL(postData.image)} alt="" />
              </div>}
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={e => dispatch({
                type: "inputs",
                key: "image",
                value: e.target.files[0]
              })} />
              <PhotoCamera />
            </IconButton>
          </div>
          <Button type="submit" variant="contained">
            submit
          </Button>
        </form>
      </div>

      {/* Post List */}
      <div className="feed__posts">
        <h3>Friends' stream</h3>
        {posts.map(({ id, data: { avatar, username, userTitle, likes, comments, shares, title, content, image } }) => {
          return (
            <div key={id} className="feed__post">
              {/* post user info */}
              <div className="feed__userInfo">
                <Avatar src={avatar} className="feed__userInfo__left" />
                <div className="feed__userInfo__right">
                  <h4>{username}</h4>
                  <p>{userTitle}</p>
                </div>
              </div>
              {/* post content */}
              <div className="feed__postContent">
                <h5>{title}</h5>
                <p>{content}</p>
                {/* {image && <img src={URL.createObjectURL(image)} alt="not found" className="feed__postImg" />} */}
              </div>
              {/* post stats */}
              <div className="feed__postStats">
                <p>
                  {likes > 0 ? likes : ''} {likes > 1 ? 'likes' : comments == 1 ? 'likes' : ''}
                  {comments > 0 ? ' - ' : ''} {comments > 0 ? comments : ''} {comments > 1 ? 'comments' : comments == 1 ? 'comment' : ''}
                  {shares > 0 ? ' - ' : ''} {shares > 0 ? shares : ''} {shares > 1 ? 'shares' : shares == 1 ? 'share' : ''}</p>
              </div>
              {/* post actions */}
              <div className="feed__actions">
                {actions.map(action => {
                  return (
                    <Action key={action.action} Icon={action.icon} action={action.action} />
                  )
                })}
                <div className="action btn__delete">
                  <Button variant="outlined" startIcon={<DeleteIcon />} size="small">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Feed