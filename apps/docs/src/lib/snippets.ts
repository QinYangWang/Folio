const examples: Record<string, string> = {
  Button: '<Button variant="primary">Create project</Button>',
  Input: '<TextField label="Email address" placeholder="you@example.com" />',
  Checkbox: "<Checkbox defaultSelected>Accept terms and conditions</Checkbox>",
  Switch: "<Switch defaultSelected>Email notifications</Switch>",
  Badge: '<Badge variant="success">Active</Badge>',
  Card: "<Card><h3>Your next great idea</h3><p>Start with a thoughtful foundation.</p></Card>",
  Tabs: '<Tabs><TabList aria-label="Project"><Tab id="overview">Overview</Tab></TabList><TabPanel id="overview">Your overview</TabPanel></Tabs>',
  Dialog:
    '// Inside your component:\nconst [open, setOpen] = useState(false);\n\n<AnimatedOverlay isOpen={open} onOpenChange={setOpen}>\n  <AnimatedModal><Dialog aria-label="Project">Create a project</Dialog></AnimatedModal>\n</AnimatedOverlay>',
  Select:
    '<Select label="Framework" options={[{id:"react",label:"React"},{id:"next",label:"Next.js"}]} />',
  Avatar: '<Avatar name="Jane Doe" />',
  Alert:
    '<Alert variant="success" title="All set!">Your changes have been saved.</Alert>',
  Tooltip: '<Tooltip content="Here to help"><Button>Help</Button></Tooltip>',
};
export const snippets = Object.fromEntries(
  Object.entries(examples).map(([name, example]) => {
    const file = name === "Input" ? "text-field" : name.toLowerCase();
    const symbols =
      name === "Input"
        ? "TextField"
        : name === "Dialog"
          ? "AnimatedOverlay, AnimatedModal"
          : name === "Tabs"
            ? "Tabs, TabList, Tab, TabPanel"
            : name;
    let imports = `import { ${symbols} } from "@/components/ui/${file}";`;
    if (name === "Tooltip")
      imports += '\nimport { Button } from "@/components/ui/button";';
    if (name === "Dialog")
      imports +=
        '\nimport { Dialog } from "react-aria-components";\nimport { useState } from "react";';
    return [name, `${imports}\n\n${example}`];
  }),
);
