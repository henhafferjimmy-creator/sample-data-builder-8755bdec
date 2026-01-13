import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fadeInUp } from "@/lib/motionConfig";

interface DumpsterOption {
  size: string;
  label: string;
  baseMin: number;
  baseMax: number;
  dailyRate: number;
}

const dumpsterOptions: DumpsterOption[] = [
  { size: "10", label: "10-Yard ($300-$350)", baseMin: 300, baseMax: 350, dailyRate: 15 },
  { size: "20", label: "20-Yard ($400-$450)", baseMin: 400, baseMax: 450, dailyRate: 20 },
  { size: "30", label: "30-Yard ($500-$600)", baseMin: 500, baseMax: 600, dailyRate: 25 },
];

type ProjectType = "residential" | "construction" | "yard";

const projectTypes: { value: ProjectType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "construction", label: "Construction" },
  { value: "yard", label: "Yard Waste" },
];

const PriceEstimator = () => {
  const [selectedSize, setSelectedSize] = useState<string>("20");
  const [rentalDays, setRentalDays] = useState<number>(7);
  const [projectType, setProjectType] = useState<ProjectType>("residential");

  const selectedDumpster = useMemo(
    () => dumpsterOptions.find((opt) => opt.size === selectedSize) || dumpsterOptions[1],
    [selectedSize]
  );

  const estimatedPrice = useMemo(() => {
    const baseDays = 7;
    const extraDays = Math.max(0, rentalDays - baseDays);
    const extraCost = extraDays * selectedDumpster.dailyRate;

    // Project type modifier
    const modifier = projectType === "construction" ? 1.1 : projectType === "yard" ? 0.95 : 1;

    const min = Math.round((selectedDumpster.baseMin + extraCost) * modifier);
    const max = Math.round((selectedDumpster.baseMax + extraCost) * modifier);

    return { min, max };
  }, [selectedDumpster, rentalDays, projectType]);

  const quoteParams = new URLSearchParams({
    size: selectedSize,
    days: rentalDays.toString(),
    type: projectType,
  });

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-emerald-50/30 to-white" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Calculator className="h-4 w-4" />
            Instant Pricing
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Get an Instant Estimate
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Answer 3 quick questions for pricing guidance
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl border-2 border-emerald-100 shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left: Form Inputs */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Dumpster Size */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">
                    1. Select Dumpster Size
                  </Label>
                  <div className="space-y-2">
                    {dumpsterOptions.map((option) => (
                      <button
                        key={option.size}
                        onClick={() => setSelectedSize(option.size)}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedSize === option.size
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50"
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rental Duration */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">
                    2. Rental Duration: <span className="text-emerald-600">{rentalDays} days</span>
                  </Label>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 day</span>
                    <span>14 days</span>
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">
                    3. Project Type
                  </Label>
                  <div className="flex gap-2 flex-wrap">
                    {projectTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setProjectType(type.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          projectType === type.value
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Results */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 md:p-8 flex flex-col justify-center items-center text-white">
                <Truck className="h-12 w-12 mb-4 opacity-80" />
                <p className="text-emerald-100 text-sm mb-2">Your Estimated Price</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedSize}-${rentalDays}-${projectType}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    ${estimatedPrice.min} - ${estimatedPrice.max}
                  </motion.div>
                </AnimatePresence>
                <p className="text-emerald-100 text-xs mb-6 text-center">
                  {selectedSize}-yard dumpster • {rentalDays} day rental
                </p>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg"
                >
                  <Link to={`/quote?${quoteParams.toString()}`}>
                    Lock in This Price - Get Official Quote
                  </Link>
                </Button>

                <p className="text-emerald-200 text-xs mt-4 text-center">
                  Final price confirmed after site evaluation
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceEstimator;
