"use client";

import {useEffect} from "react";
import {useSession} from "next-auth/react";
import {setToken, setUser} from "@/features/auth/authSlice";
import {useAppDispatch} from "@/libs/rtk/hooks";

export default function AuthSessionSync() {
  const {data: session} = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.accessToken) {
      dispatch(setUser(session.user));
      dispatch(setToken(session.accessToken));
    }
  }, [session, dispatch]);

  return null;
}
