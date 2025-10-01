## OctoTools

This website is adapted from [Nerfies website](https://nerfies.github.io) and [MathVista website](https://mathvista.github.io).

### Website License
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.


### Update the website

```sh
git add -A
git commit -m "Update website"
git push
```


### Separate the tool cards from the main page

Load the tool_cards.html file directly into your index.html. Here's how you can do it:

```html
<!-- Include tool cards -->
<div id="tool-cards-container"></div>

<script>
    fetch('tool_cards.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('tool-cards-container').innerHTML = html;
    })
    .catch(error => console.error('Error loading tool cards:', error));
</script>
```

properly setting up a local web server to serve your files:

```sh
# Navigate to your project directory
cd /path/to/octotools.github.io

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```


After starting either server, you can access your site at:

```
http://localhost:8000 (for Python server)
http://localhost:8080 (for http-server)
```