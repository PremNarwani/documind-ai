import os

from tavily import TavilyClient


def google_search(query: str):

    tavily = TavilyClient(
        api_key=os.getenv("TAVILY_API_KEY")
    )

    response = tavily.search(
        query=query,
        search_depth="basic",
        max_results=5
    )

    print("\nTAVILY RESPONSE:")
    print(response)
    print()

    snippets = []

    for result in response.get(
        "results",
        []
    ):
        snippets.append(
            result.get(
                "content",
                ""
            )
        )

    if len(snippets) == 0:
        return "No result found"

    return "\n".join(snippets)