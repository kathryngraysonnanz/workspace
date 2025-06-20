"use client";
import React from "react";

import { Card } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import TimeTracker from "./timeTracker";
import TodoList from "./toDo";

import styles from "./page.module.css";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2>KendoReact ❤️ Next.js</h2>
        <div>
          <Button themeColor="primary" fillMode="flat" className="k-mr-1">
            Home
          </Button>
          <Button
            themeColor="primary"
            fillMode="flat"
            onClick={() => router.push("/grid")}
          >
            Grid
          </Button>
        </div>
      </header>
      <Card style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <TimeTracker />
      </Card>
      <Card style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <TodoList />
      </Card>
      <div className={styles.container}></div>
      <footer className={styles.footer}>
        <p>Copyright © 2023 Progress Software. All rights reserved.</p>
      </footer>
    </div>
  );
}
