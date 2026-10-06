import { Badge } from "@/ui/badge";
import CardExample from "./components/card";
import { Avatar } from "@/ui/avatar";
import { Alert } from "@/ui/alert";
import { Select } from "@/ui/select";
import { Tooltip } from "@/ui/tooltip";
import { Button } from "@/ui/button";
import { Switch } from "@/ui/switch";
import { Checkbox } from "@/ui/checkbox";
import { TextField as Field } from "@/ui/text-field";
import {
  ArrowRight,
  Plus,
  ExternalLink,
  Check,
  CircleHelp,
} from "lucide-react";
import { Tabs, TabList, Tab, TabPanel } from "@/ui/tabs";
function DemoTabs() {
  return (
    <Tabs className="demo-tabs">
      <TabList aria-label="Project sections">
        <Tab id="overview">Overview</Tab>
        <Tab id="analytics">Analytics</Tab>
        <Tab id="settings">Settings</Tab>
      </TabList>
      <TabPanel id="overview">Everything you need, in one place.</TabPanel>
      <TabPanel id="analytics">Your project has 1,204 views.</TabPanel>
      <TabPanel id="settings">
        <Switch>Public project</Switch>
      </TabPanel>
    </Tabs>
  );
}
export function Preview({
  name,
  setDialog,
  setToast,
  setPage,
}: {
  name: string;
  setDialog: (open: boolean) => void;
  setToast: (message: string) => void;
  setPage: (page: string) => void;
}) {
  switch (name) {
    case "Button":
      return (
        <div className="button-preview">
          <div>
            <Button variant="primary" onPress={() => setDialog(true)}>
              Create project <Plus size={14} />
            </Button>
            <Button onPress={() => setToast("Action cancelled")}>Cancel</Button>
          </div>
          <div>
            <Button variant="ghost" onPress={() => setPage("Installation")}>
              Learn more <ArrowRight size={14} />
            </Button>
            <Button isDisabled>Disabled</Button>
          </div>
        </div>
      );
    case "Input":
      return (
        <div className="input-preview">
          <Field label="Email address" placeholder="you@example.com" />
          <span className="hint">We’ll never share your email.</span>
        </div>
      );
    case "Checkbox":
      return (
        <div className="stack">
          <Checkbox defaultSelected>Accept terms and conditions</Checkbox>
          <Checkbox>Send me product updates</Checkbox>
          <Checkbox isDisabled>Currently unavailable</Checkbox>
        </div>
      );
    case "Switch":
      return (
        <div className="stack switch-preview">
          <Switch defaultSelected>Email notifications</Switch>
          <Switch>Marketing emails</Switch>
          <Switch defaultSelected>Security alerts</Switch>
        </div>
      );
    case "Badge":
      return (
        <div className="badge-preview">
          <Badge variant="success">● Active</Badge>
          <Badge variant="warning">In progress</Badge>
          <Badge variant="neutral">Draft</Badge>
          <Badge variant="info">New feature</Badge>
          <Badge variant="danger">● Failed</Badge>
          <Badge variant="neutral">⌘ K</Badge>
        </div>
      );
    case "Card":
      return <CardExample />;
    case "Tabs":
      return <DemoTabs />;
    case "Dialog":
      return (
        <Button onPress={() => setDialog(true)}>
          Open dialog <ExternalLink size={14} />
        </Button>
      );
    case "Select":
      return (
        <div className="input-preview">
          <Select
            label="Framework"
            placeholder="Select a framework"
            options={[
              { id: "react", label: "React" },
              { id: "next", label: "Next.js" },
              { id: "remix", label: "Remix" },
            ]}
          />
        </div>
      );
    case "Avatar":
      return (
        <div className="avatars">
          {["Jane Doe", "Alex Kim", "Morgan Lee", "Sam Park"].map((name) => (
            <Avatar key={name} name={name} />
          ))}
        </div>
      );
    case "Alert":
      return (
        <Alert variant="success" title="All set!" icon={<Check size={17} />}>
          Your changes have been saved.
        </Alert>
      );
    default:
      return (
        <Tooltip content="A little help, right when you need it.">
          <Button aria-label="Help">
            <CircleHelp size={18} /> Hover for a hint
          </Button>
        </Tooltip>
      );
  }
}
