import { useState, useEffect } from "react";
import { useApplications } from "../context/ApplicationsContext";
import {
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

const cache = {};

const AIInsights = () => {
  const { applications } = useApplications();

  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hasData = applications.length > 0;

  // Reset when data changes
  useEffect(() => {
    setInsights(null);
    setError(null);
    setLoading(false);
  }, [applications]);

  const generateInsights = async () => {
    if (!hasData) return;

    const cacheKey = JSON.stringify(applications);

    if (cache[cacheKey]) {
      setInsights(cache[cacheKey]);
      return;
    }

    setLoading(true);
    setError(null);

    const formattedData = applications.map((app) => ({
      role: app.jobRole,
      company: app.companyName,
      status: app.status,
      date: app.dateApplied,
    }));

    const prompt = `
You are an AI career coach.

Analyze the user's job application data and return ONLY JSON:

{
  "summary": "2-3 sentences explaining: main weakness, main strength, and what to improve",
  "recommendations": [
    { "title": "...", "description": "..." }
  ],
  "patterns": ["...", "..."],
  "nextSteps": ["...", "..."],
  "score": number,
  "feedback": "1 sentence explaining the score"
}

Instructions:
- Be specific (avoid generic advice)
- Use user's actual performance patterns
- Summary MUST include:
  1. What is going wrong
  2. What is going well
  3. What to focus on next
- Keep everything concise
- No markdown, only JSON

Data:
${JSON.stringify(formattedData)}
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        setError("Invalid AI response");
        return;
      }

      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      cache[cacheKey] = parsed;
      setInsights(parsed);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100">
        <div className="ml-64 px-8 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              AI Insights
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Smart recommendations to improve your job search
            </p>
          </div>

          {insights && (
            <button
              onClick={() => {
                delete cache[JSON.stringify(applications)];
                generateInsights();
              }}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Regenerate
            </button>
          )}
        </div>
      </div>

      <div className="ml-64 px-8 pb-10 space-y-8 mt-8">
        {/* EMPTY STATE */}
        {!hasData && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <p className="text-gray-500">
              Add applications to unlock AI insights
            </p>
          </div>
        )}

        {/* GENERATE BUTTON */}
        {hasData && !insights && !loading && !error && (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
            <button
              onClick={generateInsights}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
            >
              Generate AI Insights
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm animate-pulse text-gray-500">
            Generating insights...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
        )}

        {/* RESULTS */}
        {insights && !loading && (
          <>
            {/* SUMMARY */}
            <Section title="AI Summary" icon={<FiZap />}>
              {insights.summary}
            </Section>

            {/* RECOMMENDATIONS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-base font-semibold mb-4">Recommendations</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {insights.recommendations?.map((rec, i) => (
                  <Card key={i} icon={<FiTarget />} title={rec.title}>
                    {rec.description}
                  </Card>
                ))}
              </div>
            </div>

            {/* PATTERNS */}
            <ListSection
              title="Patterns"
              items={insights.patterns}
              icon={<FiTrendingUp />}
            />

            {/* NEXT STEPS */}
            <ListSection
              title="Next Steps"
              items={insights.nextSteps}
              icon={<FiCheckCircle />}
            />

            {/* SCORE */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-base font-semibold">Performance Score</h2>
                <p className="text-sm text-gray-500">{insights.feedback}</p>
              </div>

              <div className="text-3xl font-semibold">{insights.score}/100</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIInsights;

// COMPONENTS

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-3 text-purple-500">
      {icon}
      <h2 className="text-base font-semibold text-gray-900">
        {title}
      </h2>
    </div>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);

const Card = ({ icon, title, children }) => (
  <div className="p-4 rounded-2xl bg-[#f8fafc] hover:bg-white hover:shadow-sm transition">
    <div className="flex items-center gap-2 mb-2 text-blue-500">
      {icon}
      <h3 className="text-sm font-medium text-gray-900">
        {title}
      </h3>
    </div>
    <p className="text-xs text-gray-500">{children}</p>
  </div>
);

const ListSection = ({ title, items = [], icon }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h2 className="text-base font-semibold mb-4">{title}</h2>
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-purple-500">{icon}</span>
          {item}
        </div>
      ))}
    </div>
  </div>
);