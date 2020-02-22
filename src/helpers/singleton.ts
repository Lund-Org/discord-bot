interface DataObject {
  [key: string]: string;
}

class Singleton {
  static datas: DataObject = {}

  /**
   * Set the data in the singleton
   * @param key The key to identify the data
   * @param value The value to assign
   */
  static setData(key: string, value: string) {
    Singleton.datas[key] = value
  }

  /**
   * Return the data stored in the singleton
   * @param key The key to identify the data
   */
  static getData(key: string) {
    return Singleton.datas[key]
  }
}

export default Singleton
