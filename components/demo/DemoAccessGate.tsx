import { Container } from "@/components/Container";
import { DemoForm } from "@/components/demo/DemoForm";
import { Section } from "@/components/Section";
import { theme as t } from "@/components/theme";

export function DemoAccessGate() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              ONLINE DEMO
            </div>
            <h1
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              See Recurv in action
              <br />
              <span style={{ color: t.primary }}>before you talk to us.</span>
            </h1>
            <p className="mt-6 max-w-[540px]" style={{ fontSize: 17, lineHeight: 1.6, color: t.inkSoft }}>
              Leave your details in order to gain access to the online demo.
            </p>
          </div>
          <DemoForm />
        </div>
      </Container>
    </Section>
  );
}
