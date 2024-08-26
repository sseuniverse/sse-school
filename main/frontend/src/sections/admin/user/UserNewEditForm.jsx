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
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../components/hook-form";

// ----------------------------------------------------------------------

UserNewEditForm.protoTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    company: Yup.string().required("Company is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    role: Yup.string().required("Role is required"),
    avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phoneNumber: currentUser?.phoneNumber || "",
      address: currentUser?.address || "",
      country: currentUser?.country || "",
      state: currentUser?.state || "",
      city: currentUser?.city || "",
      zipCode: currentUser?.zipCode || "",
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || "",
      role: currentUser?.role || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {}
}
