const httpStatus = require('http-status');
const ollamaCore = require('@langchain/community/llms/ollama');
// eslint-disable-next-line import/no-extraneous-dependencies
const langchainMessages = require('@langchain/core/messages');
// eslint-disable-next-line import/no-extraneous-dependencies
const langchainParser = require('@langchain/core/output_parsers');
const languagesList = require('../../static/languages-list.json');

const { Ollama } = ollamaCore;
const { SystemMessage, HumanMessage } = langchainMessages;
const { StringOutputParser } = langchainParser;
const parser = new StringOutputParser();

const model = new Ollama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3.1:latest',
  lc_serializable: true,
  temperature: 1,
});

/**
 * Retrieves the name of a language based on its code.
 *
 * @param {string} code - The code of the language.
 * @return {string|undefined} The name of the language if found, otherwise undefined.
 */
function getLanguageName(code) {
  return languagesList.find((l) => l.value === code)?.name;
}

/**
 * Translates the given content from one language to another using the LLM model.
 *
 * @param {Object} req - The request object containing the body with the following properties:
 *   - fromLanguage: The code of the language to translate from.
 *   - toLanguage: The code of the language to translate to.
 *   - content: The content to be translated.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<Object>} The translated content in the form of a JSON object
 * with the following properties:
 *   - name: The name of the translator.
 *   - reply: The translated content.
 * @throws {Error} If any of the required parameters are missing or if the language
 * codes are invalid.
 */
exports.translate = async (req, res, next) => {
  console.log(req.body);
  const { fromLanguage, toLanguage, content } = req.body;

  if (!fromLanguage || !toLanguage || !content) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Missing required parameters' });
  }

  const fromLanguageName = getLanguageName(fromLanguage);
  const toLanguageName = getLanguageName(toLanguage);
  if (!fromLanguageName || !toLanguageName) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid language code' });
  }

  const messages = [
    new SystemMessage(`Translate the following from ${fromLanguageName} into ${toLanguageName}.`),
    new HumanMessage(req.body.content),
  ];
  const LMOutput = await model.invoke(messages);
  console.log('LMOutput', LMOutput);
  const result = await parser.invoke(LMOutput);
  /**
   * result ->
   * {
          "name": "translator",
          "reply": "\"Ciao, mio caro\" (Hello, my dear)"
      }
   */
  console.log('model', result);

  return res.json({ name: 'translator', reply: result });
};

/**
 * Retrieves a list of supported languages and sends it as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} - A promise that resolves when the response is sent.
 */
exports.languages = async (req, res, next) => {
  res.json({ name: 'languages', data: languagesList });
};
