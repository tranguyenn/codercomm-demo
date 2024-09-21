import {
  alpha,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteComment, sendCommentReaction } from "./commentSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { updatePost } from "./postSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});



function PostEdit({ post }) {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const defaultValues = {
    content: post.content,
    image: post.image,
  };

  const handleClickOpen = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  //form logic
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    
    const dataEdit={
        postId: post._id,
        content: data.content, 
        image:data.image
    }
    console.log(dataEdit);
    dispatch(updatePost(dataEdit)).then(() => reset());
    handleClose();
  };

  return (
    <Stack direction="row" alignItems="center">
      <Button onClick={handleClickOpen}>
        <EditIcon sx={{ color: "black", mr: "2px" }}>
          <EditIcon sx={{ fontSize: 20 }} />
        </EditIcon>
        <Typography variant="body2" sx={{ color: "black" }}>
          Edit
        </Typography>
      </Button>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ color: "black", fontSize: "30px" }}>
            Edit post
          </Typography>
          <Modal
            open={openEdit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} sx={style}>
                <Typography sx={{ color: "black", fontSize: "30px" }}>
                  Edit post
                </Typography>
                <FTextField
                  name="content"
                  multiline
                  fullWidth
                  rows={4}
                  placeholder="Share what you are thinking here..."
                  sx={{
                    "& fieldset": {
                      borderWidth: `1px !important`,
                      borderColor: alpha("#919EAB", 0.32),
                    },
                  }}
                />

                <FUploadImage
                  name="image"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button color="error" size="small" sx={{mr:2}} onClick={handleClose}>
                    Cancel changes
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={isSubmitting || isLoading}
                  >
                    Edit
                  </LoadingButton>
                </Box>
              </Stack>
            </FormProvider>
          </Modal>
        </Box>
      </Modal>
    </Stack>
  );
}

export default PostEdit;
