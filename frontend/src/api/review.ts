export async function reviewCode(code: string) {
    const response = await fetch("http://localhost:8001/review", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw data.detail ?? data;
    }

    return data;
}
