# READYOU

## About
A tiny module to generate your readmes :books: :memo:. 

Provides you with a skeleton README for you current project based on a `.json` file. Especially useful for projects with a repeated template of READMEs, such as guides for setting up local database, docker, etc. 

## Use
Set up a `.json` file where keys will be your README section headings, and values are the meat of your sections. If you're planning on having subheadings, make sure to nest your `.json`.

Here is an example of what would generate a basic README:

```javascript
{
  "READYOU": {
    "About": "A tiny module to generate your readmes :books: :memo:.Provides you with a skeleton README for you current project based on a `.json` file. Especially useful for projects with a repeated template of READMEs, such as guides for setting up local database, docker, etc.",
    "Use": "Set up a `.json` file where keys will be your README section headings, and values are the meat of your sections. Here is an example of what would generate a basic README:",
    "Install":"Install with npm \n ```bash npm install -g readyou```"
  }
}
```

Then run the following command in your current working directory, where `--file` (or `-f`, if you prefer the shorthand) is the absolute path to your generator file. If you've set up a default `config` file with `readyou config --file`, you don't have to provide a file path.

```bash
readyou run  --file /absolute/path/to/file
```

If you are to use the same readme structure often, you may also set up a default config file for `readyou` to use. 

```bash
readyou config --file /absolute/path/to/file
```

## Install
Install with npm:

```bash
npm install -g readyou
```
