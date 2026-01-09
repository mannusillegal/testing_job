from agents import Agent
from prompt_loader import load_prompt


logic_agent = Agent(
    name="CodeReviewLogic",
    model="us.sonnet4",
    instructions=load_prompt("logic"),
)

formatter_agent = Agent(
    name="CodeReviewFormatter",
    model="sonnet3.7",
    instructions=load_prompt("formatter"),
)

evaluator_agent = Agent(
    name="CodeReviewEvaluator",
    model="opus5.5",
    instructions=load_prompt("evaluator"),
)
