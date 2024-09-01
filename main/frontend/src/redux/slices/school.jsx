import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  schools: [],
  school: null,
};

const slice = createSlice({
  name: "school",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET SCHOOLS
    getSchoolsSuccess(state, action) {
      state.isLoading = false;
      state.schools = action.payload;
    },

    // GET SCHOOL
    getSchoolSuccess(state, action) {
      state.isLoading = false;
      state.school = action.payload;
    },

    // CREATE SCHOOL
    createSchoolSuccess(state, action) {
      state.isLoading = false;
      state.schools = [...state.schools, action.payload];
    },

    // UPDATE SCHOOL
    updateSchoolSuccess(state, action) {
      state.isLoading = false;
      const updatedSchool = action.payload;
      const index = state.schools.findIndex(
        (school) => school.id === updatedSchool.id
      );
      state.schools[index] = updatedSchool;
    },

    // DELETE SCHOOL
    deleteSchoolSuccess(state, action) {
      state.isLoading = false;
      const id = action.payload;
      state.schools = state.schools.filter((school) => school.id !== id);
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getSchoolSuccess,
  getSchoolsSuccess,
  createSchoolSuccess,
  updateSchoolSuccess,
  deleteSchoolSuccess,
} = slice.actions;

export function getSchools() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/schools");
      dispatch(slice.actions.getSchoolsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSchool(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/schools/${id}`);
      dispatch(slice.actions.getSchoolSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createSchool(schoolData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/schools", schoolData);
      dispatch(slice.actions.createSchoolSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateSchool(schoolData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `/api/schools/${schoolData.id}`,
        schoolData
      );
      dispatch(slice.actions.updateSchoolSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSchool(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/api/schools/${id}`);
      dispatch(slice.actions.deleteSchoolSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
