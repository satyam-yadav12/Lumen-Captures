import React, { useEffect, Suspense, useContext } from "react";
import FilterChips from "../components/FilterChips";
import { CircularProgress } from "@mui/material";
import Hero from "../components/Hero/Hero";
import { AuthContext } from "../context/AuthContext";
import { CheckActiveSession } from "../services/authApi";

const Image = React.lazy(() => import("../components/ImageCard/ImageCard"));

const Home = () => {
  const { user, setUser } = useContext(AuthContext)

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
