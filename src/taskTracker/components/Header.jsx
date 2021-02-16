import React from "react";
import { Card } from "@material-ui/core";
import styles from "../../../styles/Home.module.css";

const Header = () => {
  return (
    <Card className={styles.card}>
      <h2>Lavalleeale's SSR test</h2>
    </Card>
  );
};

export default Header;
