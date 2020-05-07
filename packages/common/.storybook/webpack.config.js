const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');
//dont need stories path if you have your stories inside your //components folder
module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH, STORIES_PATH],
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: './.storybook/tsconfig.json'
          }
        },
        { loader: require.resolve('react-docgen-typescript-loader') }
      ]
  });
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    // only process modules with this loader
    // if they live under a 'fonts' or 'pficon' directory
    test: /\.(svg|ttf|eot|woff|woff2)$/,
    include: [
      path.resolve('../src/static')
    ],
    use: {
      loader: 'file-loader',
      options: {
        // Limit at 50k. larger files emited into separate files
        limit: 5000,
        name: '[name].[ext]',
        outputPath: 'fonts'
      }
    }
    })
  return config;
}