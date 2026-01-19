'use client'
// import { auth0 } from "@/lib/auth0";
// import LoginButton from "@/components/LoginButton";
// import LogoutButton from "@/components/LogoutButton";
import { useState } from 'react'
export default function Home() {
  // const session = await auth0.getSession();
  // const bearer = `Bearer ${session?.tokenSet.accessToken}`
  // const responseUser = await fetch("https://sharp.kurz.fyi/api/me", {
  //   headers: {
  //     Authorization: bearer,
  //   },
  // });
  // const user = session?.user;
  // const userData = await responseUser.json();
  const [a, setA] = useState(false)
  return (
    <div className="app-container">
      <button onClick={() => setA(true)}>teste</button>
      <div className="main-card-wrapper">
        <div className="action-card">
          { a ? 'aa' : 'bb' }
          {/* {user ? (
            <div className="logged-in-section">
              <p className="logged-in-message">✅ Successfully logged in!</p>
              <LogoutButton />
            </div>
          ) : (
            <>
              <p className="action-text">
                Welcome! Please log in to access your protected content.
              </p>
              <LoginButton />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}