const httpStatus = require('http-status');
const fileSystem = require('fs');
const path = require('path');

/**
 * Reads the list of liked items from the 'likedList.json' file
 * and returns a Promise that resolves with the parsed data.
 *
 * @return {Promise<Object>} A Promise that resolves with the parsed
 * data from the 'likedList.json' file.
 */
function readLikesList() {
  return new Promise((resolve, reject) => {
    fileSystem.readFile(path.join(__dirname, '../../data/likedList.json'), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

/**
 * Writes the given data to the 'likedList.json' file and returns
 * a Promise that resolves with the parsed data.
 *
 * @param {Object} data - The data to be written to the file.
 * @return {Promise<Object>} A Promise that resolves with the parsed
 * data from the 'likedList.json' file.
 */
function writeLikesList(data) {
  return new Promise((resolve, reject) => {
    fileSystem.writeFile(path.join(__dirname, '../../data/likedList.json'), JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        reject(err);
      }
      readLikesList()
        .then((likesData) => resolve(likesData))
        .catch((error) => reject(error));
    });
  });
}

/**
 * Retrieves the list of liked items from the 'likedList.json' file and sends it as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
exports.getLikesList = async (req, res, next) => {
  try {
    const fileData = await readLikesList();
    res.json({ name: 'likes', data: fileData.data });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error occured!. Please try again later!' });
  }
};

/**
 * Adds a new item to the list of liked items by pushing it to the 'likedList.json' file.
 *
 * @param {Object} req - The request object containing the item details in the body.
 * @param {Object} res - The response object to send the updated list of liked items.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
exports.addToLikesList = async (req, res, next) => {
  try {
    const {
      id, fromLang, toLang, question, answer } = req.body;
    const likesList = await readLikesList();
    likesList.data.push({ id, fromLang, toLang, question, answer });
    const updatedLikesList = await writeLikesList(likesList);
    res.json({ name: 'likes', data: updatedLikesList.data });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error occured!. Please try again later!' });
  }
};

/**
 * Removes an item from the likes list by its ID.
 *
 * @param {Object} req - The request object containing the URL of the item to be removed.
 * @param {Object} res - The response object to send the updated likes list.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
exports.removeFromLikesList = async (req, res, next) => {
  try {
    const removeId = req.url.split('/likes/').pop();
    const likesList = await readLikesList();
    likesList.data = likesList.data.filter((item) => item.id !== removeId);
    const updatedData = await writeLikesList(likesList);
    res.json({ name: 'likes', data: updatedData.data });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error occured!. Please try again later!' });
  }
};
