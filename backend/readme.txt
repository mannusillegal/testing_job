backend/
├── main.py                    # API + orchestration
├── agents_def.py              # agent definitions (no prompts inline)
├── bedrock_client.py          # Bedrock + Guardrails adapter
├── usage_tracker.py           # token + cost calculation
├── prompt_loader.py           # YAML prompt loader
├── prompts/
│   ├── logic.yaml
│   ├── formatter.yaml
│   └── evaluator.yaml
├── requirements.txt
└── README.md



