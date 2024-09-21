import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, sendCommentReaction } from "./commentSlice";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



function CommentDelete({ comment }) {
  const dispatch = useDispatch();
 const [open, setOpen] = useState(false);
 
  const handleClickDelete = (emoji) => {
    dispatch(deleteComment({ commentId: comment._id, postId: comment.post }));
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction="row" alignItems="center">
      <Button onClick={handleClickOpen}>
      <DeleteOutlineIcon
        sx={{ color: "grey", fontSize:"12px" }}
      >
        <ThumbUpRoundedIcon sx={{ fontSize: 20 }} />
      </DeleteOutlineIcon>
      <Typography variant="body2"  sx={{color: "grey", fontSize:"11px"}}>
        Delete this comment
      </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Confirm to delete?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this comment
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button color="error" onClick={() => handleClickDelete()}>Yes, sure</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default CommentDelete;