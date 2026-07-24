import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import WhoWeAre from './components/WhoWeAre';
import WhatHappened from './components/WhatHappened';
import Wangchuk from './components/Wangchuk';
import Demands from './components/Demands';
import Timeline from './components/Timeline';
import EvidenceWall from './components/EvidenceWall';
import UploadForm from './components/UploadForm';
import Footer from './components/Footer';
import CockroachCursor from './components/CockroachCursor';

export default function App() {
  // Bumping this forces the Evidence Wall to refetch after a new submission —
  // once fetchEvidence() hits a real database this still works the same way.
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <CockroachCursor />
      <Nav />
      <Hero />
      <Stats />
      <div className="thread" />
      <WhoWeAre />
      <div className="thread" />
      <WhatHappened />
      <div className="thread" />
      <Wangchuk />
      <div className="thread" />
      <Demands />
      <Timeline />
      <div className="thread" />
      <EvidenceWall refreshKey={refreshKey} />
      <div className="thread" />
      <UploadForm onSubmitted={() => setRefreshKey((k) => k + 1)} />
      <Footer />
    </>
  );
}
