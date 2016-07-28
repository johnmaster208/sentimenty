# Sentimenty
[![Build Status](https://travis-ci.org/johnmaster208/sentimenty.svg?branch=master)](https://travis-ci.org/johnmaster208/sentimenty)
### What is it?
Sentimenty is free service that discovers emotion (sentiment) from text. Through the usage of natural language processing (NLP), it gathers sentimental value from keywords and returns their emotional density and distribution in friendly formats, like JSON and XML.

### Why did you name it Sentimenty?
Why not? Half of the internet is basically full of harebrained domains/subdomains ending in 'y', 'ly', 'ley', 'ic' and 'er'. I figured since sentiment.ly was already taken, I could make ends meet. Also, EmotionAPI sounded kind of lame, and a little too Dashboard Confessional(.ly)

### How does it work?
Through generic POST requests to the following endpoint(s):

#### Textpool
-returns the emotional significance (or "e-sig" for short) of the text.

#### Resource
/s/textpool/params

#### Params

text

- Required. The submitted text or payload for processing any sentiments. 
- Example: "We were mad about the latest zombie flick."

format

- Optional. The submitted text or payload for processing any sentiments. 
- Valid values are 'JSON' or 'XML'

## Demo
[Demo](https://sentimenty.herokuapp.com/)

License
----
MIT

### Todos
 - More Tests



