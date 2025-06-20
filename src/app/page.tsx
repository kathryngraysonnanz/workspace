"use client";
import React from "react";
import { GridLayout } from "@progress/kendo-react-layout"; // Import GridLayout
import { Card } from "@progress/kendo-react-layout";
import Header from "./header";
import TimeTracker from "./timeTracker";
import TodoList from "./toDo";
import NoteTakingArea from "./notes";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <Header />
      <GridLayout
        cols={[{ width: '1fr' }, { width: '2fr' }, { width: '1fr' }]} // Define a 3-column layout
        style={{ padding: "20px", gap: "20px" }} // Set padding and gaps
      >
        <div>
          <Card style={{ padding: "20px" }}>
            <TimeTracker />
          </Card>
        </div>
        <div>
          <Card style={{ padding: "20px" }}>
            <TodoList />
          </Card>
        </div>
        <div>
          <Card style={{ padding: "20px" }}>
            <NoteTakingArea />
          </Card>
        </div>
      </GridLayout>
      <footer className={styles.footer}>
        <p>Copyright © 2023 Progress Software. All rights reserved.</p>
      </footer>
    </div>
  );
}