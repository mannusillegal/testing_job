import yaml
from pathlib import Path


PROMPT_DIR = Path(__file__).parent / "prompts"


def load_prompt(name: str) -> str:
    path = PROMPT_DIR / f"{name}.yaml"

    if not path.exists():
        raise RuntimeError(f"Prompt file not found: {path}")

    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    if "instructions" not in data:
        raise RuntimeError(f"Invalid prompt file: {path}")

    return data["instructions"]
