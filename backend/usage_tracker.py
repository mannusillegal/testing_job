from dataclasses import dataclass, field
from typing import Dict, List


PRICING = {
    "us.sonnet4": {"in": 0.003, "out": 0.015},
    "sonnet3.7": {"in": 0.002, "out": 0.010},
    "opus5.5": {"in": 0.015, "out": 0.075},
}


@dataclass
class AgentUsage:
    name: str
    model: str
    input_tokens: int
    output_tokens: int
    cost_usd: float


@dataclass
class UsageSummary:
    total_input_tokens: int = 0
    total_output_tokens: int = 0
    total_cost_usd: float = 0.0
    agents: List[AgentUsage] = field(default_factory=list)


class UsageTracker:
    def __init__(self):
        self._data: Dict[str, AgentUsage] = {}

    def record(self, name: str, model: str, inp: int, out: int):
        price = PRICING.get(model)
        cost = 0.0
        if price:
            cost = (inp / 1000) * price["in"] + (out / 1000) * price["out"]

        self._data[name] = AgentUsage(
            name, model, inp, out, round(cost, 6)
        )

    def summarize(self) -> UsageSummary:
        s = UsageSummary()
        for u in self._data.values():
            s.total_input_tokens += u.input_tokens
            s.total_output_tokens += u.output_tokens
            s.total_cost_usd += u.cost_usd
            s.agents.append(u)

        s.total_cost_usd = round(s.total_cost_usd, 6)
        return s
