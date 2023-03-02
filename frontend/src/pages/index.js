import { Authenticator } from "./node_modules/ui-react";

export const Home = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello, {user.username}!</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}