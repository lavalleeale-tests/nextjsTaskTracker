import { signIn, signOut, useSession, getSession } from "next-auth/client";
import styles from "../../../styles/Home.module.css";
import { Card, Button } from "@material-ui/core";

export default function protectedPage() {
  const [session] = useSession();

  return (
    <Card className={styles.card}>
      {!session && (
        <>
          Not signed in <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            onClick={() => signIn()}
          >
            Sign in
          </Button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            onClick={signOut}
          >
            Log Out
          </Button>
        </>
      )}
    </Card>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/taskTracker/tasks",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
