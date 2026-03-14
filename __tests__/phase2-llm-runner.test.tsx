import { runGemini } from "../app/page";

describe("Gemini runner", () => {
  it("sends generateContent with api key and prompt", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: "Hello" }] } }],
      }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    await runGemini({
      apiKey: "test-key",
      model: "gemini-2.5-flash",
      prompt: "Hello",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain("generateContent");
    expect(options.headers["x-goog-api-key"]).toBe("test-key");
    expect(options.headers["Content-Type"]).toBe("application/json");
    const body = JSON.parse(options.body as string);
    expect(body).toEqual({
      contents: [{ parts: [{ text: "Hello" }] }],
    });
  });
});
