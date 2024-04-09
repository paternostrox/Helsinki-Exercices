```mermaid
    sequenceDiagram
        participant browser
        participant server

        Note right of browser: The browser extracts the new note from the input, adds a timestamp and updates the page to include it. Then, it sends a request to add it to the server list.
        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa - body: { content: "Hello!", date: "XXXX-XX-XX..."} 
        activate server
        Note left of server: The server inspects the POST request and adds the new note to the list of current notes
        server-->>browser: Status Code 201 - Created
        deactivate server
```