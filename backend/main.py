import json
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from agents_def import logic_agent, formatter_agent, evaluator_agent
from bedrock_client import BedrockClient
from usage_tracker import UsageTracker


app = FastAPI(title="DevOps Buddy – Code Review API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeReviewRequest(BaseModel):
    code: str


def parse_json(text: str, name: str) -> dict:
    try:
        return json.loads(text.strip("` \n"))
    except Exception as e:
        raise RuntimeError(f"{name} returned invalid JSON") from e


@app.post("/review")
async def review_code(payload: CodeReviewRequest):
    try:
        bedrock = BedrockClient(region=os.getenv("AWS_REGION", "us-east-1"))
        usage = UsageTracker()

        guardrail_id = os.getenv("BEDROCK_GUARDRAIL_ID")
        guardrail_version = os.getenv("BEDROCK_GUARDRAIL_VERSION")

        # LOGIC
        out, i, o = bedrock.invoke(
            model_id=logic_agent.model,
            prompt=logic_agent.instructions + "\n\n" + payload.code,
            guardrail_id=guardrail_id,
            guardrail_version=guardrail_version,
        )
        usage.record("Logic", logic_agent.model, i, o)
        logic = parse_json(out, "LogicAgent")
        logic.setdefault("advisory_warnings", [])

        # FORMATTER
        out, i, o = bedrock.invoke(
            model_id=formatter_agent.model,
            prompt=formatter_agent.instructions + "\n\n" + payload.code,
        )
        usage.record("Formatter", formatter_agent.model, i, o)
        review = parse_json(out, "FormatterAgent")

        # EVALUATOR
        out, i, o = bedrock.invoke(
            model_id=evaluator_agent.model,
            prompt=evaluator_agent.instructions
            + "\n\n"
            + json.dumps({"logic": logic, "formatting": review}),
        )
        usage.record("Evaluator", evaluator_agent.model, i, o)
        evaluation = parse_json(out, "EvaluatorAgent")

        return {
            "logic": logic,
            "review": review,
            "evaluation": evaluation,
            "usage": usage.summarize().__dict__,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
