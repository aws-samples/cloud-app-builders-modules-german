# Serverless & Containers Webapp Example

An implementation of [TodoMVC](https://todomvc.com/) providing both a Serverless and a container-based
backend. Both variants implement the same API, and the client can select which backend to use.
This makes it easy to compare the two different architectural styles.


# Change paths
By default, the TODOs frontend uses the containers API, available at "/api/v1". If you want to 
switch to the serverless API, open your browser's Javascript console, run the following snippet,
and reload the page. You will see a different set of TODOs, as the container API and the serverless
API uses different databases:

```javascript
sessionStorage.setItem("apiBase", "/api/v2/")
```