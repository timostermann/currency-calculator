import { RuleConfigSeverity } from "@commitlint/types";
import type { RulesConfig } from "@commitlint/types";

const rules: Partial<RulesConfig> = {
  "header-max-length": [RuleConfigSeverity.Error, "always", 200],
  "scope-enum": [
    RuleConfigSeverity.Error,
    "always",
    ["setup", "components", "hooks", "lib", "docs", "api", "pages", "flows"],
  ],
  "scope-empty": [RuleConfigSeverity.Warning, "never"],
};

const config = {
  extends: ["@commitlint/config-conventional"],
  rules,
};

export default config;
