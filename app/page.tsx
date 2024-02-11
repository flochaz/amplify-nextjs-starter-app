// app/page.tsx
"use client";
import "@aws-amplify/ui-react/styles.css";
import Logout from "@/components/Logout";
import {  withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";


 function App() {
  const [user, setUser] = useState<AuthUser|undefined>();
  useEffect(() => {
    getCurrentUser().then((user) => setUser(user));
  }
  , []);

  return (
    <>
      <h1>Hello, Amplify 👋</h1>
      {user && <Logout />}

    </>
  );
}

export default withAuthenticator(App);