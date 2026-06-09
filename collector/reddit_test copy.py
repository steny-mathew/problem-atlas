from playwright.sync_api import sync_playwright

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=False
    )

    page = browser.new_page()

    page.goto(
        "https://www.reddit.com/r/SomebodyMakeThis/",
        wait_until="domcontentloaded",
        timeout=60000
    )

    print("Page loaded...")

    page.wait_for_timeout(10000)

    # Scroll multiple times to load more posts
    for i in range(5):
        print(f"Scrolling {i+1}/5...")
        page.mouse.wheel(0, 4000)
        page.wait_for_timeout(3000)

    titles = page.locator('a[slot="title"]')

    count = titles.count()

    print("\n" + "=" * 80)
    print(f"TITLE COUNT: {count}")
    print("=" * 80)

    for i in range(count):

        try:
            title = titles.nth(i).inner_text()

            url = titles.nth(i).get_attribute("href")

            print(f"\nPOST {i+1}")
            print("TITLE:")
            print(title)

            print("\nURL:")
            print(url)

            print("-" * 80)

        except Exception as e:
            print(f"Error on post {i+1}: {e}")

    print("\nDEBUG INFO")
    print("article count:", page.locator("article").count())
    print("shreddit-post count:", page.locator("shreddit-post").count())

    input("\nPress Enter to close...")

    browser.close()