import streamlit as st
from etsy_ai_sniper.scraper import get_etsy_listings
from etsy_ai_sniper.ai_analysis import analyze_listings

st.title("Etsy AI Sniper")
# Example usage
listings = get_etsy_listings("rings")
analysis = analyze_listings(listings)
st.write(analysis)
