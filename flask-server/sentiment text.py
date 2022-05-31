from textblob import Word
import re
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

data= pd.read_csv('/content/sentiment3data.csv') #change csv file name

data['message'] = data['message'].apply(lambda x: " ".join(x.lower() for x in x.split()))
#Removing Punctuation, Symbols
data['message'] = data['message'].str.replace('[^\w\s]',' ')
#Removing Stop Words using NLTK

stop = stopwords.words('english')
data['message'] = data['message'].apply(lambda x: " ".join(x for x in x.split() if x not in stop))
#Lemmatisation

data['message'] = data['message'].apply(lambda x: " ".join([Word(word).lemmatize() for word in x.split()]))
#Correcting Letter Repetitions

def de_repeat(text):
    pattern = re.compile(r"(.)\1{2,}")
    return pattern.sub(r"\1\1", text)


data['message'] = data['message'].apply(lambda x: " ".join(de_repeat(x) for x in x.split())).


# Code to find the top 500 rarest words appearing in the data
freq = pd.Series(' '.join(data['message']).split()).value_counts()[-500:]
# Removing all those rarely appearing words from the data
freq = list(freq.index)
data['message'] = data['message'].apply(lambda x: " ".join(x for x in x.split() if x not in freq))

#Encoding output labels
from sklearn import preprocessing
lbl_enc = preprocessing.LabelEncoder()
y = lbl_enc.fit_transform(data.sentiment.values)

# Splitting into training and testing data in 80:20 ratio
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(data.message.values, y, stratify=y, random_state=42, test_size=0.2, shuffle=True)


count_vect = CountVectorizer(analyzer='word')
count_vect.fit(data['message'])
X_train_count =  count_vect.transform(X_train)
X_test_count =  count_vect.transform(X_test)

logreg = LogisticRegression(C=1)
logreg.fit(X_train_count, y_train)
y_predlogreg = logreg.predict(X_test_count)

def senti_op(input_text):
	statements = pd.DataFrame([input_text])
	statements[0]= statements[0].str.replace('[^\w\s]',' ')
	stop = stopwords.words('english')
	statements[0] = statements[0].apply(lambda x: " ".join(x for x in x.split() if x not in stop))
	statements[0] = statements[0].apply(lambda x: " ".join([Word(word).lemmatize() for word in x.split()]))
	# Extracting Count Vectors feature from our statements
	statements_count = count_vect.transform(statements[0])
	#Predicting the emotion of the statements using our already trained Logistic regression
	statements_prob = logreg.predict_proba(statements_count)
	statements_pred = logreg.predict(statements_count)
	print(statements_prob[0])
	labels=[' Happy', ' Neutral', ' Sad']
	senti_op={}
	for i in range(3):
  		senti_op[labels[i]]=statements_prob[0][i]

	return senti_op
	

