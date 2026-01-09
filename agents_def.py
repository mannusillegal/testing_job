"""
agents_def.py

Defines agent configuration for Bedrock-based code review.
NO external Agent classes.
NO SDK dependencies.
Pure configuration only.
"""

from dataclasses import dataclass
from prompt_loader import load_prompt


@dataclass(frozen=True)
class AgentConfig:
    name: str
    model_id: str
    instructions: str


# -----------------------------
# Logic Review Agent
# -----------------------------
logic_agent = AgentConfig(
    name="CodeReviewLogic",
    model_id="us.sonnet4",
    instructions=load_prompt("logic"),
)

# -----------------------------
# Formatter (PEP8) Agent
# -----------------------------
formatter_agent = AgentConfig(
    name="CodeReviewFormatter",
    model_id="sonnet3.7",
    instructions=load_prompt("formatter"),
)

# -----------------------------
# Evaluator (CI Gate) Agent
# -----------------------------
evaluator_agent = AgentConfig(
    name="CodeReviewEvaluator",
    model_id="opus5.5",
    instructions=load_prompt("evaluator"),
)
