# Codetrest Feature Showcase (Markdown + HTML)

Use this file to verify **all currently supported** rendering features.

---

## 1) Core Markdown

# H1
## H2
### H3
#### H4
##### H5
###### H6

Paragraph with **bold**, *italic*, ***bold+italic***, ~~strikethrough~~, `inline code`, ==(highlight via HTML mark below)==, and escaped chars: \*not bold\*.

Line break test (two spaces at end)  
Next line.

Horizontal rule:

---

Blockquote:

> This is a blockquote.
> It can span multiple lines.

Nested blockquote:

> Outer
>> Inner

---

## 2) Lists

- Unordered item 1
- Unordered item 2
  - Nested item A
  - Nested item B

1. Ordered item 1
2. Ordered item 2
3. Ordered item 3

Task list (GFM):

- [x] Completed
- [ ] Pending
- [ ] Another pending task

---

## 3) Links and URIs

Standard links:

- [OpenAI](https://openai.com)
- [Mail link](mailto:test@example.com)
- [Phone link](tel:+123456789)

Local/resource protocol links:

- [Local file URI](file:///C:/Users/Example/Documents/test.txt)
- [Asset URI](asset:/images/logo.png)
- [Blob URI example](blob:https://example.com/123e4567-e89b-12d3-a456-426614174000)

Autolink:

<https://github.com>

---

## 4) Images and Media URIs

Markdown image:

![Sample image via https](https://picsum.photos/240/120)

HTML image with extra attributes:

<img src="https://picsum.photos/300/120" alt="HTML img test" width="300" height="120" loading="lazy" decoding="async" referrerpolicy="no-referrer" />

Local/resource image examples:

<img src="file:///C:/Users/Example/Pictures/sample.png" alt="Local file image" width="180" />

<img src="asset:/icons/icon.png" alt="Asset image" width="120" />

<img src="blob:https://example.com/123e4567-e89b-12d3-a456-426614174000" alt="Blob image" width="120" />

---

## 5) Tables (Markdown + HTML)

Markdown table:

| Name    | Age | City     |
|---------|-----|----------|
| Alice   | 20  | New York |
| Bob     | 22  | London   |
| Charlie | 19  | Tokyo    |

HTML table:

<table summary="People table">
  <caption>People</caption>
  <colgroup>
    <col span="1" width="150" />
    <col span="1" width="80" />
    <col span="1" width="150" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>20</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>22</td>
      <td>London</td>
    </tr>
    <tr>
      <td>Charlie</td>
      <td>19</td>
      <td>Tokyo</td>
    </tr>
  </tbody>
</table>

---

## 6) Code Blocks + Syntax Highlight

```js
function greet(name) {
  return `Hello, ${name}`;
}
console.log(greet("Codetrest"));
```

```python
def integral_demo():
    x = 5
    return x**2
```

```bash
echo "shell block"
ls -la
```

Inline code in sentence: `const x = 5;`

---

## 7) Math (KaTeX)

Inline math: $x = 5$, $E = mc^2$, $a^2 + b^2 = c^2$.

Block math:

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

More block math:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

---

## 8) Collapsible Sections

### 8.1 HTML collapsible

<details>
<summary>Click to expand (HTML)</summary>

Hidden content here.

- Supports markdown inside details
- **bold** and `code`

</details>

### 8.2 Markdown-ish collapsible (`:::details`)

:::details Click to expand (Markdown-ish)
Hidden content here too.

- Item 1
- Item 2
:::

### 8.3 Markdown-ish open by default

:::details open [Open by default]
This details block should render opened initially.
:::

---

## 9) Embedded HTML (safe-rich)

### 9.1 iframe

<iframe src="https://free.timeanddate.com/clock/iadz5zme/n1763" frameborder="0" width="113" height="18" title="Clock widget"></iframe>

### 9.2 Semantic/layout tags

<article>
  <header><h3>Article Header</h3></header>
  <section>
    <p>Section content with <mark>mark</mark>, <small>small</small>, <sub>sub</sub>, <sup>sup</sup>.</p>
  </section>
  <footer>Article Footer</footer>
</article>

<aside>Aside note</aside>
<nav>
  <a href="https://example.com">Nav Link</a>
</nav>

<figure>
  <img src="https://picsum.photos/200/100" alt="figure image" width="200" />
  <figcaption>Figure caption</figcaption>
</figure>

### 9.3 Inline semantic tags

<p>
  <abbr title="HyperText Markup Language">HTML</abbr>,
  <cite>Some Book</cite>,
  <q cite="https://example.com">Inline quote</q>,
  <time datetime="2026-04-26">April 26, 2026</time>,
  <data value="42">Forty-two</data>,
  <kbd>Ctrl</kbd>+<kbd>S</kbd>,
  <var>x</var>,
  <u>underlined</u>,
  <s>struck</s>,
  <ins>inserted</ins>,
  <del>deleted</del>
</p>

### 9.4 Lists with HTML attrs

<ol start="3" reversed type="1">
  <li value="10">Custom value item</li>
  <li>Another item</li>
</ol>

### 9.5 Audio/video/picture/source/track

<video controls width="320" height="180" poster="https://picsum.photos/320/180">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
  <track kind="captions" label="English" srclang="en" src="https://example.com/captions.vtt" default />
  Video fallback text.
</video>

<audio controls>
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
  Audio fallback text.
</audio>

<picture>
  <source srcset="https://picsum.photos/400/200" media="(min-width: 600px)" />
  <img src="https://picsum.photos/200/100" alt="picture fallback" width="200" />
</picture>

### 9.6 Forms and inputs

<form action="https://example.com" method="get" target="_blank" name="test-form">
  <fieldset>
    <legend>Form Demo</legend>

    <label for="name">Name:</label>
    <input id="name" name="name" type="text" placeholder="Your name" required />

    <label for="city">City:</label>
    <select id="city" name="city">
      <option value="ny">New York</option>
      <option value="ldn">London</option>
      <option value="tyo">Tokyo</option>
    </select>

    <label for="msg">Message:</label>
    <textarea id="msg" name="msg" rows="3" cols="30">Hello</textarea>

    <button type="submit">Submit</button>
  </fieldset>
</form>

### 9.7 Meter/progress/output/canvas/map/area

<meter min="0" max="100" low="30" high="80" optimum="90" value="65">65%</meter>

<progress max="100" value="40">40%</progress>

<output>Computed output</output>

<canvas width="120" height="40" style="border:1px solid #ccc;">Canvas fallback</canvas>

<img src="https://picsum.photos/240/120" usemap="#mymap" alt="Map image" width="240" />
<map name="mymap">
  <area shape="rect" coords="0,0,120,60" href="https://example.com" alt="Area 1" />
</map>

---

## 10) Raw HTML Blocks + Markdown Mix

<div class="custom-box" id="box1" title="Custom Box" style="padding:8px; border:1px dashed #999;">
  <p>This is a raw HTML container with markdown below:</p>
</div>

- Markdown list under HTML
- Another item

---

## 11) Protocol-specific anchor tests

<a href="file:///home/user/docs/readme.md" target="_blank" rel="noopener">file protocol anchor</a>

<a href="asset:/docs/local-guide.pdf" target="_blank" rel="noopener">asset protocol anchor</a>

<a href="blob:https://example.com/123e4567-e89b-12d3-a456-426614174000" target="_blank">blob protocol anchor</a>

---

## 12) Fenced code should NOT become collapsible

```md
:::details This should stay plain text in code block
content
:::
```

Done.
