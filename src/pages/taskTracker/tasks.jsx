import React from "react";
import CreateTask from "../../taskTracker/components/CreateTask";
import { useSession, getSession } from "next-auth/client";
import Header from "../../taskTracker/components/Header";
import Task from "../../taskTracker/components/Task";

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
  const res = await fetch(`${process.env.API_URL}/api/taskTracker/getTasks`, {
    method: "GET",
    headers: { email: session.user.email },
  });
  let response = await res.json();
  const data = await response;

  // Pass data to the page via props
  return { props: { data, API_URL: process.env.API_URL } };
}

const tasks = ({ data, API_URL }) => {
  async function deleteTask(id) {
    const res = await fetch(`${API_URL}/api/taskTracker/deleteTask`, {
      method: "DELETE",
      body: id,
    });
    window.location.reload();
  }
  async function updateTask(id, name, content) {
    const res = await fetch("/api/taskTracker/updateTask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        content,
      }),
    });
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
            <Task
              task={task}
              updateFunc={(title, content) =>
                updateTask(task.id, title, content)
              }
              deleteFunc={() => deleteTask(task.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default tasks;
