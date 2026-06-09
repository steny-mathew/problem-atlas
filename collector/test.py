from playwright.sync_api import sync_playwright

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=False
    )

    page = browser.new_page()

    page.goto(
        "https://www.reddit.com/r/SomebodyMakeThis/",
        wait_until="networkidle"
    )

    print(page.title())

    input("Press Enter to close...")

    browser.close()