const { requiredOption } = require("commander");

const marked = require("marked");

module.exports = (markdown, clipOptions) => {
  return marked(markdown, {
    gfm: clipOptions.gfm,
  });
};
