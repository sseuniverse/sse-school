import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  students: [],
  student: null,
};

const slice = createSlice({
  name: "student",
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

    // GET STUDENTS
    getStudentsSuccess(state, action) {
      state.isLoading = false;
      state.students = action.payload;
    },

    // GET STUDENT
    getStudentSuccess(state, action) {
      state.isLoading = false;
      state.student = action.payload;
    },

    // CREATE STUDENT
    createStudentSuccess(state, action) {
      state.isLoading = false;
      state.students = [...state.students, action.payload];
    },

    // UPDATE STUDENT
    updateStudentSuccess(state, action) {
      state.isLoading = false;
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (student) => student.id === updatedStudent.id
      );
      state.students[index] = updatedStudent;
    },

    // DELETE STUDENT
    deleteStudentSuccess(state, action) {
      state.isLoading = false;
      const id = action.payload;
      state.students = state.students.filter((student) => student.id !== id);
    },

    // GET STUDENT ADDRESS
    getStudentAddressSuccess(state, action) {
      state.isLoading = false;
      state.student.address = action.payload;
    },

    // GET STUDENT CONTACT
    getStudentContactSuccess(state, action) {
      state.isLoading = false;
      state.student.contact = action.payload;
    },

    // GET STUDENT GUARDIAN
    getStudentGuardianSuccess(state, action) {
      state.isLoading = false;
      state.student.guardian = action.payload;
    },

    // GET STUDENT MEDICAL
    getStudentMedicalSuccess(state, action) {
      state.isLoading = false;
      state.student.medical = action.payload;
    },

    // UPDATE STUDENT ADDRESS
    updateStudentAddressSuccess(state, action) {
      state.isLoading = false;
      state.student.address = action.payload;
    },

    // UPDATE STUDENT CONTACT
    updateStudentContactSuccess(state, action) {
      state.isLoading = false;
      state.student.contact = action.payload;
    },

    // UPDATE STUDENT GUARDIAN
    updateStudentGuardianSuccess(state, action) {
      state.isLoading = false;
      state.student.guardian = action.payload;
    },

    // UPDATE STUDENT MEDICAL
    updateStudentMedicalSuccess(state, action) {
      state.isLoading = false;
      state.student.medical = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getStudentsSuccess,
  getStudentSuccess,
  createStudentSuccess,
  updateStudentSuccess,
  deleteStudentSuccess,
  getStudentAddressSuccess,
  getStudentContactSuccess,
  getStudentGuardianSuccess,
  getStudentMedicalSuccess,
  updateStudentAddressSuccess,
  updateStudentContactSuccess,
  updateStudentGuardianSuccess,
  updateStudentMedicalSuccess,
} = slice.actions;

export function getStudents() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/students");
      dispatch(slice.actions.getStudentsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStudent(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/students/${id}`);
      dispatch(slice.actions.getStudentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createStudent(studentData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/students", studentData);
      dispatch(slice.actions.createStudentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStudent(studentData, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/students/${id}`, studentData);
      dispatch(slice.actions.updateStudentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteStudent(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/api/students/${id}`);
      dispatch(slice.actions.deleteStudentSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStudentAddress(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/students/${id}/address`);
      dispatch(slice.actions.getStudentAddressSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStudentContact(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/students/${id}/contact`);
      dispatch(slice.actions.getStudentContactSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStudentGuardian(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/students/${id}/guardian`);
      dispatch(slice.actions.getStudentGuardianSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStudentMedical(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/students/${id}/medical`);
      dispatch(slice.actions.getStudentMedicalSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStudentAddress(addressData, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `/api/students/${id}/address`,
        addressData
      );
      dispatch(slice.actions.updateStudentAddressSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStudentContact(contactData, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `/api/students/${id}/contact`,
        contactData
      );
      dispatch(slice.actions.updateStudentContactSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStudentGuardian(guardianData, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `/api/students/${id}/guardian`,
        guardianData
      );
      dispatch(slice.actions.updateStudentGuardianSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStudentMedical(medicalData, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `/api/students/${id}/medical`,
        medicalData
      );
      dispatch(slice.actions.updateStudentMedicalSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
