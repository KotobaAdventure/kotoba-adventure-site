# SEO Setup Notes

Official site URL:

```text
https://kotobaadventure.github.io/kotoba-adventure-site/
```

## Added Files

- `robots.txt`
- `sitemap.xml`

## Added Metadata

- Search description
- Canonical URL
- Open Graph metadata
- Twitter card metadata
- Favicon
- Robots index/follow directive

## Google Search Console Steps

1. Open Google Search Console.
2. Add a new property using the URL prefix option:

```text
https://kotobaadventure.github.io/kotoba-adventure-site/
```

3. Choose the HTML tag verification method.
4. Copy the verification meta tag.
5. Add that tag inside the `<head>` of `index.html`.
6. Upload the updated `index.html` to GitHub.
7. Return to Search Console and click Verify.
8. Submit this sitemap:

```text
https://kotobaadventure.github.io/kotoba-adventure-site/sitemap.xml
```

## Notes

- GitHub Pages may take a few minutes to update after each upload.
- Google indexing is not instant. It can take days or longer.
- After Etsy and Gumroad pages are created, add their URLs to the site and consider adding them to structured data later.
