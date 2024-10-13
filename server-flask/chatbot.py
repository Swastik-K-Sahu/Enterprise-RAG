import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
import os
from langchain_community.vectorstores import Chroma  
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA
from langchain.prompts.chat import ChatPromptTemplate
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=google_api_key)


data = pd.read_csv("Financial Statements.csv")
texts = data.apply(lambda row: ' '.join(row.astype(str)), axis=1).tolist()
documents = [Document(page_content=text) for text in texts]
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
docs = text_splitter.split_documents(documents)
print("Total number of document chunks:", len(docs))

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")  # Ensure this is the correct model for embeddings
vectorstore = Chroma.from_documents(documents=docs, embedding=embeddings)
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0, max_tokens=400)
system_prompt = ('''
You are an intelligent assistant designed to answer questions using either retrieved context from enterprise knowledge bases or an external LLM when context is insufficient. When you receive a question, carefully examine the provided context first. If context is available, use it to provide an accurate response. If not, answer based on general knowledge using the LLM.

*Instructions:*
- Return your answers in a concise, professional natural language summary in bullet points based on the context, without any special characters like asterisks (*).
- If the question asks for *company-specific details* and sufficient context is available, use that context to respond.
- If *company-specific details* are asked but no relevant context is available, defer to general knowledge from the LLM.
- If the question is a *general knowledge query* unrelated to company-specific details, rely on the LLM to generate an answer.
- For *irrelevant or inappropriate questions*, set "message" to "This question is irrelevant."

*Few-shot Learning Examples:*

1. *Question*: "What is the finance budget?"
   *Context*: (None provided)
   *Response*:

   {{ "message": "• I don't know based on the current context.\n• You can check the latest financial report for this information." }}

2. *Question*: "What are the top companies listed in Category IT?"
   *Context*: (Data provided for IT companies)
   *Response*:

   {{ "message": "• The top companies listed in Category IT are:\n  - Company A\n  - Company B\n  - Company C" }}

3. *Question*: "What is the capital of France?"
   *Context*: (None provided)
   *Response*:

   {{ "message": "• The capital of France is Paris." }}

4. *Question*: "How can we improve customer satisfaction?"
   *Context*: "Customer complaints have been increasing in recent months."
   *Response*:

   {{ "message": "• To improve customer satisfaction, you can:\n  - Enhance customer service.\n  - Address complaints more efficiently.\n  - Regularly gather customer feedback."}}

5. *Question*: "Who is the CEO of the company?"
   *Context*: (None provided)
   *Response (LLM-based)*:

   {{ "message": "• The CEO of the company is John Doe." }}
    "\n\n"
   "{context}
''')

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    chain_type="stuff",  
    verbose=True  
)


def chatbot_response(user_input):
    response = rag_chain({"query": user_input})
    return response["result"] if "result" in response else "I don't know."