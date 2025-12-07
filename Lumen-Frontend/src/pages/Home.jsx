import React, { Suspense } from "react";
import FilterChips from "../components/FilterChips";
import { CircularProgress } from "@mui/material";
import Hero from "../components/Hero/Hero";

const Image = React.lazy(() => import("../components/ImageCard/ImageCard"));

const Home = () => {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <FilterChips />
      </div>
      <div className="mt-5">
        <Suspense fallback={<CircularProgress size={40} />}>
          <Image />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
