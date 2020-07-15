import requests
from dotenv import load_dotenv
import os


def get_page():
    load_dotenv()

    BASE_PAGE_URL = os.environ.get('BASE_PAGE_URL')

    req = requests.get(BASE_PAGE_URL)
    content = req.text
    req.close()

    print(content)


if __name__ == "__main__":
    get_page()
