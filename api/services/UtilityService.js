module.exports = {
  checkIfNumber(array, objectKey) {
    if (isNaN(array[0][objectKey]) === false) {
      const modifiedArray = array.map((each) => {
        const numValue = parseInt(each[objectKey], 10);
        const newObject = Object.assign(each, { [objectKey]: numValue });
        return newObject;
      });
      return modifiedArray;
    }
    return array;
  },
  sortData({ array, objectKey, sortDir }) {
    try {
      const modifiedArray = UtilityService.checkIfNumber(array, objectKey);
      const sortedArrayAsc = modifiedArray.sort((a, b) => {
        if (a[objectKey] < b[objectKey]) {
          return -1;
        }
        if (a[objectKey] > b[objectKey]) {
          return 1;
        }
        return 0;
      });

      if (sortDir && sortDir === 'desc') {
        const sortedArrayDesc = [...sortedArrayAsc].reverse();
        return sortedArrayDesc;
      }
      return sortedArrayAsc;
    } catch (err) {
      return err;
    }
  },

  filterCharacters({ array, key, value }) {
    try {
      const filteredArray = array.filter((each) => each[key] === value);
      return filteredArray;
    } catch (err) {
      return err;
    }
  },

  getHeightInCentimeters(characterArray) {
    try {
      const totalHeightInCm = characterArray.reduce((totalHeight, currentCharacter) => {
      // eslint-disable-next-line no-param-reassign
        totalHeight += currentCharacter.height === 'unknown' ? 0 : parseInt(currentCharacter.height, 10);
        return totalHeight;
      }, 0);
      return totalHeightInCm;
    } catch (err) {
      return err;
    }
  },

  convertToFeetAndInches(heightInCentimeters) {
    try {
      const feetAndInchesConversionValue = heightInCentimeters / 30.48;
      const feet = Math.floor(feetAndInchesConversionValue);
      const inches = (feetAndInchesConversionValue % 1) * 12;
      const totalHeightInFeetAndInches = `${feet}ft and ${inches.toFixed(2)} inches`;
      return totalHeightInFeetAndInches;
    } catch (err) {
      return err;
    }
  },

  getHeightData(characterArray) {
    try {
      const totalHeightInCentimeters = UtilityService.getHeightInCentimeters(characterArray);
      const totalHeightInFeetAndInches = UtilityService.convertToFeetAndInches(totalHeightInCentimeters);
      return { totalHeightInCentimeters, totalHeightInFeetAndInches };
    } catch (err) {
      return err;
    }
  },

  async getRedisValue(key) {
    try {
      const stringData = await redisClient.get(key);
      const redisValue = JSON.parse(stringData);
      return redisValue;
    } catch (err) {
      return err;
    }
  },

  pickFields(array) {
    const x = array.map((each) => {
      const {
        title, opening_crawl, release_date, comments,
      } = each;
      return {
        title, opening_crawl, release_date, comments,
      };
    });
    return x;
  },
};
