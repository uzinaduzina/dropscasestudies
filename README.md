# DROPS Case Studies

Standalone case studies interface with:

- a cards page
- a detail page for each case study
- shared language switching from both views
- multilingual content embedded in local static files

## Files

- `index.html` for the cards view
- `case-study.html` for the detail view
- `standalone-case-studies.css` for styling
- `case-studies-app.js` for UI logic
- `case-studies-data.js` for multilingual content

## Run locally

You can open the HTML files directly in a browser, or serve the folder with:

```bash
python3 -m http.server 8123
```

Then open `http://127.0.0.1:8123/index.html`.

## Notes

The public repo excludes the local `Translations/` source documents to keep the repository lightweight. Their translated content has already been integrated into `case-studies-data.js`.
