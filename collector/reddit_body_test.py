from playwright.sync_api import sync_playwright

POST_URL = "https://www.reddit.com/r/SomebodyMakeThis/comments/1tyc1qd/blend_playlist_across_youtube_and_spotify/"

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=False
    )

    page = browser.new_page()

    page.goto(
        POST_URL,
        wait_until="domcontentloaded",
        timeout=60000
    )

    page.wait_for_timeout(8000)

    body = page.locator(
        'shreddit-post-text-body'
    ).first.inner_text()

    print("\nBODY:\n")
    print(body)

    input("\nPress Enter...")
    browser.close()