# action-mustache
This GitHub Action allows you to render Mustache templates using JSON data. Mustache is a logic-less template syntax that can be used to generate dynamic content from templates.

## Usage

```yaml
name: Render Mustache Template

on:
  push:
    branches:
      - main

jobs:
  render-template:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2

    - name: Render Mustache Template
      uses: clydetealium/action-mustache@v1
      with:
        template-path: 'path/to/template.mustache'
        data: '{"name": "John Doe", "age": 30}'
      id: render

    - name: Display Rendered Template
      run: echo "Rendered Template: ${{ steps.render.outputs.rendered-template }}"
```

## Inputs

### template-path (required)
> The path to the Mustache template file. This file should be located in your repository.

### data (optional, default: {})
> JSON data to apply to the template. This data will be used to fill in the placeholders in the template.

### data-path (optional, default: '')
> The path to a JSON data file. If you prefer to keep your data in a separate file, you can specify the path to that file here.

## Outputs
### rendered-template
> The rendered Mustache template. You can use this output in subsequent steps of your workflow.

## Example
Here's an example of how to use this action in a GitHub Actions workflow:

```yaml
- name: Render Mustache Template
  uses: your-account/mustache-render-action@v1
  with:
    template-path: 'path/to/template.mustache'
    data: '{"name": "John Doe", "age": 30}'
  id: render
```
This action will render the Mustache template located at 'path/to/template.mustache' with the provided data and store the result in the rendered-template output.

## Mustache
Skim the [Mustache docs](https://mustache.github.io/mustache.5.html)

## Contributing
Clone this repo

## setup
install dependencies: 
```
npm run setup
```

run tests:
```
npm test
```
