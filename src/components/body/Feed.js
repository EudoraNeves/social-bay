import React, { useEffect } from 'react'
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

const posts = [
  {
    id: 1,
    avatar: 'avatar1.jpg',
    username: 'Jack Bean',
    userTitle: 'HR hunter',
    content: 'This is post 1. ',
    likes: 123,
    comments: 25,
    shares: 8
  },
  {
    id: 2,
    avatar: 'avatar2.png',
    username: 'Mario Funny',
    userTitle: 'recruiter',
    content: 'This is post 2. ',
    likes: 56,
    comments: 1,
    shares: 1
  },
  {
    id: 3,
    avatar: 'avatar3.png',
    username: 'Fabio Silly',
    userTitle: 'Talent hunter',
    content: 'This is post 3. ',
    likes: 12,
    comments: 0,
    shares: 0
  }
]

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
  content: ''
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
  const [postDate, dispatch] = useReducer(reducer, initialPostData)

  const submitPost = (e) => {
    e.preventDefault()
    console.log(JSON.stringify(postDate));
  }

  // useEffect(() => {
  //   console.log(submitPost())
  // }, [postDate])

  return (
    <div className='feed'>

      {/* Create A Post */}
      <div className="feed__createPost">
        <h3>Create a post</h3>
        <form onSubmit={submitPost}>
          <select name="visibility" id="visibility" value={postDate.visibility} onChange={(e) => dispatch({
            type: "visibility",
            value: e.target.value
          })}>
            <option value="public">public</option>
            <option value="friends only">friends only</option>
            <option value="private">private</option>
          </select>
          <input type="text" name="createPost__title" id="" value={postDate.title} onChange={e => {
            dispatch({
              type: "inputs",
              key: "title",
              value: e.target.value
            })
          }} placeholder='title' />
          <textarea name="" id="" cols="30" rows="10" value={postDate.content} onChange={e => dispatch({
            type: "inputs",
            key: "content",
            value: e.target.value
          })} placeholder='What do you want to talk about?'></textarea>
          <div className="createPost__attachments">
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
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
      <h3>Friends' Stream</h3>
        {posts.map(post => {
          return (
            <div key={post.id} className="feed__post">
              <div className="feed__userInfo">
                <Avatar src={post.avatar} className="feed__userInfo__left" />
                <div className="feed__userInfo__right">
                  <h4>{post.username}</h4>
                  <p>{post.userTitle}</p>
                </div>
              </div>
              <div className="feed__postContent">
                <p>{post.content}</p>
              </div>
              <div className="feed__postStats">
                <p>
                  {post.likes > 0 ? post.likes : ''} {post.likes > 1 ? 'likes' : post.comments == 1 ? 'likes' : ''}
                  {post.comments > 0 ? ' - ' : ''} {post.comments > 0 ? post.comments : ''} {post.comments > 1 ? 'comments' : post.comments == 1 ? 'comment' : ''}
                  {post.shares > 0 ? ' - ' : ''} {post.shares > 0 ? post.shares : ''} {post.shares > 1 ? 'shares' : post.shares == 1 ? 'share' : ''}</p>
              </div>
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