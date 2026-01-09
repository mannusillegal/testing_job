import boto3
import json
from typing import Tuple, Optional


class BedrockClient:
    def __init__(self, region: str):
        self.client = boto3.client("bedrock-runtime", region_name=region)

    def invoke(
        self,
        *,
        model_id: str,
        prompt: str,
        guardrail_id: Optional[str] = None,
        guardrail_version: Optional[str] = None,
    ) -> Tuple[str, int, int]:

        body = {"inputText": prompt}

        params = {
            "modelId": model_id,
            "body": json.dumps(body),
        }

        if guardrail_id and guardrail_version:
            params["guardrailIdentifier"] = guardrail_id
            params["guardrailVersion"] = guardrail_version

        response = self.client.invoke_model(**params)
        payload = json.loads(response["body"].read())

        output_text = payload.get("results", [{}])[0].get("outputText", "")
        usage = payload.get("usage", {})

        return (
            output_text,
            usage.get("inputTokens", 0),
            usage.get("outputTokens", 0),
        )
