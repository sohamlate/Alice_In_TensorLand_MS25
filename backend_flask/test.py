from newspaper import Article
import nltk
def get_news_content(url):
    """
    Fetches and parses a news article from a given URL to extract its main content.

    Args:
        url (str): The URL of the news article.

    Returns:
        str: The extracted text content of the article, or an error message.
    """
    try:
        article = Article(url)
        article.download()
        article.parse()
        return article.text
    except Exception as e:
        return f"Failed to process the article. Error: {e}"

if __name__ == "__main__":
    # Replace this with the URL you want to scrape
    news_url = "https://auto.economictimes.indiatimes.com/news/passenger-vehicle/maruti-suzukis-production-sees-26-growth-in-september-fueled-by-festive-demand/124289590"
    
    print(f"Fetching content from: {news_url}\n")
    
    content = get_news_content(news_url)
    
    print("--- Extracted Article Content ---")
    print(content.text)
    print("---------------------------------")