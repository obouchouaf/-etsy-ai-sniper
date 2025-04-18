
import requests
from bs4 import BeautifulSoup

def scrape_etsy(keyword):
    query = keyword.replace(' ', '+')
    url = f"https://www.etsy.com/search?q={query}"
    headers = {"User-Agent": "Mozilla/5.0"}
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, "html.parser")
    results = []
    for item in soup.select("li.wt-list-unstyled")[:5]:
        title = item.select_one("h3")
        price = item.select_one("span.currency-value")
        if title and price:
            results.append({
                "title": title.get_text(strip=True),
                "price": price.get_text(strip=True)
            })
    return results
