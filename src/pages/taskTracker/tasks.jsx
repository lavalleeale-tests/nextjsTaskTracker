import React from "react";
import styles from "../../../styles/Home.module.css";
import { Card } from "@material-ui/core";
import CreateTask from "../../taskTracker/components/CreateTask";
import { useSession, getSession } from "next-auth/client";
import Header from "../../taskTracker/components/Header";

export async function getServerSideProps(context) {
  // Fetch data from external API
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/taskTracker",
        permanent: false,
      },
    };
  }
  const res = await fetch(
    `https://alextesting.ninja/api/taskTracker/getTasks`,
    {
      method: "POST",
      body: session.user.email,
    }
  );
  let response = await res.json();
  const data = await response;

  // Pass data to the page via props
  return { props: { data } };
}

const tasks = ({ data }) => {
  const [session, loading] = useSession();
  if (typeof window !== "undefined" && loading) return null;
  return (
    <>
      <Header />
      <CreateTask />
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {data.map((task) => (
          <li key={task.id}>
            <Card className={styles.card}>
              <h2>{task.name}</h2>
              <p>{task.content}</p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default tasks;
