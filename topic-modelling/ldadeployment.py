# -*- coding: utf-8 -*-
"""LDAdeployment.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1qSY1JU60ZFlDCuFjI6cKt9HvkCWEmC4s
"""

import pandas as pd
import numpy as np
import re
import string
import spacy
import re
import gensim
from gensim import corpora
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
nltk.download('stopwords')
nltk.download('wordnet')

def remove_punctuation(text):
    punctuationfree="".join([i for i in text if i not in string.punctuation])
    return punctuationfree
def tokenization(text):
    tokens = re.split('W+',text)
    return tokens
def remove_stopwords(text):
    stop_words = stopwords.words('english')
    new_words=['la','pa','ya']
    stop_words.extend(new_words)
    textArr = text.split(' ')
    rem_text = " ".join([i for i in textArr if i not in stop_words])
    return rem_text
def stemming(text):
    #defining the object for stemming
    porter_stemmer = PorterStemmer() 
    stem_text = [porter_stemmer.stem(text) ]
    return stem_text
def lemmatizer(text):
    #defining the object for Lemmatization
    wordnet_lemmatizer = WordNetLemmatizer()
    lemm_text = [wordnet_lemmatizer.lemmatize(text) ]
    return lemm_text

#run this function to get the topics as output
#input_data: is a string of the text taken from google doc
#return type: string ,the string contains the topic
def topic_predictor(input_data):
  data= pd.DataFrame()
  data['Data']=[input_data]
  #storing the puntuation free text
  data['clean_msg']= data['Data'].apply(lambda x:remove_punctuation(x))
  data['msg_lower']= data['clean_msg'].apply(lambda x: x.lower())
  #storing the tokenized text
  data['msg_tokenied']= data['msg_lower'].apply(lambda x: tokenization(x))
  #removing stop words
  data['no_stopwords']= data['msg_tokenied'].apply(lambda x:remove_stopwords(x[0]))
  #stemming of data
  data['msg_stemmed']=data['no_stopwords'].apply(lambda x: stemming(x))
  #lemmatizing the data
  data['msg_lemmatized']=data['no_stopwords'].apply(lambda x:lemmatizer(x))
  dictionary = corpora.Dictionary(data ['msg_lemmatized'])
  doc_term_matrix = [dictionary.doc2bow(rev) for rev in data ['msg_lemmatized']]
  lda_model = gensim.models.ldamodel.LdaModel
  # Loading a model
  lda_model = lda_model.load("/content/Model") #change the path to model file path
  op_topics=lda_model.get_document_topics(doc_term_matrix[0],minimum_probability=0.01)
  Topics=["Budget/Pricing/Product","Compatibility/Security/Customization","Customization/Marketing/Budget","Quality/Pricing/Customization","Customization/Compatibility/Services","Security/Price/Customization","Customization/Compatibility/Marketing","Compatibility/Security","Customer service/Quality/Marketing","Customization/Marketing"]
  k=dict(op_topics)
  dict1 = k
  sorted_tuples = sorted(dict1.items(), key=lambda item: item[1], reverse=True)
  sorted_dict = {k: v for k, v in sorted_tuples}
  t_cnt=4
  result={}

  for i in sorted_dict.keys():
    if(t_cnt==4):
      pass
    elif(t_cnt==0):
      break
    else:
      result['Topic'+str(t_cnt)]=(Topics[i])
    t_cnt-=1
  return result

#print(topic_predictor("what is your marketing strategy"))

#pip freeze > requirements.txt