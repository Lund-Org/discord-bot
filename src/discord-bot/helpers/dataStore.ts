interface DataObject {
  [key: string]: string;
}

class DataStore {
  static datas: DataObject = {};

  /**
   * Set the data in the dataStore
   * @param key The key to identify the data
   * @param value The value to assign
   */
  static setData(key: string, value: string) {
    DataStore.datas[key] = value;
  }

  /**
   * Return the data stored in the dataStore
   * @param key The key to identify the data
   */
  static getData(key: string) {
    return DataStore.datas[key];
  }
}

export default DataStore;
