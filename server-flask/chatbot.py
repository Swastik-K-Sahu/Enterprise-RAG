from langchain_google_genai import ChatGoogleGenerativeAI  # Correct imports
from langchain.chains import RetrievalQA
from langchain.prompts.chat import ChatPromptTemplate
import doc 
# # Load CSV file into a DataFrame
# data = pd.read_csv("Financial_Statements.csv")

# # Convert DataFrame rows or specific columns to text
# texts = data.apply(lambda row: ' '.join(row.astype(str)), axis=1).tolist()

# # Wrap each text in a Document object
# documents = [Document(page_content=text) for text in texts]

# # Initialize the RecursiveCharacterTextSplitter
# text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

# # Split documents into chunks
# docs = text_splitter.split_documents(documents)

# # Output the number of documents (chunks)
# print("Total number of document chunks:", len(docs))

# # Securely set your Google API Key (ensure this key is correct)
# if "GOOGLE_API_KEY" not in os.environ:
#     os.environ["GOOGLE_API_KEY"] = "AIzaSyCLH8rypnftox0WJZr5VHCaZUx1YflXyxE"  # Replace with your actual API key or set it as an environment variable

# # Initialize embeddings and vectorstore
# embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")  # Ensure this is the correct model for embeddings
# vectorstore = Chroma.from_documents(documents=docs, embedding=embeddings)

retriever = doc.vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
retrieved_docs = retriever.invoke("What was the Market Cap of PYPL in 2022 ?")
print(retrieved_docs[0].page_content)

if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = ""  # Replace with your actual API key or set it as an environment variable

# Initialize the language model
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0, max_tokens=400)

# Define the system prompt for the chatbot
system_prompt = ('''
You are an intelligent assistant designed to answer questions using either retrieved context from enterprise knowledge bases or an external LLM when context is insufficient. When you receive a question, carefully examine the provided context first. If context is available, use it to provide an accurate response. If not, answer based on general knowledge using the LLM.

*Instructions:*
- Return your answers as a *JSON object* that includes:
  1. "message": A concise, professional natural language summary based on the context.
  2. "data": Key data points extracted from the context as arrays, objects, or numbers.
- If the question asks for *company-specific details* and sufficient context is available, use that context to respond.
- If *company-specific details* are asked but no relevant context is available, refer to general knowledge from the LLM.
- If the question is a *general knowledge query* unrelated to company-specific details, rely on the LLM to generate an answer.
- For *irrelevant or inappropriate questions*, set "message" to "This question is irrelevant." and leave "data" as an empty object {{}}.
- Always maintain a professional tone.

*Few-shot Learning Examples:*

1. *Question*: "What is the finance budget?"
   *Context*: (None provided)
   *Response*:
   
   {{ "message": "I don't know based on the current context, but you can check the latest financial report for this information.", "data": {{}} }}

2. *Question*: "What are the top companies listed in Category IT?"
   *Context*: (Data provided for IT companies)
   *Response*:

   {{ "message": "The top companies listed in Category IT are Company A, Company B, and Company C.", "data": {{ "companies": ["Company A", "Company B", "Company C"] }} }}

3. *Question*: "What is the capital of France?"
   *Context*: (None provided)
   *Response*:

   {{ "message": "The capital of France is Paris.", "data": {{ "capital": "Paris" }} }}

4. *Question*: "How can we improve customer satisfaction?"
   *Context*: "Customer complaints have been increasing in recent months."
   *Response*:

   {{ "message": "To improve customer satisfaction, you should focus on enhancing customer service, addressing complaints more efficiently, and regularly gathering feedback.", "data": {{}} }}

5. *Question*: "Who is the CEO of the company?"
   *Context*: (None provided)
   *Response (LLM-based)*:

   {{ "message": "The CEO of the company is John Doe.", "data": {{ "CEO": "John Doe" }} }}

    "\n\n"
   "{context}
''')


# Create the prompt template
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

# Create the question-answering chain using RetrievalQA directly
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    chain_type="stuff",  # Using the "stuff" method for combining documents
    verbose=True  # Adding verbose to get more debug information if needed
)

# Define the chatbot response function
def chatbot_response(user_input):
    # Use the RAG chain to get the response
    response = rag_chain({"query": user_input})
    
    # Extract and return the answer
    # We assume "result" is the field where the final answer is stored
    return response["result"] if "result" in response else "I don't know."

