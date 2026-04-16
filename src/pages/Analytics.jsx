import React from "react";
import { useApplications } from "../context/ApplicationsContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { FiTrendingDown, FiTarget, FiAlertCircle } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement
);

const Analytics = () => {
  const { applications } = useApplications();

  const total = applications.length;

  const counts = {
    Applied: applications.filter((a) => a.status === "Applied").length,
    Interviewing: applications.filter((a) => a.status === "Interviewing").length,
    Offer: applications.filter((a) => a.status === "Offer").length,
    Rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  // ================= RATES =================
  const interviewRate = total
    ? ((counts.Interviewing / total) * 100).toFixed(0)
    : 0;

  const successRate = total
    ? ((counts.Offer / total) * 100).toFixed(0)
    : 0;

  // ================= SCORE =================
  const score = total
    ? Math.min(100, Math.round(successRate * 1.5 + interviewRate))
    : 0;

  // DROP-OFF 
  const dropOff = Math.max(0, counts.Applied - counts.Interviewing);

  // ================= ROLE PERFORMANCE =================
  const roleMap = {};

  applications.forEach((app) => {
    const role = app.jobRole;

    if (!roleMap[role]) {
      roleMap[role] = { total: 0, interviews: 0 };
    }

    roleMap[role].total++;

    if (app.status === "Interviewing" || app.status === "Offer") {
      roleMap[role].interviews++;
    }
  });

  const bestRole = Object.entries(roleMap).sort(
    (a, b) =>
      b[1].interviews / b[1].total - a[1].interviews / a[1].total
  )[0];

  // ================= LINE CHART =================
  const groupedByDate = {};
  applications.forEach((app) => {
    const date = app.dateApplied;
    groupedByDate[date] = (groupedByDate[date] || 0) + 1;
  });

  const lineData = {
    labels: Object.keys(groupedByDate),
    datasets: [
      {
        label: "Applications",
        data: Object.values(groupedByDate),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // ================= FUNNEL =================
  const funnelData = {
    labels: ["Applied", "Interview", "Offer"],
    datasets: [
      {
        data: [
          counts.Applied,
          counts.Interviewing,
          counts.Offer,
        ],
        backgroundColor: ["#3B82F6", "#8B5CF6", "#EC4899"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">

      {/* HEADER */}
      <div className="ml-64 px-8 pt-10 pb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Insights to improve your job search
        </p>
      </div>

      <div className="ml-64 px-8 pb-10 space-y-10">

        {/* PERFORMANCE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Success Rate" value={`${successRate}%`} accent="bg-green-100 text-green-600" />
          <StatCard title="Interview Rate" value={`${interviewRate}%`} accent="bg-purple-100 text-purple-600" />
          <StatCard title="Score" value={score} accent="bg-blue-100 text-blue-600" />
        </div>

        {/* INSIGHTS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            Insights
          </h2>

          {total === 0 ? (
            <p className="text-sm text-gray-400">
              Add applications to see insights
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <InsightCard
                icon={<FiTrendingDown />}
                title="Drop-off"
                value={dropOff}
                description="Applications lost before interview"
                color="blue"
              />

              {bestRole && (
                <InsightCard
                  icon={<FiTarget />}
                  title="Best Role"
                  value={bestRole[0]}
                  description="Highest interview conversion"
                  color="purple"
                />
              )}

              <InsightCard
                icon={<FiAlertCircle />}
                title="Focus Area"
                value={
                  counts.Rejected > counts.Interviewing
                    ? "Resume"
                    : "Interviews"
                }
                description={
                  counts.Rejected > counts.Interviewing
                    ? "Improve resume to increase shortlisting"
                    : "Work on interview performance"
                }
                color="red"
              />

            </div>
          )}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Conversion Funnel
            </h2>
            <Bar data={funnelData} />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Application Trends
            </h2>
            <Line data={lineData} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;


// ================= COMPONENTS =================

const StatCard = ({ title, value, accent }) => (
  <div className="bg-white rounded-3xl p-5 shadow-sm flex flex-col gap-3">
    <div className="flex justify-between">
      <p className="text-xs text-gray-500">{title}</p>
      <div className={`px-2 py-1 rounded-full text-xs ${accent}`}>●</div>
    </div>
    <p className="text-3xl font-semibold text-gray-900">{value}</p>
  </div>
);

const InsightCard = ({ icon, title, value, description, color }) => {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="rounded-2xl bg-[#f8fafc] p-4 hover:bg-white hover:shadow-sm transition-all">

      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${styles[color]}`}>
          {icon}
        </div>
        <span className="text-xs text-gray-400">{title}</span>
      </div>

      <div className="text-lg font-semibold text-gray-900">
        {value}
      </div>

      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  );
};