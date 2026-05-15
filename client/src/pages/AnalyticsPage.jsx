import { useEffect,useState,} from "react";

import {useParams,} from "react-router-dom";

import {getAnalytics,} from "../api/analytics.api";

import { socket }from "../lib/socket";

const AnalyticsPage = () => {

  const { pollId } =useParams();

  const [analytics,setAnalytics] =useState(null);

  const [loading,setLoading] =useState(true);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const response =await getAnalytics(pollId);

          setAnalytics(response.data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchAnalytics();

  }, [pollId]);

  useEffect(() => {

  socket.emit(
    "join-poll",
    pollId
  );

  socket.on(
    "analytics-updated",
    (data) => {

      setAnalytics(data);

    }
  );

  return () => {

    socket.off(
      "analytics-updated"
    );
  };

}, [pollId]);

  return (
    <div>
      Analytics Page
    </div>
  );
};

export default AnalyticsPage;