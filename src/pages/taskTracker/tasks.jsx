import React from "react";
import styles from "../../../styles/Home.module.css";
import { Card, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
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
      method: "GET",
      headers: { email: session.user.email },
    }
  );
  let response = await res.json();
  const data = await response;

  // Pass data to the page via props
  return { props: { data } };
}

const tasks = ({ data }) => {
  async function deleteTask(id) {
    console.log(id);
    const res = await fetch(
      `https://alextesting.ninja/api/taskTracker/deleteTask`,
      {
        method: "DELETE",
        body: id,
      }
    );
    window.location.reload();
  }
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
              <IconButton
                onClick={() => deleteTask(task.id)}
                style={{ float: "right" }}
              >
                <Delete />
              </IconButton>
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
