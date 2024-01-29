## Implementation with Python SDK

Splitting entire application into 2 parts

### Background Worker

A Python app that will act as backend that does needful to have search results in the web app. This will be deployed on AWS EC2.

Duties:

- Interaction with data-source (Trail database) - Pulling and Syncing
- To have realtime updates - we can poll on certain time limit
- Creating embeddings with Sentence Transformers from Hugging Face
- Creating indexes using Pinecone
- A Flask server to export functions via API

References for SDKs:

- https://huggingface.co/BAAI/bge-large-en-v1.5#using-sentence-transformers
- https://platform.openai.com/docs/libraries

### Client App

A Web App, where users gonna interact with UI by querying and get semantic search results. It's written in Next.js with App router, React and TailwindCSS with responsive chat interface deployed on Vercel.

Duties:

- Showing UI with good UX
- Embed the query using Background Worker API
- Use existing pinecone index that was created by Background Worker to query the Vector database
- Showing results in card view that are obtained from Vector database
- Consecutive questions based on entered query. For example,

  1.  “I want to hire someone with experience in Python and Node. My budget is $10000 a month.”
      - The chatbot follows up asking whether the user wants a full-time or part-time worker after showing some results
  2.  “I want to hire someone who worked at a big tech company. I have an unlimited budget. They should be proficient in Python.”
      - The chatbot follows up asking whether the user wants a full-time or part-time worker after showing some results
  3.  “I want to hire a developer”
      - The chatbot follows up asking for the skills, budget, and whether the worker is part-time or full-time. The chatbot shows results after skills are provided

## Implementation with APIs

Using APIs get rids of requirement of Python for embedding completely and call whenever required for initial data source embedding, realtime embeddings, query embedding.

References:

- https://huggingface.co/tasks/sentence-similarity
- https://platform.openai.com/docs/models/embeddings

### Client App

A Web App, where users gonna interact with UI by querying and get semantic search results. It's written in Next.js with App router, React and TailwindCSS with responsive chat interface deployed on Vercel.

Duties:

- Indexing the initial data source and realtime updates to Vector DB
- Showing UI with good UX
- Embed the query using external APIs
- Use existing Vector DB Index that was created at the time of embeddings to query the Vector DB
- Showing results in card view that are obtained from Vector database
- Consecutive questions based on entered query. For example,

  1.  “I want to hire someone with experience in Python and Node. My budget is $10000 a month.”
      - The chatbot follows up asking whether the user wants a full-time or part-time worker after showing some results
  2.  “I want to hire someone who worked at a big tech company. I have an unlimited budget. They should be proficient in Python.”
      - The chatbot follows up asking whether the user wants a full-time or part-time worker after showing some results
  3.  “I want to hire a developer”
      - The chatbot follows up asking for the skills, budget, and whether the worker is part-time or full-time. The chatbot shows results after skills are provided
