import React, { useEffect,useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const CommentWidget = ({ isCommentOn, postID }) => {
  const [comments,setComments]= useState([])
  const token = useSelector((state) => state.token);
  const getComments = async () => {
    const response = await fetch(
      `http://localhost:5001/posts/${postID}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setComments(data)

  };

  useEffect(() => {
    if (isCommentOn) {
      getComments()
    }
  },[isCommentOn]);
 

  return (
    <Dialog open={isCommentOn}>
      <DialogTitle>Title</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {comments.map((comment,i)=>(
            <Typography key={i}>
              {comment}
            </Typography>
          ))}

        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CommentWidget;
