const qualities = [
  {
    title: "Curiosity and ownership",
    description: "You ask questions, dig deeper, and take responsibility for outcomes."
  },
  {
    title: "Comfort with complexity",
    description: "You don't shy away from hard problems or ambiguous situations."
  },
  {
    title: "Clear thinking",
    description: "You can break down complex ideas and communicate them simply."
  },
  {
    title: "Willingness to collaborate",
    description: "You value working with others and know that better ideas emerge together."
  }
];

const WhatWeLookFor = () => {
  return (
    <section className="py-20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            What we look for
          </h2>
          <p className="text-muted-foreground text-lg">
            Not a checklist—just qualities we tend to value.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {qualities.map((quality, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-border/50 bg-background hover:border-primary/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {quality.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {quality.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeLookFor;
