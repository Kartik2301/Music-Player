from statistics import mode
import time
from bs4 import BeautifulSoup
import requests

def get_lyrics(song_name):
    url = f"https://genius.com/The-verve-{song_name.lower().replace(' ', '-')}-lyrics"
    print(url)
    response = requests.get(url)
    response.raise_for_status()

    data = response.text

    soup = BeautifulSoup(data, "html.parser")

    with open("cache5.html", mode="w", encoding="utf8") as file:
        file.write(soup.prettify())

    with open("cache5.html", mode="r", encoding="utf8") as file:
        data = file.read()
    
    soup = BeautifulSoup(data, "html.parser")

    lyric_container = soup.find_all(name="div", class_="Lyrics__Container-sc-1ynbvzw-6")
    lyrics = ""

    for seg in lyric_container:
        print(seg)
        print(seg.getText())
        lyrics += seg.getText()
        
    return lyrics