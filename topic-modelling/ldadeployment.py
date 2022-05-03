#before running verif the model file path inside the function topic_predictor

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
  
  #creating LDA model object
  lda_model = gensim.models.ldamodel.LdaModel

  # Loading a model
  lda_model = lda_model.load("/home/ubuntu/Emotion-Interface/topic-modelling/model-files/Model") #change the path to model file path
  op_topics=lda_model.get_document_topics(doc_term_matrix[0],minimum_probability=0.01)
  return str(op_topics)

print(topic_predictor("what is your marketing strategy"))   #replace the text in quotes with the data from google doc