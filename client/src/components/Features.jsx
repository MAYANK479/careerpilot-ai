import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose Our Platform?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <FeatureCard
          icon="📄"
          title="ATS Score"
          description="Get an instant ATS compatibility score and improve your resume."
        />

        <FeatureCard
          icon="🤖"
          title="AI Analysis"
          description="Receive AI-powered suggestions to strengthen every section."
        />

        <FeatureCard
          icon="💼"
          title="Job Matching"
          description="Match your skills with relevant jobs and identify gaps."
        />

      </div>
    </section>
  );
}

export default Features;