import {applicationSlice} from "@/features/application/slices/applicationSlice";
import {companySlice} from "@/features/company/slices/companySlice";
import {internshipProgramSlice} from '@/features/internship-program/slices/internshipProgramSlice';
import {jobSlice} from "@/features/job/slices/jobSlice";
import {applicationsApi} from "@/services/applicationsApi";
import {citiesApi} from '@/services/citiesApi';
import {companiesApi} from "@/services/companiesApi";
import {internshipProgramsApi} from '@/services/internshipProgramsApi';
import {jobsApi} from "@/services/jobsApi";
import {studentsApi} from '@/services/studentsApi';
import {configureStore, Middleware} from "@reduxjs/toolkit";
import {authSlice} from "@/features/auth/authSlice";
import {industriesApi} from "@/services/industriesApi";
import {jobTypesApi} from "@/services/jobTypesApi";
import {skillsApi} from "@/services/skillsApi";
import {studentSlice} from "@/features/student/slices/studentSlice";
import {createInternshipsApi, internshipsApi} from "@/services/internshipsApi";
import {internshipSlice} from "@/features/internship/slices/internshipSlice";
import {createInternshipSlice} from "@/features/internship/slices/createInternshipSlice";

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
      [industriesApi.reducerPath]: industriesApi.reducer,
      [jobTypesApi.reducerPath]: jobTypesApi.reducer,
      [skillsApi.reducerPath]: skillsApi.reducer,
      [internshipsApi.reducerPath]: internshipsApi.reducer,
      [createInternshipsApi.reducerPath]: createInternshipsApi.reducer,

      auth: authSlice.reducer,
      jobParams: jobSlice.reducer,
      companyParams: companySlice.reducer,
      applicationParams: applicationSlice.reducer,
      studentParams: studentSlice.reducer,
      internshipProgramParams: internshipProgramSlice.reducer,
      internshipParams: internshipSlice.reducer,
      createInternshipParams: createInternshipSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(companiesApi.middleware as Middleware)
            .concat(applicationsApi.middleware as Middleware)
            .concat(jobsApi.middleware as Middleware)
            .concat(citiesApi.middleware as Middleware)
            .concat(internshipProgramsApi.middleware as Middleware)
            .concat(studentsApi.middleware as Middleware)
            .concat(industriesApi.middleware as Middleware)
            .concat(skillsApi.middleware as Middleware)
            .concat(jobTypesApi.middleware as Middleware)
            .concat(internshipsApi.middleware as Middleware)
            .concat(createInternshipsApi.middleware as Middleware)
  });
}

// Infer those type to get the state, store, dispatch per request
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
