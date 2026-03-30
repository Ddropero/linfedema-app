import { useState, useRef } from "react";
import { F, P } from "../../styles/palette";
import PHome from "./PHome";
import PEdu from "./PEdu";
import PSelfCare from "./PSelfCare";
import PEmotional from "./PEmotional";
import PExercise from "./PExercise";
import PSurgery from "./PSurgery";
import PStages from "./PStages";
import PFAQ from "./PFAQ";
import PAlarm from "./PAlarm";
import PQOL from "./PQOL";
import PBlog from "./PBlog";
import PBlogPost from "./PBlogPost";

export default function PatientPortal({ user }) {
  const [pg, setPg] = useState("home");
  const ref = useRef(null);
  const nav = p => { setPg(p); ref.current?.scrollTo(0, 0); };
  const renderPage = () => {
    if (pg.startsWith("blogpost_")) return <PBlogPost nav={nav} postId={pg.replace("blogpost_","")} />;
    const pages = { home: <PHome nav={nav} />, edu: <PEdu nav={nav} />, selfcare: <PSelfCare nav={nav} />, emotional: <PEmotional nav={nav} />, exercise: <PExercise nav={nav} />, surgery: <PSurgery nav={nav} />, stages: <PStages nav={nav} />, faq: <PFAQ nav={nav} />, alarm: <PAlarm nav={nav} />, qol: <PQOL nav={nav} />, blog: <PBlog nav={nav} /> };
    return pages[pg] || pages.home;
  };
  return <div ref={ref} style={{ minHeight: "100vh", background: P.bg, fontFamily: F.b, overflowY: "auto" }}><div style={{ maxWidth: 820, margin: "0 auto", padding: "30px 26px 56px" }}>{renderPage()}</div></div>;
}
