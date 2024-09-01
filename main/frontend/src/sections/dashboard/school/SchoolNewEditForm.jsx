import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { fData } from "../../../utils/formatNumber";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { countries } from "../../../assets/data";
import Label from "../../../components/label";
import { useSnackbar } from "../../../components/snackbar";
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../components/hook-form";
import { createSchool } from "../../../redux/slices/school";

// ----------------------------------------------------------------------

SchoolNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentSchool: PropTypes.object,
};

export default function SchoolNewEditForm({ isEdit = false, currentSchool }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewSchoolSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip is required"),
    country: Yup.string().required("Country is required"),
    phoneNumber: Yup.string(),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    website: Yup.string(),
    type: Yup.string()
      .required("Type is required")
      .oneOf(["Public", "Private", "Charter"]),
    board: Yup.string()
      .required("Board is required")
      .oneOf(["CBSE", "State Board"]),
    isActive: Yup.boolean().default(false),
    isVerified: Yup.boolean().default(false),
    // levels: Yup.array().of(
    //   Yup.string().oneOf(["Elementary", "Middle", "High", "Higher Education"])
    // ),
    logo: Yup.string().nullable(true),
    levels: Yup.string().oneOf([
      "Elementary",
      "Middle",
      "High",
      "Higher Education",
    ]),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentSchool?.name || "",
      logo: currentSchool?.logo || "",
      address: currentSchool?.address || "",
      city: currentSchool?.city || "",
      state: currentSchool?.state || "",
      zip: currentSchool?.zip || "",
      country: currentSchool?.country || "",
      phoneNumber: currentSchool?.phoneNumber || "",
      email: currentSchool?.email || "",
      website: currentSchool?.website || "",
      type: currentSchool?.type || "",
      board: currentSchool?.board || "",
      isActive: currentSchool?.isActive || false,
      isVerified: currentSchool?.isVerified || false,
      levels: currentSchool?.levels || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSchool]
  );

  const methods = useForm({
    resolver: yupResolver(NewSchoolSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  console.log(values);

  useEffect(() => {
    if (isEdit && currentSchool) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSchool]);

  const onSubmit = async (data) => {
    try {
      await createSchool(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      navigate(PATH_DASHBOARD.school.list);
      console.log("DATA", data);
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
        setValue("logo", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.isActive ? "success" : "error"}
                sx={{
                  textTransform: "uppercase",
                  position: "absolute",
                  top: 24,
                  right: 24,
                }}
              >
                {values.isActive ? "Active" : "Inactive"}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="logo"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(event) =>
                          field.onChange(event.target.checked)
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Active
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Apply active status
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: "space-between" }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Disabling this will automatically send the school a
                    verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="name" label="School Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFSelect
                native
                helperText
                name="country"
                label="Country"
                placeholder="Country"
              >
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="zip" label="Zip/Code" />
              <RHFTextField name="website" label="Website" />
              <RHFSelect native name="type" label="Type" placeholder="Type">
                <option value="" />
                <option value="Public">Goverment</option>
                <option value="Private">Private</option>
                {/* <option value="Charter">Charter</option> */}
              </RHFSelect>
              <RHFSelect native name="board" label="Board" placeholder="Board">
                <option value="" />
                <option value="CBSE">CBSE</option>
                <option value="State Board">State Board</option>
              </RHFSelect>
              <RHFSelect
                native
                name="levels"
                label="Levels"
                placeholder="Levels"
                multiple
              >
                <option value="" />
                <option value="Elementary">Elementary (Class 1,2,3,4,5)</option>
                <option value="Middle">Middle (Class 6,7,8)</option>
                <option value="High">High (Class 9,10,11,12)</option>
                {/* <option value="Higher Education">Higher Education</option> */}
              </RHFSelect>

              {/* <RHFTextField name="levels" label="Levels" placeholder="Levels" onChange={(event) => setValue('levels',)} /> */}
              {/* <RHFAutocomplete name="levels" label="Levels" multiple freeSolo ChipProps={{ size: 'small' }} /> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit ? "Create School" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
