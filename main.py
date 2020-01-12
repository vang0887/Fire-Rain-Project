from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd
import time

# def init_browser():
# @NOTE: Replace the path with your actual path to the chromedriver
executable_path = {"executable_path": "C:\chromedrv\chromedriver.exe"}
Browser("chrome", **executable_path, headless=False)


def caliCampScrape(browser):

    executable_path = {"executable_path": "C:\chromedrv\chromedriver.exe"}
    browser = Browser('chrome', **executable_path, headless=False)

    url = "https://en.wikipedia.org/wiki/List_of_California_wildfires"
    browser.visit(url)

    html = browser.html
    soup = bs(html, 'html.parser')

    img_url ="https://static01.nyt.com/images/2019/10/30/us/30fires-photos11/merlin_163584246_b9a52315-78b1-4255-906c-52e8952d9b6d-superJumbo.jpg?quality=90&auto=webp"
    
    para_text = soup.find('p').text

    text_part1 = para_text.split("[1]")
    text_part1[0]
    
    text_part2 = text_part1[1].splitlines()
    text_part2 = text_part2[0].split("[2]")
    text_part2[0]

    intro_para = text_part1[0] + text_part2[0]

    table = pd.read_html(url)

    des_fire_df= table[1]

    des_fire_df["Name"][0] = "Camp"

    fire_table_html = des_fire_df.to_html()

    facts_list = fire_table_html.splitlines()
    separator = ""

    fire_table_html = separator.join(facts_list)

    mendo_fire_url = "https://i2.wp.com/www.mercurynews.com/wp-content/uploads/2019/10/Mendocino-Complex-1.jpg?fit=780%2C9999px&ssl=1"

    camp_fire_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Camp_Fire_oli_2018312_Landsat.jpg/1280px-Camp_Fire_oli_2018312_Landsat.jpg"

    return fire_table_html
    
def caliMendoScrape(browser):

    executable_path = {"executable_path": "C:\chromedrv\chromedriver.exe"}
    browser = Browser('chrome', **executable_path, headless=False)

    mendo_url = 'https://www.cnn.com/2018/09/20/us/california-mendocino-complex-fire-contained-trnd/index.html'
    browser.visit(mendo_url)

    html = browser.html
    soup = bs(html, 'html.parser')

    #Article Headline for Mendocino
    headline = soup.find("h1").text

    #scrape para1 for Mendocino
    para1 = soup.find("div",class_="zn-body__paragraph").text

    para=soup.find("div",class_="l-container").text

    str1 = para.split(".")

    para2 = str1[4] + "." + str1[5]

    # Scrape para2 for Mendocina
    para2


    mendo_para = para1 + para2

    return mendo_para


def caliDeadliestScrape(browser):

    executable_path = {"executable_path": "C:\chromedrv\chromedriver.exe"}
    browser = Browser('chrome', **executable_path, headless=False)

    camp_url = "https://abc7.com/the-deadliest-wildfires-in-california-history/4673982/"
    browser.visit(camp_url)

    html = browser.html
    soup = bs(html, 'html.parser')

    #camp fire headline 
    camp_headline = soup.find("h1").text

    camp_headline

    camp_para1 = soup.find("div",class_ = "body-text")

    camp_para1_clean = camp_para1.text.split(".")[0] + ". " +  camp_para1.text.split(".")[1]

    deadliest_element = browser.find_link_by_text("deadliest wildfires in California history").first

    #scrape top20 deadliest wildfires in CA
    # deadliest_element.click()

    return camp_para1_clean,

def scrape_all():
    executable_path = {"executable_path": "C:\chromedrv\chromedriver.exe"}
    browser = Browser("chrome", **executable_path)
    fire_table_html = caliCampScrape(browser)
    mendo_para = caliMendoScrape(browser)
    camp_para1_clean = caliDeadliestScrape(browser)
    # top20Fire = mars_facts()
    # hemisphere_image_urls = hemisphere(browser)
    # timestamp = dt.datetime.now()

    data = {
         "fire_table_html": fire_table_html,
         "mendo_para": mendo_para,
         "camp_para1_clean": camp_para1_clean,
    #     "weather": mars_weather,
    #     "facts": facts,
    #     "hemispheres": hemisphere_image_urls,
    #     "last_modified": timestamp
     }
    browser.quit()
    return data 

if __name__ == "__main__":
    print(scrape_all())