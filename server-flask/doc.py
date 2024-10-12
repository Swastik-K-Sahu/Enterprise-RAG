import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
import os
from langchain_community.vectorstores import Chroma  # Corrected import for Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Load CSV file into a DataFrame
data = pd.read_csv("Financial Statements.csv")

# Convert DataFrame rows or specific columns to text
texts = data.apply(lambda row: ' '.join(row.astype(str)), axis=1).tolist()

# Wrap each text in a Document object
documents = [Document(page_content=text) for text in texts]

# Initialize the RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

# Split documents into chunks
docs = text_splitter.split_documents(documents)

# Output the number of documents (chunks)
print("Total number of document chunks:", len(docs))

# Securely set your Google API Key (ensure this key is correct)
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = ""  # Replace with your actual API key or set it as an environment variable

# Initialize embeddings and vectorstore
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")  # Ensure this is the correct model for embeddings
vectorstore = Chroma.from_documents(documents=docs, embedding=embeddings)