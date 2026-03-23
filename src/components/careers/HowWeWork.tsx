const principles = [
  {
    title: "Collaboration over hierarchy",
    description: "Ideas win here, not titles. Everyone has a voice."
  },
  {
    title: "Respect for complexity",
    description: "We don't oversimplify. Real solutions require understanding nuance."
  },
  {
    title: "Focus on outcomes",
    description: "We care about results, not busywork or performative effort."
  },
  {
    title: "Clear communication",
    description: "Say what you mean. Ask when unsure. Keep each other informed."
  }
];

const HowWeWork = () => {
  return (
    <section className="py-20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            How we work
          </h2>
          <p className="text-muted-foreground text-lg">
            No buzzwords. Just how we actually operate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="flex gap-4 items-start p-6 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
