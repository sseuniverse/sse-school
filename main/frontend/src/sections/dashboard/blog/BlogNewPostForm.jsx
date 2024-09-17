import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Grid, Card, Stack, Button, Typography } from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { useSnackbar } from "../../../components/snackbar";
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from "../../../components/hook-form";
import BlogNewPostPreview from "./BlogNewPostPreview";
import axios from "../../../utils/axios";
import { useAuthContext } from "../../../auth/useAuthContext";

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  "Toy Story 3",
  "Logan",
  "Full Metal Jacket",
  "Dangal",
  "The Sting",
  "2001: A Space Odyssey",
  "Singin' in the Rain",
  "Toy Story",
  "Bicycle Thieves",
  "The Kid",
  "Inglourious Basterds",
  "Snatch",
  "3 Idiots",
];

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openPreview, setOpenPreview] = useState(false);
  const { user } = useAuthContext();

  const lo = user.photoURL
    ? user.photoURL
    : "https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp";

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    tags: Yup.array().min(2, "Must have at least 2 tags"),
    metaKeywords: Yup.array().min(1, "Meta keywords is required"),
    cover: Yup.mixed().required("Cover is required").nullable(true),
    content: Yup.string().required("Content is required"),
    author: Yup.object().shape({
      _id: Yup.string().default(user._id),
      name: Yup.string().default(user.displayName),
      avatarUrl: Yup.string().default(lo),
    }),
  });

  const defaultValues = {
    title: "",
    description: "",
    content: "",
    cover: null,
    tags: ["The Kid"],
    publish: true,
    comment: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    author: {
      _id: user._id,
      name: user.displayName,
      avatarUrl: lo,
    },
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();
  // console.log(values);

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/posts", data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar("Post success!");
      navigate(PATH_DASHBOARD.blog.posts);
      // console.log("DATA", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("cover", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue("cover", null);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Post Title" />

              <RHFTextField
                name="description"
                label="Description"
                multiline
                rows={3}
              />

              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Content
                </Typography>

                <RHFEditor simple name="content" />
              </Stack>

              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  Cover
                </Typography>

                <RHFUpload
                  name="cover"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <RHFSwitch
                  name="publish"
                  label="Publish"
                  labelPlacement="start"
                  sx={{
                    mb: 1,
                    mx: 0,
                    width: 1,
                    justifyContent: "space-between",
                  }}
                />

                <RHFSwitch
                  name="comment"
                  label="Enable comments"
                  labelPlacement="start"
                  sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
                />
              </div>

              <RHFAutocomplete
                name="tags"
                label="Tags"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option)}
                ChipProps={{ size: "small" }}
              />

              <RHFTextField name="metaTitle" label="Meta title" />

              <RHFTextField
                name="metaDescription"
                label="Meta description"
                fullWidth
                multiline
                rows={3}
              />

              <RHFAutocomplete
                name="metaKeywords"
                label="Meta keywords"
                multiple
                freeSolo
                options={TAGS_OPTION.map((option) => option)}
                ChipProps={{ size: "small" }}
              />
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              onClick={handleOpenPreview}
            >
              Preview
            </Button>

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Post
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>

      <BlogNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}
