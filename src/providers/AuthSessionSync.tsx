"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/features/auth/authSlice";

export default function AuthSessionSync() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.accessToken) {
      dispatch(setUser(session.user));
      dispatch(setToken(session.accessToken));
    }
  }, [session, dispatch]);

  return null;
}
