import {applicationSlice} from "@/features/application/slices/applicationSlice";
import {companySlice} from "@/features/company/slices/companySlice";
import {internshipProgramSlice} from '@/features/internship-program/slices/internshipProgramSlices';
import {jobSlice} from "@/features/job/slices/jobSlice";
import {applicationsApi} from "@/services/applicationsApi";
import {citiesApi} from '@/services/citiesApi';
import {companiesApi} from "@/services/companiesApi";
import {internshipProgramsApi} from '@/services/internshipsApi';
import {jobsApi} from "@/services/jobsApi";
import {studentsApi} from '@/services/studentsApi';
import {configureStore, Middleware} from "@reduxjs/toolkit";
import {studentSlice} from "@/features/student/slices/studentSlice";

// Create store instance per request for strong type safety
export function makeStore() {
  return configureStore({
    reducer: {
      [companiesApi.reducerPath]: companiesApi.reducer,
      [applicationsApi.reducerPath]: applicationsApi.reducer,
      [jobsApi.reducerPath]: jobsApi.reducer,
      [citiesApi.reducerPath]: citiesApi.reducer,
      [internshipProgramsApi.reducerPath]: internshipProgramsApi.reducer,
      [studentsApi.reducerPath]: studentsApi.reducer,

      jobParams: jobSlice.reducer,
      companyParams: companySlice.reducer,
      applicationParams: applicationSlice.reducer,
      internshipProgramParams: internshipProgramSlice.reducer,
      studentParams: studentSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(companiesApi.middleware as Middleware)
            .concat(applicationsApi.middleware as Middleware)
            .concat(jobsApi.middleware as Middleware)
            .concat(citiesApi.middleware as Middleware)
            .concat(internshipProgramsApi.middleware as Middleware)
            .concat(studentsApi.middleware as Middleware),
  });
}

// Infer those type to get the state, store, dispatch per request
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
