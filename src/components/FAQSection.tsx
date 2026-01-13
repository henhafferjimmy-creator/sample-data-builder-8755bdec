import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInUp } from "@/lib/motionConfig";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How quickly can I get a dumpster delivered?",
    answer:
      "We offer same-day delivery when available. Most deliveries are completed within 24 hours of your order.",
  },
  {
    question: "Will the dumpster damage my driveway?",
    answer:
      "No! We use protective boards and careful placement techniques to ensure zero damage to your driveway or property.",
  },
  {
    question: "What size dumpster do I need?",
    answer:
      "We'll help you choose! A 10-yard dumpster is great for small cleanouts, 20-yard for renovations, and 30-yard for larger construction projects.",
  },
  {
    question: "What can't go in the dumpster?",
    answer:
      "Hazardous materials, chemicals, paint, batteries, and tires are not allowed. Call us if you're unsure about specific items.",
  },
  {
    question: "How long can I keep the dumpster?",
    answer:
      "Standard rental periods are 7-14 days, with flexible extensions available if you need more time.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing varies by dumpster size and rental duration. Get a free instant quote using our estimator above!",
  },
];

const FAQSection = () => {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/40 to-emerald-50/60" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Common Questions Answered
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our dumpster rental services
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-100 shadow-sm px-4 md:px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground hover:text-secondary hover:no-underline py-4 md:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 md:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
