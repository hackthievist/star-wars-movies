module.exports = {
  sortData({ array, objectKey, sortDir }) {
    try {
      let sortedArray;
      // sort string values (name, gender)
      if (typeof array[0][objectKey] !== 'number') {
        sortedArray = array.sort((a, b) => {
          if (a[objectKey] < b[objectKey]) {
            return -1;
          }
          if (a[objectKey] > b[objectKey]) {
            return 1;
          }
          return 0;
        });
      }
      // sort number values (height)
      if (objectKey && typeof objectKey === 'number') {
        sortedArray = array.sort((a, b) => a[objectKey] - b[objectKey]);
      }

      if (sortDir && sortDir === 'desc') sortedArray.reverse();
      return sortedArray;
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
};
