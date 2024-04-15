export function fetchOptions(method: string, body: object): object {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
    body: JSON.stringify(body),
  };
}
