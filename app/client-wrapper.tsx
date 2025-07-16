'use client';

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export default function ClientWrapper() {
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.region) {
          track('user_state', { state: data.region });
        }
      })
      .catch(console.error);
  }, []);

  return null;
}
