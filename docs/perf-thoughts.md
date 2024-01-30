This document encompasses various ideas aimed at enhancing performance across multiple dimensions, including Semantic Search, leveraging Vector DB and Data Structures, implementing SSR, deploying at Edge nodes, and achieving Real-time syncing.

## Realtime Syncing

- [ ] Instead of simply pulling entire data and filtering we can maintain _**checkpoints**_ and fetch only after data. This reduces overall time on getting new data.
- [ ] To provide realtime updates to the Vector DB, we can do a polling on certain interval that fetches new data by using last checkpoint.
- [ ] Run a cron job that upserts vector DB with new data.
- [ ] Instead of polling, having subscriptions to database mutations like INSERT, UPDATE and DELETE will save resources.
  1. We can utilize `TRIGGER` if we are storing Vector embeddings in the same database. And call a trigger that upserts Vector DB. Not sure how to implement for the external services.
  2. Other services like Supabase provides us ability to subscribe and do required action.

## Web App Improvements

- [ ] Deploying on edge nodes to serve faster API responses
- [ ] Using Server-Side rendering with React server components whenever its possible to load UI faster
- [ ] Lazy load components that are not shown on first load

## Vector Database

- [ ] Using downloaded model instead of making an API call to the service every time reduces the latency. We can download and save it in AWS EC2 where code is hosted and use whenever required.
      We can download and save the embedding model, like below:

  ```python
   from sentence_transformers import SentenceTransformer
   model = SentenceTransformer('thenlper/gte-small')

   model.save("./models/gte-small")
  ```

- [ ] Approximate Search instead of Exhaustive Search
- [ ] Single stage filtering - to search across a column.
  - For example give me who fall under $10,000 budget, will have a column filter (BUDGET < 10,000>)
- [ ] Creating multiple indexes - for example, skill-index, availabilty-index, budget-index. And perform search on multiple indexes in parallel.
