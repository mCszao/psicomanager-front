export function useFilter(searchWord: string, listOrigin: Array<any> | null, key: any) {
    return (searchWord.length != 0 && listOrigin != null)
    ? listOrigin.filter((object) : any => {
          const regex = new RegExp(searchWord, 'i');
          return String(object[key]).match(regex);
      })
    : [];
}