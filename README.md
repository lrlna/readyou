# READYOU

A tiny module to generate your readmes :books: :memo:. 

Provides you with a skeleton README for you current project based on a `.json` file. Especially useful for projects with a repeated template of READMEs, such as guides for setting up local database, docker, etc. 

## Use
Set up a `.json` file where keys will be your README section headings, and values are the meat of your sections. Here is an example of what would generate this README:

```javascript
{
  "About": "A tiny module to generate your readmes :books: :memo:.Provides you with a skeleton README for you current project based on a `.json` file. Especially useful for projects with a repeated template of READMEs, such as guides for setting up local database, docker, etc."
  "Use": "Set up a `.json` file where keys will be your README section headings, and values are the meat of your sections. Here is an example of what would generate this README:",
  "Install":"Install with npm \n ```bash npm install -g readyou```",
}
```

Then run the following command in your current working directory, where `--file` (or `-f`, if you prefer the shorthand) is the absolute path to your generator file. 

```bash
readyou run  --file /Users/buffy/developer/project-setup/readme-generator.json
```


## Install
Install with npm:

```bash
npm install -g readyou
```
