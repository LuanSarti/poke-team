export function fetchOptions(
  method: string,
  body: object,
  authorization?: string,
): object {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
      Authorization: authorization,
    },
    body: JSON.stringify(body),
  };
}
